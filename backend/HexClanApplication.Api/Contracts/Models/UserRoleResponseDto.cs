using System;

namespace HexClanApplication.Api.Contracts.Models
{
    public class UserRoleResponseDto
    {
        public Guid RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
