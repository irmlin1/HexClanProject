using System.ComponentModel.DataAnnotations;

namespace HexClanApplication.Api.Contracts.Models
{
    public class UserRoleDto
    {
        [Required]
        public string RoleName { get; set; }
    }
}
