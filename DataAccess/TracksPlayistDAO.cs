using BusinessObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class TracksPlaylistDAO : SingletonBase<TracksPlaylistDAO>
    {
        public async Task<IEnumerable<TrackPlayList>> GetAllTracksPlaylist()
        {
            return await _context.TrackPlayLists.ToListAsync();
        }

        public async Task<TrackPlayList> GetTracksPlaylistById(Guid trackId, Guid playlistId)
        {
            var track = await _context.TrackPlayLists.FirstOrDefaultAsync(f => f.TrackId == trackId && f.PlaylistId == playlistId);
            if (track == null) return null;
            return track;
        }

        public async Task Add(TrackPlayList track)
        {
            await _context.TrackPlayLists.AddAsync(track);
            await _context.SaveChangesAsync();
        }

        public async Task Update(TrackPlayList trackPlayList)
        {
            var existingItem = await GetTracksPlaylistById(trackPlayList.TrackId, trackPlayList.PlaylistId);
            if (existingItem != null)
            {
                _context.Entry(existingItem).CurrentValues.SetValues(trackPlayList);
            }
            else
            {
                _context.TrackPlayLists.Add(trackPlayList);
            }
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Guid trackId, Guid playlistId)
        {
            var track = await GetTracksPlaylistById(trackId, playlistId);
            if (track != null)
            {
                _context.TrackPlayLists.Remove(track);
                await _context.SaveChangesAsync();
            }
        }
    }

}
