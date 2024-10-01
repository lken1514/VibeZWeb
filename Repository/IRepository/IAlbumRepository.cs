using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.IRepository
{
    public interface IAlbumRepository
    {
        Task<IEnumerable<Album>> GetAllAlbums();
        Task<Album> GetAblbumById(Guid albumId);
        Task AddAlbum(Album album);
        Task UpdateAlbum(Album album);
        Task DeleteAlbum(Guid albumId);
    }
}
