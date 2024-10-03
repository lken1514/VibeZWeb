using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class Artist : BaseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
        public string Image { get; set; }
        public string Nation { get; set; }
        public virtual ICollection<Follow>? Follow { get; set; }
        public virtual ICollection<BlockedArtist>? BlockedArtists { get; set; }
        public virtual ICollection<Album>? Albums { get; set; }
        public virtual ICollection<Library_Artist> Library_Artists { get; set; }
        public virtual ICollection<Tracks_artist>? Tracks_Artists { get; set; }

    }
}
