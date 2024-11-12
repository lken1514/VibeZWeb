using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VibeZDTO
{
    public class AdminStatisticsRowDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public decimal Amount { get; set; }
        public string TypeOfPremium { get; set; }
    }
    public class AdminStatisticsDTO
    {
        public decimal Mini { get; set; }
        public decimal Standard { get; set; }
        public decimal Student { get; set; }
        public List<AdminStatisticsRowDTO> Table { get; set; }
    }
}
