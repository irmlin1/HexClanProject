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

namespace HexClanApplication.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult> RegisterAsync(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            try
            {
                if(user.email.Where(c => c == '@').Count() != 1)
                {
                    return BadRequest();
                }

                var result = await _userService.RegisterAsync(user);

                if(result.AccountCreated)
                {
                    return Ok(result);
                }

                return Conflict(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //private readonly IMongoCollection<User> _userModelsCollection;
        //public UsersController(IMongoClient client)
        //{
        //    var database = client.GetDatabase("HexClanDatabase");
        //    _userModelsCollection = database.GetCollection<User>("Users");
        //}

        [HttpGet]
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
