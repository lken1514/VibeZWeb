using BusinessObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class ArtistDAO : SingletonBase<ArtistDAO>
    {
        public async Task<IEnumerable<Artist>> GetAllArtists()
        {
            return await _context.Artists.ToListAsync();
        }

        public async Task<Artist> GetArtistById(Guid artistId)
        {
            var artist = await _context.Artists.FirstOrDefaultAsync(u => u.Id == artistId);
            if (artist == null) return null;
            return artist;
        }

        public async Task Add(Artist artist)
        {
            await _context.Artists.AddAsync(artist);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Artist artist)
        {
            var existingItem = await GetArtistById(artist.Id);
            if (existingItem != null)
            {
                _context.Entry(existingItem).CurrentValues.SetValues(artist);
            }
            else
            {
                _context.Artists.Add(artist);
            }
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Guid artistId)
        {
            var artist = await GetArtistById(artistId);
            if (artist != null)
            {
                _context.Artists.Remove(artist);
                await _context.SaveChangesAsync();
            }
        }
    }

}
