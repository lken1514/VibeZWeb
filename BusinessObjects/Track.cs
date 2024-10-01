using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class Track : BaseEntity
    {
        public Guid TrackId { get; set; }
        public Guid AlbumId { get; set; }
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public string Lyrics { get; set; }
        public string Path { get; set; }
        public string Image { get; set; }
        public int Listener { get; set; }
        public TimeOnly Time { get; set; }
        public virtual ICollection<Like>? Likes { get; set; }
        public virtual ICollection<TrackPlayList>? TrackPlayLists { get; set; }


    }
}
