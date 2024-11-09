using BusinessObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.IRepository;

namespace VibeZOData.Controllers
{
    [Route("api/profile")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        IProfileRepository _profileRepository;
        ILogger<ProfileController> _logger;
        public ProfileController(IProfileRepository profileRepository, ILogger<ProfileController> logger)
        {
            _profileRepository = profileRepository;
            _logger = logger;
        }
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<User>> GetProfileInformation(Guid id)
        {
            try
            {
                _logger.LogInformation($"Fetching user with ID: {id}");
                var profile = await _profileRepository.GetProfileInformation(id);
                return Ok(profile);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
