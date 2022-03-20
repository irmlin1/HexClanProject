using HexClanApplication.Api.Contracts.Models;
using HexClanApplication.Api.Contracts.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Linq;

namespace HexClanApplication.Api.Services
{
    public class AboutContentService : IAboutContentService
    {
        private readonly IMongoCollection<AboutContent> _aboutContentCollection;

        public AboutContentService(IMongoClient client)
        {
            var database = client.GetDatabase("HexClanDatabase");
            _aboutContentCollection = database.GetCollection<AboutContent>("AboutContent");
        }

        public JsonResult GetContent()
        {
            var dblist = _aboutContentCollection.AsQueryable().ToList();
            if (dblist.Any())
            {
                return new JsonResult(dblist[0]);
            }
            return new JsonResult(null);
        }

        public JsonResult UpdateContent(AboutContent content)
        {
            var data = _aboutContentCollection.AsQueryable().ToList();

            if (data.Count > 0)
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
    }
}
