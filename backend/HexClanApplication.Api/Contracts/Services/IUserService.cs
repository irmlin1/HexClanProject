using HexClanApplication.Api.Contracts.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HexClanApplication.Api.Contracts.Services
{
    public interface IUserService
    {
        Task<ResponseState> RegisterAsync(UserDto user);
        Task<ResponseState> CreateRoleAsync(UserRoleDto role);
        Task<ResponseState> GetUsers();
        Task<User> GetUserAsync(string email);
        Task<ResponseState> GetUserRolesAsync(string email);
        Task<ResponseState> UpdateRoleAsync(string email, List<string> newRoles);
        Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model);
    }
}
