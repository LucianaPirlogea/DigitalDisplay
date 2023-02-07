using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public class PanelAdvertisementsRepository : GenericRepository<PanelAdvertisement>, IPanelAdvertisementsRepository
    {
        protected new NetRomInternship2022OlandaDevContext _context;
        private readonly IPanelZoneRepository _panelZoneRepository;

        public PanelAdvertisementsRepository(NetRomInternship2022OlandaDevContext context, IPanelZoneRepository panelZoneRepository) : base(context)
        {
            _panelZoneRepository = panelZoneRepository;
        }

        public async Task<List<PanelAdvertisement>> AddZonesAsync(Panel panel, List<PanelZoneInfo> zones)
        {
            var addedZones = new List<PanelAdvertisement>();
            foreach (var zone in zones)
            {
                var panelZone = new PanelZone
                {
                    PanelId = panel.Id,
                    ZoneNumber = zone.ZoneNumber,
                    ZoneType = zone.ZoneType
                };
                await _panelZoneRepository.addPanelZone(panelZone);

                foreach (var adId in zone.AdvertisementIds)
                {
                    var assignAdPanelZone = new PanelAdvertisement
                    {
                        PanelZoneId = panelZone.Id,
                        AdvertisementId = adId
                    };
                    await AddAsync(assignAdPanelZone);
                    addedZones.Add(assignAdPanelZone);
                }

            }
            return addedZones;
        }
    }
}
