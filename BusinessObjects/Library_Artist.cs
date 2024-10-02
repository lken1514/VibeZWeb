using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    [PrimaryKey(nameof(LibraryId), nameof(ArtistId))]
    public class Library_Artist : BaseEntity
    {
        public Guid LibraryId { get; set; }
        public Guid ArtistId { get; set; }
    }
}
