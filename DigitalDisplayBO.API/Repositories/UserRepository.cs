using DigitalDisplayBO.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DigitalDisplayBO.API.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(DigitalDisplayDBContext context) : base(context) { }
        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users.Where(a => a.Email == email && !a.IsDeleted).FirstOrDefaultAsync();
        }
        public async Task<User?> GetUserByEmailAndHashedPassword(string email, string hash)
        {
            return await _context.Users.Where(a => a.Email == email &&
            a.Password == hash && !a.IsDeleted).FirstOrDefaultAsync();
        }

    }
}
