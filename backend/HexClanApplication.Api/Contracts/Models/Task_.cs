using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace HexClanApplication.Api.Contracts.Models
{
    public class Task_
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string TaskId { get; set; }
        public string Question { get; set; }
        public string Difficulty { get; set; }
        public List<string> Topics { get; set; }
        public List<Answer> Answers { get; set; }
    }

}

