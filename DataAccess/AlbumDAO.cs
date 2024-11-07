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
            using var context = new VibeZDbContext();
            return await _context.Albums.AsNoTrackingWithIdentityResolution()
                .Include(x => x.Artist)
                .ToListAsync();
        }
        public async Task<int> CountAlbum(Guid artistId)
        {
            using var context = new VibeZDbContext();
            return await _context.Albums.CountAsync(album => album.ArtistId == artistId);
        }
        public async Task<int> TotalAlbum()
        {
            using var context = new VibeZDbContext();

            return await Task.FromResult(_context.Albums.Count());
        }
        public async Task<IEnumerable<Album>> GetAllAlbumsByArtistId(Guid artistId)
        {
            using var context = new VibeZDbContext();

            return await _context.Albums.Where(x => x.ArtistId == artistId).AsNoTrackingWithIdentityResolution().Include(x => x.Artist).ToListAsync();
        }

        public async Task<Album> GetAlbumById(Guid albumId)
        {
            using var context = new VibeZDbContext();

            var album = await _context.Albums.AsNoTrackingWithIdentityResolution().Include(x => x.Artist).FirstOrDefaultAsync(u => u.Id == albumId); ;
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
