using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace HexClanApplication.Api.Contracts.Models
{
    [CollectionName("UsersTest")]
    public class ApplicationUser:MongoIdentityUser<Guid>
    {
    }
}
