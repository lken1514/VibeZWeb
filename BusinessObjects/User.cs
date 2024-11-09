﻿using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class User : BaseEntity
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Gender { get; set; }
        public string Role { get; set; } = "User";
        public bool? IsBanned { get; set; }
        public string UserName { get; set; }
        public DateOnly? DOB { get; set; }
        public string Premium { get; set; } = "Free";
        // Added IsVerified field
        //public bool IsVerified { get; set; } = false;
        public virtual Library? Library { get; set; }
        public Artist Artist { get; set; }  
        [JsonIgnore]  // Bỏ qua khi serializing/
        public virtual ICollection<Playlist>? Playlists  { get; set; }
        [JsonIgnore]
        public virtual ICollection<Follow>? Follow { get; set; }
        [JsonIgnore]
        public virtual ICollection<BlockedArtist>? BlockedArtists { get; set; }
        [JsonIgnore]
        public virtual ICollection<Payment>? Payment { get; set; }
        [JsonIgnore]
        public virtual ICollection<User_package>? User_package { get; set; }
        [JsonIgnore]
        public virtual ICollection<Like>? Likes { get; set; }
    }
}