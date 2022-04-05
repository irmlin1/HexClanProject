using HexClanApplication.Api.Contracts.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HexClanApplication.Api.Contracts.Services
{
    public interface IUserService
    {
        Task<ResponseState> RegisterAsync(UserDto user);
        Task<ResponseState> CreateRoleAsync(UserRoleDto role);
        JsonResult GetUsers();
        Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model);
    }
}
