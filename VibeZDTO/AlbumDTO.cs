using BusinessObjects;

namespace VibeZDTO
{
    public class AlbumDTO : BaseEntity
    {
        public Guid Id { get; set; }
        public Guid ArtistId { get; set; }
        public string Name { get; set; }
        public DateTime DateOfRelease { get; set; }
        public string Image { get; set; }
        public string Nation { get; set; }
    }
}
