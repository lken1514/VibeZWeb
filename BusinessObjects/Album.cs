using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class Album : BaseEntity
    {
        public Guid Id { get; set; }
        public Guid ArtistId { get; set; }
        public string Name { get; set; }
        public DateTime DateOfRelease { get; set; }
        public string Image { get; set; }
        public string Nation { get; set; }
        public virtual ICollection<Track> Tracks { get; set; }
        public virtual ICollection<Library_Album>? Library_Albums { get; set; }
    }
}
