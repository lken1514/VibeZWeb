using BusinessObjects;
using Microsoft.AspNetCore.Mvc;
using Repositories.IRepository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VibeZOData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController(ILibraryRepository _libraryRepository) : ControllerBase
    {
        // GET: api/<Library>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Library>>> GetAll()
        {
            var list = await _libraryRepository.GetAllLibraries();
            Console.Write("CONCACCCCCCCCCCCCCCCC");
            return Ok(list);
        }

        // GET api/<Library>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Library>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Library>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Library>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
