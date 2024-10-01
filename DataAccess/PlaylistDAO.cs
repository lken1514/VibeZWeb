using BusinessObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class PlaylistDAO : SingletonBase<PlaylistDAO>
    {
        public async Task<IEnumerable<Playlist>> GetAllPlaylists()
        {
            return await _context.Playlists.ToListAsync();
        }

        public async Task<Playlist> GetPlaylistById( Guid playlistId)
        {
            var track = await _context.Playlists.FirstOrDefaultAsync(f => f.PlaylistId == playlistId);
            if (track == null) return null;
            return track;
        }

        public async Task Add(Playlist track)
        {
            await _context.Playlists.AddAsync(track);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Playlist playlist)
        {
            var existingItem = await GetPlaylistById( playlist.PlaylistId);
            if (existingItem != null)
            {
                _context.Entry(existingItem).CurrentValues.SetValues(playlist);
            }
            else
            {
                _context.Playlists.Add(playlist);
            }
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Guid playlistId)
        {
            var track = await GetPlaylistById(playlistId);
            if (track != null)
            {
                _context.Playlists.Remove(track);
                await _context.SaveChangesAsync();
            }
        }
    }

}
