using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HexClanApplication.Api.Models
{
    public class TasksModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string TaskId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Difficulty { get; set; }
    }
}
