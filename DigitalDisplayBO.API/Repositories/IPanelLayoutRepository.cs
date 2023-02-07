using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using System.Xml.Linq;

namespace DigitalDisplayBO.API.Repositories
{
    public interface IPanelLayoutRepository : IGenericRepository<PanelLayout>
    {
        Task<List<PanelLayoutOverview>> GetPanelLayoutsAsync();
        Task<IEnumerable<PanelLayoutData>> GetPanelLayoutsDataAsync();
        Task<int> GetZonesCountAsync(int id);

        Task<int> ?GetPanelsCountAsync(int id);
        Task<bool>? IsUsed(int id);
        Task<PanelLayoutData> GetPanelLayoutDataAsync(int id);

        Task<PanelLayout> GetPanelLayoutWithZonesAsync(int id);
        Task<DuplicatePanelLayoutInfo> GetDuplicateLayoutInfoAsync(int id);
        Task<PanelLayout> DuplicateLayoutAsync(DuplicatePanelLayoutInfo layout, string layoutName);
    }
}
