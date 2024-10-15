using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    [PrimaryKey(nameof(libraryID), nameof(artistID))]
    public class Library_Artist : BaseEntity
    {
        public Artist artist { get; set; } = null!;
        public Library library { get; set; } = null!;
        public Guid libraryID { get; set; }
        public Guid artistID { get; set; }
    }

    
}