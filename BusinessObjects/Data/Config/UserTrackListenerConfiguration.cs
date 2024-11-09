using BusinessObjects.Shared.Constants;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection.Emit;

namespace BusinessObjects.Data.Config
{
    internal class UserTrackListenerConfiguration : BaseConfiguration<UserTrackListener>
    {
        public override void Configure(EntityTypeBuilder<UserTrackListener> builder)
        {
            builder.HasOne(ut => ut.User)
                .WithMany(u => u.UserTrackListeners)
                .HasForeignKey(ut => ut.UserId);

            builder.HasOne(ut => ut.Track)
                .WithMany(t => t.UserTrackListeners)
                .HasForeignKey(ut => ut.TrackId);
        }
    }
}
