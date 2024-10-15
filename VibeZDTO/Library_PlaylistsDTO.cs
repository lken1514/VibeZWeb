using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects;
using Microsoft.EntityFrameworkCore;

namespace VibeZDTO
{
    [PrimaryKey(nameof(UserId), nameof(PlaylistID))]
    public class Library_PlaylistsDTO : BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid PlaylistID { get; set; }
    }
}