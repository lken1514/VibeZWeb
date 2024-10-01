using BusinessObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class TrackDAO : SingletonBase<TrackDAO>
    {
        public async Task<IEnumerable<Track>> GetAllTracks()
        {
            return await _context.Tracks.ToListAsync();
        }

        public async Task<Track> GetTrackById(Guid trackId)
        {
            var track = await _context.Tracks.FirstOrDefaultAsync(u => u.TrackId == trackId);
            if (track == null) return null;
            return track;
        }

        public async Task Add(Track track)
        {
            await _context.Tracks.AddAsync(track);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Track track)
        {
            var existingItem = await GetTrackById(track.TrackId);
            if (existingItem != null)
            {
                _context.Entry(existingItem).CurrentValues.SetValues(track);
            }
            else
            {
                _context.Tracks.Add(track);
            }
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Guid trackId)
        {
            var track = await GetTrackById(trackId);
            if (track != null)
            {
                _context.Tracks.Remove(track);
                await _context.SaveChangesAsync();
            }
        }
    }

}
