using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    [PrimaryKey(nameof(TrackId), nameof(PlaylistId))]
    public class TrackPlayList : BaseEntity
    {
        public Guid TrackId { get; set; }
        public Guid PlaylistId { get; set; }
    }
}
