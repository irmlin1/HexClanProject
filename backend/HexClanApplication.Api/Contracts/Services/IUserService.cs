using HexClanApplication.Api.Contracts.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HexClanApplication.Api.Contracts.Services
{
    public interface IUserService
    {
        Task<ResponseState> RegisterAsync(UserDto user);
        Task<ResponseState> CreateRoleAsync(UserRoleDto role);
        Task<ResponseState> GetUsers();
        Task<User> GetAsync(string email);
        Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model);
    }
}
