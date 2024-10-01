using BusinessObjects;
using DataAccess;
using Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repository
{
    public class TrackPlaylistRepository : ITracksPlaylistRepository
    {
        public async Task<IEnumerable<TrackPlayList>> GetAllTracksPlaylists()
        {
            return await TracksPlaylistDAO.Instance.GetAllTracksPlaylist();
        }

        public async Task<TrackPlayList> GetTracksPlaylistById(Guid trackPlaylistId, Guid playlistId)
        {
            return await TracksPlaylistDAO.Instance.GetTracksPlaylistById(trackPlaylistId, playlistId);
        }

        public async Task AddTracksPlaylist(TrackPlayList TrackPlaylist)
        {
            await TracksPlaylistDAO.Instance.Add(TrackPlaylist);
        }

        public async Task UpdateTracksPlaylist(TrackPlayList TrackPlaylist)
        {
            await TracksPlaylistDAO.Instance.Update(TrackPlaylist);
        }

        public async Task DeleteTracksPlaylist(Guid TrackPlaylistId, Guid playlistId)
        {
            await TracksPlaylistDAO.Instance.Delete(TrackPlaylistId, playlistId);
        }
    }

}
