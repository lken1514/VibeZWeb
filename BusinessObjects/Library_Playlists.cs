using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BusinessObjects
{
    [PrimaryKey(nameof(UserId), nameof(PlaylistID))]
    public class Library_Playlists : BaseEntity
    {
        public Guid UserId { get; set; }
        public Playlist playlist { get; set; } = null!;
        public Guid PlaylistID { get; set; }
    }
}