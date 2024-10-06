using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class Library : BaseEntity
    {
        public Guid Id { get; set; }    
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Library_Album>? Library_Albums { get; set; }
        public virtual ICollection<Library_Artist>? Library_Artists { get; set; }
        public virtual ICollection<Library_Playlist>? Library_Playlists { get; set; }
    }
}