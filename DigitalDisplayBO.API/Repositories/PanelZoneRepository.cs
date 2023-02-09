using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public class PanelZoneRepository:GenericRepository<PanelZone>, IPanelZoneRepository
    {
        protected new DigitalDisplayDBContext _context;

        public PanelZoneRepository(DigitalDisplayDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<PanelZone> addPanelZone(PanelZone zone)
        {
            await AddAsync(zone);
            return zone;
        }

    }
}
