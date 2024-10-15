using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class Library_PlaylistsDAO : SingletonBase<Library_PlaylistsDAO>
    {
        public async Task<IEnumerable<Library_Playlists>> GetAllLibrariePlaylists()
        {
            return await _context.Library_Playlists.ToListAsync();
        }

        public async Task<Library_Playlists> GetLibraryPlaylistById(Guid userId, Guid PlaylistId)
        {
            var lbp = await _context.Library_Playlists.FirstOrDefaultAsync(f => f.UserId == userId && f.PlaylistID == PlaylistId );
            if (lbp == null) return null;
            return lbp;
        }

        public async Task Add(Library_Playlists library_Playlists)
        {
            await _context.Library_Playlists.AddAsync(library_Playlists);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Library_Playlists library_Playlists)
        {
            var existingItem = await GetLibraryPlaylistById(library_Playlists.UserId, library_Playlists.PlaylistID);
            if (existingItem != null)
            {
                _context.Entry(existingItem).CurrentValues.SetValues(library_Playlists);
            }
            else
            {
                await Add(library_Playlists); // Reuse the Add method if it doesn't exist
            }
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Guid userId, Guid playlistId)
        {
            var library_Playlists = await GetLibraryPlaylistById(userId, playlistId);
            if ( library_Playlists != null)
            {
                _context.Library_Playlists.Remove(library_Playlists);
                await _context.SaveChangesAsync();
            }
        }
    }
}