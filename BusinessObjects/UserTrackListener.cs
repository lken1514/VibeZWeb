using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class UserTrackListener : BaseEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid TrackId { get; set; }
        public DateTime ListenedAt { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        public virtual User User { get; set; } = null;
        [JsonIgnore]
        public virtual Track Track { get; set; } = null;
    }
}
