using BusinessObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class AlbumDAO : SingletonBase<AlbumDAO>
    {
        public async Task<IEnumerable<Album>> GetAllAlbums()
        {
            return await _context.Albums.ToListAsync();
        }

        public async Task<Album> GetAlbumById(Guid albumId)
        {
            var album = await _context.Albums.FirstOrDefaultAsync(u => u.Id == albumId);
            if (album == null) return null;
            return album;
        }

        public async Task Add(Album album)
        {
            await _context.Albums.AddAsync(album);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Album album)
        {
            var existingItem = await GetAlbumById(album.Id);
            if (existingItem != null)
            {
                _context.Entry(existingItem).CurrentValues.SetValues(album);
            }
            else
            {
                _context.Albums.Add(album);
            }
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Guid albumId)
        {
            var album = await GetAlbumById(albumId);
            if (album != null)
            {
                _context.Albums.Remove(album);
                await _context.SaveChangesAsync();
            }
        }
    }

}
