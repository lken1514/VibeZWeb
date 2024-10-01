﻿using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VibeZDTO
{
    public class LibraryDTO : BaseEntity
    {
        public Guid Id { get; set; }
        public Guid ArtistId { get; set; }
        public Guid PlaylistId { get; set; }
        public Guid AlbumId { get; set; }
        public Guid UserId { get; set; }
    }
}