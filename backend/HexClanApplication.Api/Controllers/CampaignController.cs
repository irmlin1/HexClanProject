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

    }
}

