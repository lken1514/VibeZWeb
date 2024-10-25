using AutoMapper;
using BusinessObjects;
using Microsoft.AspNetCore.Mvc;
using Repositories.IRepository;
using Repositories.Repository;
using VibeZDTO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VibeZOData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackPlaylistController(ITracksPlaylistRepository _trackPlaylistRepository, ILogger _logger, IMapper _mapper) : ControllerBase
    {
        [HttpGet("all", Name = "GetAllTrackPlayList")]
        public async Task<ActionResult<IEnumerable<TrackPlayListDTO>>> GetAllTrackPlayLists()
        {
            _logger.LogInformation("Getting all trackPlayLists");
            var list = await _trackPlaylistRepository.GetAllTracksPlaylists();
            var listDTO = list.Select(
                trackPlayList => _mapper.Map<Track_Playlist, TrackPlayListDTO>(trackPlayList));

            _logger.LogInformation($"Retrieved {listDTO.Count()} trackPlayLists");
            return Ok(listDTO);
        }

        // GET api/<ArtistController>/5
        [HttpGet("{id}", Name = "GetTrackPlaylistById")]
        public async Task<ActionResult<TrackPlayListDTO>> GetTrackPlaylistById(Guid trackId, Guid playlistId)
        {
            _logger.LogInformation($"Fetching TrackPlaylist with trackId {trackId}, playlistId {playlistId}");
            var trackPlayList = await _trackPlaylistRepository.GetTracksPlaylistById(trackId, playlistId);
            if (trackPlayList == null)
            {
                _logger.LogWarning($"TrackPlaylist with trackId {trackId}, playlistId {playlistId} not found");
                return NotFound("TrackPlaylist not found");
            }

            var trackPlaylistDto = _mapper.Map<Track_Playlist, TrackPlayListDTO>(trackPlayList);
            return Ok(trackPlaylistDto);
        }


        // POST api/<TrackPlaylistController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TrackPlaylistController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TrackPlaylistController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
