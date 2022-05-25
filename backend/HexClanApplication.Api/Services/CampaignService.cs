using HexClanApplication.Api.Contracts.Models;
using HexClanApplication.Api.Contracts.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace HexClanApplication.Api.Services
{
    public class CampaignService : ICampaignService
    {
        private readonly IMongoCollection<Campaign> _campaignCollection;
        private readonly IMongoCollection<Contracts.Models.Task_> _taskCollection;
        private readonly IMongoCollection<Answer> _answerCollection;

        public CampaignService(IMongoClient client)
        {
            var database = client.GetDatabase("HexClanDatabase");
            _campaignCollection = database.GetCollection<Campaign>("Campaigns");
            _taskCollection = database.GetCollection<Contracts.Models.Task_>("Tasks");
            _answerCollection = database.GetCollection<Answer>("Answers");
        }

        public async Task<ResponseState> CreateCampaignAsync(Campaign campaign)
        {
            // save answers to DB
            foreach(var task in campaign.Tasks)
            {
                await _answerCollection.InsertManyAsync(task.Answers);
            }

            // save tasks to DB
            await _taskCollection.InsertManyAsync(campaign.Tasks);

            // save campaign to DB
            await _campaignCollection.InsertOneAsync(campaign);

            return new ResponseState
            {
                Success = true,
                Message = "Campaign successfully saved",
                Content = null
            };
        }

        public async Task<ResponseState> GetAllCampaignsAsync()
        {
            var result = await _campaignCollection.AsQueryable().ToListAsync();

            return new ResponseState
            {
                Content = result,
                Success = true,
                Message = ""
            };
        }
    }
}
