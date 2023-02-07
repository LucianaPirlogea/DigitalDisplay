using DigitalDisplayBO.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DigitalDisplayBO.API.Repositories
{
    public class AdvertisementTypeRepository : GenericRepository<AdvertisementType>, IAdvertisementTypeRepository
    {

        public AdvertisementTypeRepository(NetRomInternship2022OlandaDevContext context) : base(context)
        {
           _context = context;
        }

    }
   
}
