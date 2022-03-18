using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using HexClanApplication.Api.Models;

namespace HexClanApplication.Api.Controllers
{
    [ApiController]
    [Route("api/about")]
    public class AboutContentController : ControllerBase
    {
        private readonly IMongoCollection<AboutContent> _aboutContentCollection;
        public AboutContentController(IMongoClient client)
        {
            var database = client.GetDatabase("HexClanDatabase");
            _aboutContentCollection = database.GetCollection<AboutContent>("AboutContent");
        }

        [HttpGet]
        public JsonResult GetContent()
        {
            var dblist = _aboutContentCollection.AsQueryable().ToList();
            if (dblist.Any())
            {
                return new JsonResult(dblist[0]);
            }
            return new JsonResult(null);
        }

        [HttpPost]
        public JsonResult UpdateContent([FromBody] AboutContent content)
        {
            //return new JsonResult(content.content);

            var data = _aboutContentCollection.AsQueryable().ToList();

            if(data.Count > 0)
            {
                var oldContent = data[0];
                var filter = Builders<AboutContent>.Filter.Eq("id", oldContent.id);
                var update = Builders<AboutContent>.Update.Set("content", content.content);

                _aboutContentCollection.UpdateOne(filter, update);
            }
            else
            {
                _aboutContentCollection.InsertOne(content);
            }

            return new JsonResult(content);

        }

        // Delete metode tiesiog prie viso api pridėkite id skaičiuką ir ištrins jį.
        //[HttpDelete("{Id}")]
        //public JsonResult Delete(String Id)
        //{
        //    UsersModel user;
        //    user = _userModelsCollection.Find<UsersModel>(us => us.UserId == Id).FirstOrDefault();
        //    if (user != null)
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
