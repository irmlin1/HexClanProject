using HexClanApplication.Api.Contracts.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HexClanApplication.Api.Contracts.Services
{
    public interface ICampaignService
    {
        Task<ResponseState> CreateCampaignAsync(Campaign campaign);
        Task<ResponseState> GetAllCampaignsAsync();
    }
}
