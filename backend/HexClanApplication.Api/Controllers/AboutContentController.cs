using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using HexClanApplication.Api.Contracts.Models;
using HexClanApplication.Api.Contracts.Services;

namespace HexClanApplication.Api.Controllers
{
    [ApiController]
    [Route("api/about")]
    public class AboutContentController : ControllerBase
    {
        private readonly IAboutContentService aboutContentService;
        public AboutContentController(IAboutContentService aboutContentService)
        {
            this.aboutContentService = aboutContentService;
        }

        [HttpGet]
        public JsonResult GetContent()
        {
            return aboutContentService.GetContent();
        }

        [HttpPost]
        public JsonResult UpdateContent(AboutContent content)
        {
            return aboutContentService.UpdateContent(content);
        }
    }
}
