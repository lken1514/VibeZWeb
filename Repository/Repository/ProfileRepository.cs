using BusinessObjects;
using Microsoft.EntityFrameworkCore;
using Repositories.IRepository;
using VibeZDTO;

namespace Repositories.Repository
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly VibeZDbContext _context;
        public ProfileRepository()
        {
            _context = new VibeZDbContext();
        }

        public async Task<ProfileDTO> GetProfileInformation(Guid id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Include(u => u.Playlists)
                .Include(u => u.Follow)
                .FirstOrDefaultAsync();

            if (user == null)
                return null;

            var topTracks = await _context.UserTrackListeners
                .Where(utl => utl.UserId == id)
                .GroupBy(utl => utl.TrackId)
                .OrderByDescending(g => g.Count())
                .Take(10)
                .Select(g => g.Key)
                .ToListAsync();

            var trackDetails = await _context.Tracks
                .Where(t => topTracks.Contains(t.TrackId))
                .Select(t => new ProfileTrackDTO
                {
                    Id = t.TrackId,
                    Name = t.Name,
                    Album = t.Album.Name,
                    Img = t.Image
                })
                .ToListAsync();

            var artistDetails = await _context.Tracks
                .Where(t => topTracks.Contains(t.TrackId))
                .Select(t => new ProfileArtistDTO
                {
                    Id = t.Artist.Id,
                    Name = t.Artist.Name,
                    Img = t.Artist.Image
                })
                .Distinct()
                .ToListAsync();

            var playlists = await _context.Playlists
                .Where(p => p.UserId == user.Id)
                .Select(p => new ProfilePlaylistDTO
                {
                    Id = p.PlaylistId,
                    Name = p.Name,
                    Img = p.Image
                })
                .ToListAsync();

            var profile = new ProfileDTO
            {
                Id = user.Id,
                Name = user.Name,
                PlaylistCount = user.Playlists?.Count ?? 0,
                FollowingCount = user.Follow?.Count ?? 0,
                Image = user.Image,
                TopArtists = artistDetails,
                TopTracks = trackDetails,
                MyPlaylists = playlists
            };

            return profile;
        }
    }
}
