using HexClanApplication.Api.Contracts.Services;
using MongoDB.Driver;

namespace HexClanApplication.Api.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _aboutContentCollection;

        public UserService(IMongoClient client)
        {
            var database = client.GetDatabase("HexClanDatabase");
            _aboutContentCollection = database.GetCollection<AboutContent>("AboutContent");
        }

    }
}
