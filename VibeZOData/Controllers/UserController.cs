using BusinessObjects;
using Microsoft.AspNetCore.Mvc;
using Repositories.IRepository;
using Repositories.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VibeZOData.Controllers
{
    [Route("odata/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController()
        {
            _userRepository = new UserRepository();
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            var list = await _userRepository.GetAllUsers();
            return Ok(list);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<User> GetUserByID(Guid id)
        {
            return await _userRepository.GetUserById(id);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult> Post(User User)
        {
            await _userRepository.AddUser(User);
            return Content("Inserted Successfully");
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Guid id, User User)
        {
            var temp = await _userRepository.GetUserById(id);
            if (temp == null)
            {
                return Content("User Not Found");
            }
            User.Id = id;
            await _userRepository.UpdateUser(User);
            return Content("Updated Successfully");
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var temp = await _userRepository.GetUserById(id);
            if (temp == null)
            {
                return Content("User Not Found");
            }
            await _userRepository.DeleteUser(id);
            return Content("Deleted Successfully");
        }

    }
}
