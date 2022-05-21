using HexClanApplication.Api.Contracts.Models;
using HexClanApplication.Api.Contracts.Services;
using HexClanApplication.Api.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HexClanApplication.Api.Services
{
    public class UserService : IUserService
    {
        private UserManager<User> _userManager;
        private RoleManager<UserRole> _roleManager;
        private readonly Jwt _jwt;
        private readonly IMongoCollection<User> _UserCollection;

        public UserService(UserManager<User> userManager, RoleManager<UserRole> roleManager, IOptions<Jwt> jwt, IMongoClient client)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
            _jwt = jwt.Value;


            var database = client.GetDatabase("HexClanDatabase");
            this._UserCollection = database.GetCollection<User>("Users");
        }

        public async Task<ResponseState> GetUsers()
        {
            var result = await _UserCollection.AsQueryable().ToListAsync();

            return new ResponseState
            {
                Content = result,
                Success = true,
                Message = ""
            };
        }

        public async Task<User> GetUserAsync(string email) =>
        await _userManager.FindByEmailAsync(email);

        public async Task<ResponseState> GetUserRolesAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if(user == null)
            {
                return new ResponseState
                {
                    Content = null,
                    Success = false,
                    Message = ""
                };
            }

            var userRoleIds = user.Roles;
            var allRoles = _roleManager.Roles;
            List<UserRoleResponseDto> userRoles = new List<UserRoleResponseDto>();
            foreach (var roleId in userRoleIds)
            {
                foreach(var role in allRoles)
                {
                    if(roleId == role.Id)
                    {
                        userRoles.Add(new UserRoleResponseDto { RoleId = roleId, RoleName = role.Name });
                        break;
                    }
                }
            }

            return new ResponseState
            {
                Content = userRoles,
                Success = true,
                Message = ""
            };
        }

        public async Task<ResponseState> RegisterAsync(UserDto user)
        {
            User appUser = new User
            {
                firstName = user.firstName,
                lastName = user.lastName,
                Email = user.email,
                UserName = user.userName
            };

            var userWithSameEmail = await _userManager.FindByEmailAsync(user.email);
            var userWithSameUserName = await _userManager.FindByNameAsync(user.userName);

            if (userWithSameEmail != null || userWithSameUserName != null)
            {
                return new ResponseState
                {
                    Success = false,
                    Message = $"Email {user.email} or username {user.userName} already registered.",
                    Content = null
                };
            }

            var result = await _userManager.CreateAsync(appUser, user.password);

            if (!result.Succeeded)
            {
                return new ResponseState
                {
                    Success = false,
                    Message = null,
                    Content = result.Errors
                };
            }

            await _userManager.AddToRoleAsync(appUser, "User");

            return new ResponseState
            {
                Success = true,
                Message = $"User {user.userName} successfully registered!",
                Content = null
            };

        }


        public async Task<ResponseState> CreateRoleAsync(UserRoleDto role)
        {
            UserRole appRole= new UserRole
            {
                Name = role.RoleName
            };

            var roleWithSameNamel = await _roleManager.FindByNameAsync(role.RoleName);

            if (roleWithSameNamel != null)
            {
                return new ResponseState
                {
                    Success = false,
                    Message = $"Role {role.RoleName} already exists.",
                    Content = null
                };
            }

            var result = await _roleManager.CreateAsync(appRole);

            if (!result.Succeeded)
            {
                return new ResponseState
                {
                    Success = false,
                    Message = null,
                    Content = result.Errors
                };
            }

            return new ResponseState
            {
                Success = true,
                Message = $"Role {role.RoleName} successfully added!",
                Content = null
            };
        }

        public async Task<ResponseState> UpdateRoleAsync(string email, List<string> newRoles)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if(user == null)
            {
                return new ResponseState
                {
                    Success = false,
                    Message = $"User with email {email} does not exist!",
                    Content = null
                };
            }
            var currentRoles =  await _userManager.GetRolesAsync(user);

            // add roles

            foreach(string role in newRoles)
            {
                if (!currentRoles.Contains(role))
                    await _userManager.AddToRoleAsync(user, role);
            }

            // remove roles
            foreach(var role in currentRoles)
            {
                bool found = false;
                foreach(string newRole in newRoles)
                {
                    if(newRole== role)
                    {
                        found = true;
                        break;
                    }
                }
                if(!found)
                {
                    await _userManager.RemoveFromRoleAsync(user, role);
                }
            }

            return new ResponseState
            {
                Success = true,
                Message = "Updated roles successfully! User will have to relogin to see the changes.",
                Content = null
            };
        }

        public async Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException();
            }

            var authenticationModel = new AuthenticationModel();

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                authenticationModel.IsAuthenticated = false;
                authenticationModel.Message = $"No accounts registered with {model.Email}.";

                return authenticationModel;
            }
            try
            {
                if (await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    JwtSecurityToken jwtSecurityToken = await CreateJwtToken(user);

                    authenticationModel.IsAuthenticated = true;
                    authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
                    authenticationModel.Email = user.Email;
                    authenticationModel.UserName = user.UserName;

                    var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
                    authenticationModel.Roles = rolesList.ToList();
                    

                    return authenticationModel;
                }
            }
            catch (ArgumentNullException)
            {
                // logger is null
            }

            authenticationModel.IsAuthenticated = false;
            authenticationModel.Message = $"Incorrect credentials for user {user.Email}.";
            return authenticationModel;
        }

        private async Task<JwtSecurityToken> CreateJwtToken(User user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            var roleClaims = new List<Claim>();

            for (int i = 0; i < roles.Count; i++)
            {
                roleClaims.Add(item: new Claim("roles", roles[i]));
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id.ToString())
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: System.DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
    }
}
