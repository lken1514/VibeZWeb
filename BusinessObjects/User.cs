using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class User : BaseEntity
    {
        public Guid Id { get; set; }        
        public virtual Library? Library { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Gender { get; set; }
        public string Role { get; set; } = "User";

        public string UserName { get; set; }
        public DateOnly? DOB { get; set; }
        public string Premium { get; set; } = "Free";

        public virtual ICollection<Follow> ? Follow { get; set; }
        public virtual ICollection<BlockedArtist>? BlockedArtists { get; set; }
        public virtual ICollection<Payment>? Payment { get; set; }
        public virtual ICollection<User_package> ? User_package { get; set; }
        public virtual ICollection<Like>? Likes { get; set; }
    }
}
