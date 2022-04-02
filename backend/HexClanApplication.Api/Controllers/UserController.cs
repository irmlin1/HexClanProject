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

namespace HexClanApplication.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterAsync(UserDto user)
        {
            
            if (user == null)
            {
                return BadRequest();
            }

            var result = await _userService.RegisterAsync(user);

            return result.Success ? Ok(result) : Conflict(result);
        }

        [HttpPost("role")]
        public async Task<ActionResult> CreateRoleAsync(UserRoleDto role)
        {
            if (role == null)
            {
                return BadRequest();
            }

            var result = await _userService.CreateRoleAsync(role);

            return result.Success ? Ok(result) : Conflict(result);
        }

        [HttpPost("login")]
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

        //private readonly IMongoCollection<User> _userModelsCollection;
        //public UsersController(IMongoClient client)
        //{
        //    var database = client.GetDatabase("HexClanDatabase");
        //    _userModelsCollection = database.GetCollection<User>("Users");
        //}

        [HttpGet]
        [Authorize]
        public JsonResult GetUsers()
        {
            return _userService.GetUsers();
        }
        //[HttpPost]
        //public JsonResult Post(User usr)
        //{
        //    User user;
        //    user = _userModelsCollection.Find<User>(us => us.email == usr.email).FirstOrDefault();
        //    if (user == null)
        //    {
        //        _userModelsCollection.InsertOne(usr);
        //        return new JsonResult("Added successfully (Kol sutvarkiau gavau traumą...)");
        //    }
        //    else
        //    {
        //        // Jei reiks, kad error išmestų ar ką nors

        //        return new JsonResult("Asmuo nepridetas, nes toks pat email.");
        //    }
        //}

        //// Delete metode tiesiog prie viso api pridėkite id skaičiuką ir ištrins jį.
        //[HttpDelete("{Id}")]
        //public JsonResult Delete(String Id)
        //{
        //    User user;
        //    user = _userModelsCollection.Find<User>(us => us.UserId == Id).FirstOrDefault();
        //    if(user != null)
        //    {
        //        _userModelsCollection.DeleteOne(a => a.UserId == Id);
        //        return new JsonResult("Asmuo ištrintas");
        //    }
        //    else
        //    {
        //        return new JsonResult("Asmuo neištrintas");
        //    }
        //}
    }
}
