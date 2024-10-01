using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.IRepository
{
    public interface ITracksPlaylistRepository
    {
        Task<IEnumerable<TrackPlayList>> GetAllTracksPlaylists();
        Task<TrackPlayList> GetTracksPlaylistById(Guid trackPlaylistId, Guid playlistId);
        Task AddTracksPlaylist(TrackPlayList TracksPlaylist);
        Task UpdateTracksPlaylist(TrackPlayList TracksPlaylist);
        Task DeleteTracksPlaylist(Guid trackPlaylistId, Guid playlistId);
    }
}
