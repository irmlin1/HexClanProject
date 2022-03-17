using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using HexClanApplication.Api.Database;

namespace HexClanApplication.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMongoCollection<UsersModel> _userModelsCollection;
        public UsersController(IMongoClient client)
        {
            var database = client.GetDatabase("HexClanDatabase");
            _userModelsCollection = database.GetCollection<UsersModel>("UsersDB");
        }

        [HttpGet]
        public JsonResult Get()
        {
            var dblist = _userModelsCollection.AsQueryable();
            return new JsonResult(dblist);
        }
        [HttpPost]
        public JsonResult Post(UsersModel usr)
        {
            UsersModel user;
            user = _userModelsCollection.Find<UsersModel>(us => us.email == usr.email).FirstOrDefault();
            if(user == null)
            {
                int kiekis = _userModelsCollection.AsQueryable().Count();
                usr.Id = kiekis + 1;
                _userModelsCollection.InsertOne(usr);
                return new JsonResult("Added successfully (Kol sutvarkiau gavau traumą...)");
            }
            else
            {
                // Jei reiks, kad error išmestų ar ką nors

                return new JsonResult("Asmuo nepridetas, nes toks pat email.");
            }         
        }
        
        // Delete metode tiesiog prie viso api pridėkite id skaičiuką ir ištrins jį.
        [HttpDelete("{Id}")]
        public JsonResult Delete(int Id)
        {
            UsersModel user;
            user = _userModelsCollection.Find<UsersModel>(us => us.Id == Id).FirstOrDefault();
            if(user != null)
            {
                _userModelsCollection.DeleteOne(a => a.Id == Id);
                return new JsonResult("Asmuo ištrintas");
            }
            else
            {
                return new JsonResult("Asmuo neištrintas");
            }
        }
    }
}
