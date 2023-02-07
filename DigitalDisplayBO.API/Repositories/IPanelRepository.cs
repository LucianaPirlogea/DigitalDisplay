using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public interface IPanelRepository : IGenericRepository<Panel>
    {
        Task<IEnumerable<PanelInfo>> GetPanelsInfoAsync();
        Task<DuplicatePanelInfo> GetDuplicatePanelInfoAsync(int id);
        Task<Panel> DuplicatePanelAsync(DuplicatePanelInfo panel, string panelName);
    }
}
