using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Salt { get; set; } = null!;
        public int IdRole { get; set; }
        public bool IsDeleted { get; set; }

        public virtual Role IdRoleNavigation { get; set; } = null!;
    }
}
