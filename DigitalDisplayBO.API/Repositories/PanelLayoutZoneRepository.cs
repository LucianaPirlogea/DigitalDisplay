using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public class PanelLayoutZoneRepository : GenericRepository<PanelLayoutZone>, IPanelLayoutZoneRepository
    {

        protected new DigitalDisplayDBContext _context;

        public PanelLayoutZoneRepository(DigitalDisplayDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
