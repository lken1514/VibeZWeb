using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.IRepository
{
    public interface IPlaylistRepository
    {
        Task<IEnumerable<Playlist>> GetAllPlaylists();
        Task<Playlist> GetPlaylistById(Guid playlistId);
        Task AddPlaylist(Playlist Playlist);
        Task UpdatePlaylist(Playlist Playlist);
        Task DeletePlaylist(Guid playlistId);
    }
}
