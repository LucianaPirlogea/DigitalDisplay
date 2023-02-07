using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public interface IPanelZoneRepository:IGenericRepository<PanelZone>
    {
        public Task<PanelZone> addPanelZone(PanelZone zone);
    }
}
