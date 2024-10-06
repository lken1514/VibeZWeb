using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class Playlist : BaseEntity
    {
        public Guid PlaylistId { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        public string Image { get; set; }
        public Guid? CreateUserId { get; set; }

        public virtual ICollection<TrackPlayList> TrackPlayLists { get; set; }
        public virtual ICollection<Library_Playlist>? Library_Playlists { get; set; }
    }
}
