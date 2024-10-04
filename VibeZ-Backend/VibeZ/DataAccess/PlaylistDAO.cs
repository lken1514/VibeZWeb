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
        public async Task<IEnumerable<Playlist>> GetAllPlaylistsByUserId(Guid id)
        {
            return await _context.Playlists.Where(x => x.UserId == id).AsNoTrackingWithIdentityResolution().ToListAsync();
        }
        public async Task<IEnumerable<Playlist>> GetAllPlaylist()
        {
            return await _context.Playlists.AsNoTrackingWithIdentityResolution().ToListAsync();
        }


        public async Task<Playlist> GetPlaylistById(Guid playlistId)
        {
            var track = await _context.Playlists.AsNoTrackingWithIdentityResolution().FirstOrDefaultAsync(f => f.PlaylistId == playlistId);
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
            _context.Attach(playlist);
            _context.Entry(playlist).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Playlist playlist)
        {

            _context.Playlists.Remove(playlist);
            await _context.SaveChangesAsync();
        }
    }

}
