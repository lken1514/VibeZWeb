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
            return await _context.Albums.AsNoTrackingWithIdentityResolution().ToListAsync();
        }
        public async Task<IEnumerable<Album>> GetAllAlbumsByArtistId(Guid artistId)
        {
            return await _context.Albums.Where(x => x.ArtistId == artistId).AsNoTrackingWithIdentityResolution().ToListAsync();
        }

        public async Task<Album> GetAlbumById(Guid albumId)
        {
            var album = await _context.Albums.AsNoTrackingWithIdentityResolution().FirstOrDefaultAsync(u => u.Id == albumId); ;
            return album;
        }

        public async Task Add(Album album)
        {   
            await _context.Albums.AddAsync(album);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Album album)
        {
            var existingAlbum = await _context.Albums.FirstOrDefaultAsync(a => a.Id == album.Id);
            if (existingAlbum == null)
            {
                throw new InvalidOperationException("Album không tồn tại.");
            }

            existingAlbum.Name = album.Name;
            existingAlbum.DateOfRelease = album.DateOfRelease;
            existingAlbum.Nation = album.Nation;
            if (album.Image != null)
            {
                existingAlbum.Image = album.Image;
            }

            await _context.SaveChangesAsync();
        }


        public async Task Delete(Album album)
        {
            try
            {
                _context.Albums.Remove(album);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException?.Message ?? ex.Message);
                throw;
            }
        }
    }

}
