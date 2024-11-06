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
    public class FollowRepository : IFollowRepository
    {
        private readonly VibeZDbContext _context;
        public FollowRepository()
        {
            _context = new VibeZDbContext();
        }
        public async Task<IEnumerable<Follow>> GetAllFollows()
        {
            return await FollowDAO.Instance.GetAllFollows();
        }

        public async Task<int> GetAllFollowById(Guid artistId, DateOnly startDate, DateOnly endDate)
        {
            var result = _context.Follows.
                Where(x => x.ArtistId == artistId && x.CreateDate >= startDate && x.CreateDate <= endDate && x.IsFollow == true)
                .Count();
            return result;
        }
        public async Task<int> GetAllUnFollowById(Guid artistId, DateOnly startDate, DateOnly endDate)
        {
            var result = _context.Follows.
                Where(x => x.ArtistId == artistId && x.CreateDate >= startDate && x.CreateDate <= endDate && x.IsFollow == false)
                .Count();
            return result;
        }

        public async Task Add(Follow follow)
        {
            _context.Follows.Add(follow);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Follow follow)
        {
            _context.Follows.Update(follow);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Follow follow)
        {
            _context.Follows.Remove(follow);
            await _context.SaveChangesAsync();
        }
    }

}
