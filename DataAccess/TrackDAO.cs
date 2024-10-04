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
            return await _context.Tracks.AsNoTracking().ToListAsync();
        }

        public async Task<Track> GetTrackById(Guid trackId)
        {
            var track = await _context.Tracks.AsNoTracking().FirstOrDefaultAsync(u => u.TrackId == trackId);
            if (track == null) return null;
            return track;
        }
        public async Task<IEnumerable<Track>> GetAllTrackByAlbumId(Guid AlbumId)
        {
            var list = await _context.Tracks.Where(u => u.AlbumId == AlbumId).AsNoTracking().ToListAsync();
            if (list == null) return null;
            return list;
        }

        public async Task Add(Track track)
        {
            await _context.Tracks.AddAsync(track);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateListener(Track track)
        {
            _context.Attach(track);
            track.Listener = track.Listener + 1;
            _context.Entry(track).Property(x => x.Listener).IsModified = true;
            await _context.SaveChangesAsync();

        }
        public async Task Update(Track track)
        {
            _context.Entry(track).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Track track)
        {

                _context.Tracks.Remove(track);
                await _context.SaveChangesAsync();
         
        }
    }

}
