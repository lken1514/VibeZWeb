using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects;
using Microsoft.EntityFrameworkCore;

namespace VibeZDTO
{
    [PrimaryKey(nameof(UserId), nameof(Library.Id))]
    public class Library_AlbumDTO : BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid LibraryId { get; set; }
    }
}