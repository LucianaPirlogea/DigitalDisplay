using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public class PanelLayoutZoneRepository : GenericRepository<PanelLayoutZone>, IPanelLayoutZoneRepository
    {

        protected new NetRomInternship2022OlandaDevContext _context;

        public PanelLayoutZoneRepository(NetRomInternship2022OlandaDevContext context) : base(context)
        {
            _context = context;
        }
    }
}
