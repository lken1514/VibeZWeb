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
    public class TrackRepository : ITrackRepository
    {
        public async Task<IEnumerable<Track>> GetAllTracks()
        {
            return await TrackDAO.Instance.GetAllTracks();
        }

        public async Task<Track> GetTrackById(Guid trackId)
        {
            return await TrackDAO.Instance.GetTrackById(trackId);
        }

        public async Task AddTrack(Track track)
        {
            await TrackDAO.Instance.Add(track);
        }

        public async Task UpdateTrack(Track track)
        {
            await TrackDAO.Instance.Update(track);
        }

        public async Task DeleteTrack(Guid trackId)
        {
            await TrackDAO.Instance.Delete(trackId);
        }
    }
}
