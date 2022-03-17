using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HexClanApplication.Api.Database
{
    public class UsersModel
    {
        [BsonId]
        public int Id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}