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
            CreateMap<Track, TrackDTO>().ReverseMap();
            CreateMap<Playlist, PlaylistDTO>().ReverseMap();
            CreateMap<Album, AlbumDTO>().ReverseMap();  
        }
    }
}
