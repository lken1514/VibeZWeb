using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    [PrimaryKey(nameof(LibraryId), nameof(AlbumId))]
    public class Library_Album : BaseEntity
    {
        public Guid LibraryId { get; set; }
        public Guid AlbumId { get; set; }
    }
}
