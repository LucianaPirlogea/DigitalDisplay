using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(DigitalDisplayDBContext context) : base(context)
        {

        }
    }
}
