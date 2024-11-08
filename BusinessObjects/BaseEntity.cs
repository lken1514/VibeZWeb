﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public abstract class BaseEntity
    {
        public DateOnly CreateDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public DateOnly UpdateDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    }
}
