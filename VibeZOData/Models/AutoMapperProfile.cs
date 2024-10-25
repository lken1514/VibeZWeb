using AutoMapper;
using BusinessObjects;
using VibeZDTO;

namespace VibeZOData.Models
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //CreateMap<User, UserDTO>().ForMember(d => d.RoleName, o => o.MapFrom(src => src.Role.RoleName));
            CreateMap<Track, TrackDTO>()
             .ForMember(dest => dest.ArtistName, opt => opt.MapFrom(src => src.Artist != null ? src.Artist.Name : string.Empty))  // Map Artist.Name -> ArtistName
             .ReverseMap()  // Ánh xạ ngược từ TrackDTO về Track
             .ForPath(dest => dest.Artist.Name, opt => opt.MapFrom(src => src.ArtistName));  // Map ArtistName -> Artist.Name
            CreateMap<Playlist, PlaylistDTO>().ReverseMap();
            CreateMap<Album, AlbumDTO>().ReverseMap();  
            CreateMap<Artist, ArtistDTO>().ReverseMap();
            CreateMap<BlockedArtist, BlockedArtistDTO>().ReverseMap();
            CreateMap<Track_Playlist, TrackPlayListDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();    
        }
    }
}
