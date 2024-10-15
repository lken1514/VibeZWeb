using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects;
using Microsoft.EntityFrameworkCore;

namespace VibeZDTO
{
    [PrimaryKey(nameof(LibraryID), nameof(ArtistID))]
    public class Library_ArtistDTO : BaseEntity
    {
        public Guid LibraryID { get; set; }
        public Guid ArtistID { get; set; }
    }
}