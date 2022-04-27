using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace HexClanApplication.Api.Contracts.Models
{
    public class Campaign
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string CampaignId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string[] Topics { get; set; }
        public string[] Tags { get; set; }
        public List<Task> Tasks { get; set; }
    }
}
