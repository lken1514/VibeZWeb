using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    [PrimaryKey(nameof(UserId), nameof(libraryID))]
    public class Library_Album : BaseEntity
    {
        public Guid UserId { get; set; }
        public Library library { get; set; } = null!;
        public Guid libraryID { get; set; }
    }

    
}