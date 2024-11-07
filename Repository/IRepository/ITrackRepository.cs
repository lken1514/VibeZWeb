using BusinessObjects;

namespace Repositories.IRepository
{
    public interface ITrackRepository
    {
        Task<IEnumerable<Track>> GetAllTracks();
        Task<IEnumerable<Track>> GetAllTrackByAlbumId(Guid id);
        Task<IEnumerable<Track>> GetAllTrackByArtistId(Guid id);
        Task<Track> GetTrackById(Guid trackId);
        Task AddTrack(Track track);
        Task UpdateTrack(Track track);
        Task UpdateListener(Track track);
        Task DeleteTrack(Track track);
        Task DeleteTrackByAlbumId(Guid albumId);
        Task<IEnumerable<Track>> GetTrackByIds(List<Guid> trackIds);
        Task<IEnumerable<Track>> GetSongRecommendations(List<Guid> recentlyPlayedIds, Guid clickedTrackId, int topN = 10);
    }
}
