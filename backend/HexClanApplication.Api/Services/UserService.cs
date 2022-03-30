using HexClanApplication.Api.Contracts.Models;
using HexClanApplication.Api.Contracts.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace HexClanApplication.Api.Services
{
    public class UserService : IUserService
    {
        private UserManager<ApplicationUser> _userManager;

        public UserService(UserManager<ApplicationUser> userManager)
        {
            this._userManager = userManager;
        }

        public JsonResult GetUsers()
        {
            return new JsonResult("hello world");
        }

        public async Task<RegisterStateModel> RegisterAsync(User user)
        {
            ApplicationUser appUser = new ApplicationUser
            {
                firstName = user.firstName,
                lastName = user.lastName,
                Email = user.email,
                UserName = user.userName
            };

            var userWithSameEmail = await _userManager.FindByEmailAsync(user.email);
            var userWithSameUserName = await _userManager.FindByNameAsync(user.userName);
            
            if (userWithSameUserName == null && userWithSameUserName == null)
            {
                var result = await _userManager.CreateAsync(appUser, user.password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(appUser, "User");
                }

                return new RegisterStateModel
                {
                    AccountCreated = true,
                    Message = $"User Registered with username {user.userName}"
                };
            }
            else
            {
                return new RegisterStateModel
                {
                    AccountCreated = false,
                    Message = $"Email {user.email} or username {user.userName} already registered."
                };
            }
        }
    }
}
