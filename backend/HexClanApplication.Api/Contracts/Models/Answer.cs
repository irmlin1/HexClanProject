using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HexClanApplication.Api.Contracts.Models
{
    public class Answer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string AnswerId { get; set; }
        public string Content { get; set; }
        public bool IsCorrect { get; set; }

    }
}
