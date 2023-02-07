using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(NetRomInternship2022OlandaDevContext context) : base(context)
        {

        }
    }
}
