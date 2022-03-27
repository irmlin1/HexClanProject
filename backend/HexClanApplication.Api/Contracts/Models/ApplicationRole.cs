using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace HexClanApplication.Api.Contracts.Models
{
    [CollectionName("Roles")]
    public class ApplicationRole:MongoIdentityRole<Guid>
    {
    }
}
