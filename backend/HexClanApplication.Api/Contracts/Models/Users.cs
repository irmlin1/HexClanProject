using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HexClanApplication.Api.Contracts.Models
{
    public class UsersModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}