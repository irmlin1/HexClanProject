using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using HexClanApplication.Api.Contracts.Models;
using HexClanApplication.Api.Contracts.Services;

namespace HexClanApplication.Api.Controllers
{
    [ApiController]
    [Route("api/campaign")]
    public class CampaignController : ControllerBase
    {
        private readonly ICampaignService _campaignService;
        public CampaignController(ICampaignService campaignService)
        {
            this._campaignService = campaignService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllCampaignsAsync()
        {
            var result = await _campaignService.GetAllCampaignsAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> CreateCampaignAsync(Campaign campaign)
        {
            if (campaign == null)
            {
                return BadRequest();
            }

            var result = await _campaignService.CreateCampaignAsync(campaign);
            return Ok(result);
        }

        //private readonly IMongoCollection<TasksModel> _taskModelsCollection;
        //public TasksController(IMongoClient client)
        //{
        //    var database = client.GetDatabase("HexClanDatabase");
        //    _taskModelsCollection = database.GetCollection<TasksModel>("Tasks");
        //}

        //[HttpGet]
        //public JsonResult Get()
        //{
        //    var dblist = _taskModelsCollection.AsQueryable();
        //    return new JsonResult(dblist);
        //}
        //[HttpPost]
        //public JsonResult Post(TasksModel tsk)
        //{
        //    _taskModelsCollection.InsertOne(tsk);
        //    return new JsonResult("Added successfully");      
        //}

        //// Delete metode tiesiog prie viso api pridėkite id skaičiuką ir ištrins jį.
        //[HttpDelete("{Id}")]
        //public JsonResult Delete(String Id)
        //{
        //    TasksModel task;
        //    task = _taskModelsCollection.Find<TasksModel>(ts => ts.TaskId == Id).FirstOrDefault();
        //    if(task != null)
        //    {
        //        _taskModelsCollection.DeleteOne(a => a.TaskId == Id);
        //        return new JsonResult("Užduotis ištrinta");
        //    }
        //    else
        //    {
        //        return new JsonResult("Užduotis neištrinta");
        //    }

        //}
    }
}

