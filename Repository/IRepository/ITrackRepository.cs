using BusinessObjects;

namespace Repositories.IRepository
{
    public interface ITrackRepository
    {
        Task<IEnumerable<Track>> GetAllTracks();
        Task<Track> GetTrackById(Guid trackId);
        Task AddTrack(Track track);
        Task UpdateTrack(Track track);
        Task DeleteTrack(Guid trackId);
    }
}
