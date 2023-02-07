using DigitalDisplayBO.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DigitalDisplayBO.API.Repositories
{
    public class AdvertisementTypeRepository : GenericRepository<AdvertisementType>, IAdvertisementTypeRepository
    {

        public AdvertisementTypeRepository(DigitalDisplayDBContext context) : base(context)
        {
           _context = context;
        }

    }
   
}
