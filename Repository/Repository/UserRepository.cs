using BusinessObjects;
using DataAccess;
using Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repository
{
    public class UserRepository : IUserRepository
    {
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await UserDAO.Instance.GetAllUsers();
        }
        public async Task<User> Authenticate(string username, string password)
        {
            return await UserDAO.Instance.Authenticate(username, password);
        }


        public async Task<User> GetUserById(Guid userId)
        {
            return await UserDAO.Instance.GetUserById(userId);
        }

        public async Task AddUser(User user)
        {
            await UserDAO.Instance.Add(user);
        }

        public async Task UpdateUser(User user)
        {
            await UserDAO.Instance.Update(user);
        }

        public async Task DeleteUser(Guid userId)
        {
            await UserDAO.Instance.Delete(userId);
        }
    }
}
