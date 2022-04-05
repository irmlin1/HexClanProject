using AspNetCore.Identity.MongoDbCore.Models;
using Microsoft.AspNetCore.Identity;
using MongoDbGenericRepository.Attributes;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HexClanApplication.Api.Contracts.Models
{
    [CollectionName("Users")]
    public class User : MongoIdentityUser<Guid>
    {
        public string firstName { get; set; }
        public string lastName { get; set; }

    }
}
