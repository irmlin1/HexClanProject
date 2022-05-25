using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using HexClanApplication.Api.Contracts.Models;
using Microsoft.AspNetCore.Identity;
using HexClanApplication.Api.Contracts.Services;
using Microsoft.AspNetCore.Authorization;
using System.Net;

namespace HexClanApplication.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    [Authorize]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult> RegisterAsync(UserDto user)
        {
            
            if (user == null)
            {
                return BadRequest();
            }

            var result = await _userService.RegisterAsync(user);

            return Ok(result);
        }

        [HttpPost("role")]
        public async Task<ActionResult> CreateRoleAsync(UserRoleDto role)
        {
            if (role == null)
            {
                return BadRequest();
            }

            var result = await _userService.CreateRoleAsync(role);

            return Ok(result);
        }

        [HttpPost("role/edit/{email}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateRoleAsync(string email, List<string> newRoles)
        {
            if (newRoles == null || email == null)
            {
                return BadRequest();
            }

            var result = await _userService.UpdateRoleAsync(email, newRoles);

            return Ok(result);
        }

        [HttpGet("role/{email}")]
        public async Task<ActionResult> GetUserRolesAsync(string email)
        {
            if (email == null)
            {
                return BadRequest();
            }

            var result = await _userService.GetUserRolesAsync(email);

            return Ok(result);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTokenAsync(TokenRequestModel model)
        {
            if (model == null)
            {
                return BadRequest();
            }

            try
            {
                var result = await _userService.GetTokenAsync(model);
                return Ok(result);
            }
            catch (ArgumentNullException)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public Task<ResponseState> GetUsers()
        {
            return _userService.GetUsers();
        }

        [HttpGet("{email}")]
        public async Task<ActionResult> GetUserAsync(string email)
        {
            var user = await _userService.GetUserAsync(email);
            if (user is null)
            {
                return BadRequest();
            }
            return Ok(user);
        }

        [HttpGet("auth-status")]
        public ResponseState CheckAuthStatus()
        {
            ResponseState result = new ResponseState();
            result.Success = true;
            return result;
        }

    }
}
