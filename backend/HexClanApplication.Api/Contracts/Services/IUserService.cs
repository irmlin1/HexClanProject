using HexClanApplication.Api.Contracts.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HexClanApplication.Api.Contracts.Services
{
    public interface IUserService
    {
        Task<RegisterStateModel> RegisterAsync(User user);
        JsonResult GetUsers();
    }
}
