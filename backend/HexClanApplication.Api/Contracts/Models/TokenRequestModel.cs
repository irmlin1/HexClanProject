using System.ComponentModel.DataAnnotations;

namespace HexClanApplication.Api.Contracts.Models
{
    public class TokenRequestModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
