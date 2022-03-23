using HexClanApplication.Api.Contracts.Models;
using Microsoft.AspNetCore.Mvc;

namespace HexClanApplication.Api.Contracts.Services
{
    public interface IAboutContentService
    {
        JsonResult GetContent();
        JsonResult UpdateContent(AboutContent content);
    }
}
