using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        public Task<User?> GetUserByEmail(string email);
        public Task<User?> GetUserByEmailAndHashedPassword(string email, string hash);
    }
}
