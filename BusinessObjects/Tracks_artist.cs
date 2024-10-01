using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    [PrimaryKey(nameof(TrackId),nameof(ArtistId))]
    public class Tracks_artist : BaseEntity
    {
        public Guid TrackId { get; set; }
        public Guid ArtistId { get; set; }
    }
}
