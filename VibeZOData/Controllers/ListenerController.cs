using BusinessObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.IRepository;
using Repositories.Repository;
using StackExchange.Redis;
using System.Text.Json;
using VibeZDTO;

namespace VibeZOData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListenerController : ControllerBase
    {
        private readonly IConnectionMultiplexer _redis;
        private readonly IDatabase _redisDatabase;
        private readonly IUserRepository _userRepository;
        private readonly ITrackRepository _trackRepository;

        public ListenerController(IConnectionMultiplexer redis, IUserRepository userRepository, ITrackRepository trackRepository)
        {
            _redis = redis;
            _redisDatabase = redis.GetDatabase();
            _userRepository = userRepository;
            _trackRepository = trackRepository;
        }

        [HttpPost("listen")]
        public async Task<IActionResult> SaveTrackListener([FromBody] UserTrackListenerDTO listener)
        {
            Console.WriteLine($"Listener: {listener.UserId}");
            Console.WriteLine($"Listener: {listener.TrackId}");
            
            var user = await _userRepository.GetUserById(listener.UserId);
            var track = await _trackRepository.GetTrackById(listener.TrackId);

            if (user == null || track == null)
            {
                return BadRequest("Invalid user or track.");
            }


            if (!_redis.IsConnected)
                return StatusCode(StatusCodes.Status500InternalServerError, "Redis is not connected.");

            var realListener = new UserTrackListener
            {
                Id = Guid.NewGuid(),
                UserId = listener.UserId,
                TrackId = listener.TrackId,
                ListenedAt = DateTime.UtcNow
            };

            try
            {
                await _redisDatabase.ListRightPushAsync("UserTrackListeners", JsonSerializer.Serialize(realListener));
                return Ok("Saved to Redis.");
            }
            catch (RedisConnectionException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Failed to save to Redis: {ex.Message}");
            }
        }
    }
}
