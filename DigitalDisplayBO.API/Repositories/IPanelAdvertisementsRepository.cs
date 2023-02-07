using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public interface IPanelAdvertisementsRepository : IGenericRepository<PanelAdvertisement>
    {
        public Task<List<PanelAdvertisement>> AddZonesAsync(Panel panel, List<PanelZoneInfo> zones);
    }
}
