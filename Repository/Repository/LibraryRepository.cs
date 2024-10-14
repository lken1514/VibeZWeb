using BusinessObjects;
using DataAccess;
using Repositories.IRepository;

namespace Repositories.Repository
{
    public class LibraryRepository : ILibraryRepository
    {
        //public async Task<Guid> GenerateUniqueLibraryIdAsync()
        //{
        //    Guid libraryId;
        //    Library exists;
        //    do
        //    {
        //        libraryId = Guid.NewGuid();
        //        exists = await LibraryDAO.Instance.GetLibraryById(libraryId);
        //    } while (exists != null);
        //    return libraryId;
        //}
        public async Task<IEnumerable<Library>> GetAllLibraries()
        {
            return await LibraryDAO.Instance.GetAllLibraries();
        }

        public async Task<Library> GetLibraryById(Guid libraryId)
        {
            return await LibraryDAO.Instance.GetLibraryById(libraryId);
        }

        public async Task AddLibrary(Library library)
        {
            await LibraryDAO.Instance.Add(library);
        }

        public async Task UpdateLibrary(Library library)
        {
            await LibraryDAO.Instance.Update(library);
        }

        public async Task DeleteLibrary(Guid libraryId)
        {
            await LibraryDAO.Instance.Delete(libraryId);
        }
    }
}
