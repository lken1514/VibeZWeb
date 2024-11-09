﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VibeZDTO;

namespace Repositories.IRepository
{
    public interface IProfileRepository
    {
        Task<ProfileDTO> GetProfileInformation(Guid id);
    }
}
