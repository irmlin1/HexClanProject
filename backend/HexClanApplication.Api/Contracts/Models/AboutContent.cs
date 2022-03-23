using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HexClanApplication.Api.Contracts.Models
{
    public class AboutContent
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        public string content { get; set; }
    }
}
