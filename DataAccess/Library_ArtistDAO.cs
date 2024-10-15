using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class Library_ArtistDAO : SingletonBase<Library_ArtistDAO>
    {
        public async Task<IEnumerable<Library_Artist>> GetAllLibrarieArtists()
        {
            return await _context.Library_Artists.ToListAsync();
        }

        public async Task<Library_Artist> GetLibraryArtistById(Guid libraryID, Guid artistId)
        {
            var library_Artist = await _context.Library_Artists.FirstOrDefaultAsync(f => f.artistID == artistId && f.libraryID == libraryID );
            if (library_Artist == null) return null;
            return library_Artist;
        }

        public async Task Add(Library_Artist library_Artist )
        {
            await _context.Library_Artists.AddAsync(library_Artist);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Library_Artist library_Artist)
        {
            var existingItem = await GetLibraryArtistById(library_Artist.artistID, library_Artist.libraryID);
            if (existingItem != null)
            {
                _context.Entry(existingItem).CurrentValues.SetValues(library_Artist);
            }
            else
            {
                await Add(library_Artist); // Reuse the Add method if it doesn't exist
            }
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Guid artistID, Guid libraryId)
        {
            var library_Artist = await GetLibraryArtistById(artistID, libraryId);
            if ( library_Artist != null)
            {
                _context.Library_Artists.Remove(library_Artist);
                await _context.SaveChangesAsync();
            }
        }
    }
}