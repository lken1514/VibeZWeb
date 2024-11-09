namespace VibeZDTO
{
    public class ProfileDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int PlaylistCount { get; set; }
        public int FollowingCount { get; set; }
        public string Image { get; set; }
        public List<ProfileArtistDTO> TopArtists { get; set; }
        public List<ProfileTrackDTO> TopTracks { get; set; }
        public List<ProfilePlaylistDTO> MyPlaylists { get; set; }
    }

    public class ProfileArtistDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
    }

    public class ProfileTrackDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Album { get; set; }
        public string Img { get; set; }
    }

    public class ProfilePlaylistDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
    }
}
