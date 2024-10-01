using AutoMapper;
using BusinessObjects;

namespace VibeZOData.Models
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //CreateMap<User, UserDTO>().ForMember(d => d.RoleName, o => o.MapFrom(src => src.Role.RoleName));

        }
    }
}
