using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public class PanelZoneRepository:GenericRepository<PanelZone>, IPanelZoneRepository
    {
        protected new NetRomInternship2022OlandaDevContext _context;

        public PanelZoneRepository(NetRomInternship2022OlandaDevContext context) : base(context)
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
