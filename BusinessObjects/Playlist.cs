﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class Playlist : BaseEntity
    {
        public Guid PlaylistId { get; set; }
        public Guid Name  { get; set; }

        public string Description { get; set; }
        public string Image { get; set; }
        public Guid UserId { get; set; }

        public virtual ICollection<TrackPlayList> TrackPlayLists{ get; set; }

    }
}