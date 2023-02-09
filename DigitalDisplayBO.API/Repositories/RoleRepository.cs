using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public class RoleRepository : GenericRepository<Role>, IRoleRepository
    {
        public RoleRepository(DigitalDisplayDBContext context) : base(context) { }
    }
}
