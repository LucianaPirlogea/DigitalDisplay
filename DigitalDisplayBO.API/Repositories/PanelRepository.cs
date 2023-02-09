using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace DigitalDisplayBO.API.Repositories
{
    public class PanelRepository : GenericRepository<Panel>, IPanelRepository
    {
        private readonly ILogger<PanelRepository> _logger;
        protected new DigitalDisplayDBContext _context;
        private readonly IPanelZoneRepository _panelZoneRepository;
        private readonly IPanelAdvertisementsRepository _panelAdvertisementsRepository;

        public PanelRepository(DigitalDisplayDBContext context, ILogger<PanelRepository> logger, IPanelZoneRepository panelZoneRepository, IPanelAdvertisementsRepository panelAdvertisementsRepository) : base(context)
        {
            _context = context;
            _logger = logger;
            _panelZoneRepository = panelZoneRepository;
            _panelAdvertisementsRepository = panelAdvertisementsRepository;
        }

        public async Task<IEnumerable<PanelInfo>> GetPanelsInfoAsync()
        {
            var panels = await _context.Panels
            .Include(p => p.PanelZones)
            .Select(p => new PanelInfo
            {
                Id = p.Id,
                Name = p.Name,
                PanelLayoutId = p.PanelLayoutId,
                BackgroundColor = p.BackgroundColor,
                BackgroundImageFilename = p.BackgroundImageFilename,
                ZoneCount = p.PanelZones.Count()
            }).ToListAsync();


            foreach (var panel in panels)
            {
                var layout = await _context.PanelLayouts
                    .Where(l => l.Id == panel.PanelLayoutId)
                    .Select(p => new string(p.Name)).FirstAsync();

                panel.PanelLayoutName = layout;

                var devices = await _context.DevicePanels
                    .Include(dp => dp.Device)
                    .Where(dp => dp.PanelId == panel.Id)
                    .Select(dp => new PanelInfoDevice
                    {
                        Id = dp.Id,
                        DeviceId = dp.Device.Id,
                        Name = dp.Device.Name,
                        Location = dp.Device.Location,
                        StartDateTime = dp.StartDateTime
                    }).ToListAsync();

                panel.Devices = devices;


            }

            return panels;


        }

        public async Task<DuplicatePanelInfo> GetDuplicatePanelInfoAsync(int id)
        {
            var panel = await _context.Panels
                .Include(p => p.PanelZones)
                .Where(p => p.Id == id)
                .Select(p => new DuplicatePanelInfo
                {
                    Id = p.Id,
                    PanelLayoutId = p.PanelLayoutId,
                    Name = p.Name,
                    BackgroundColor = p.BackgroundColor,
                    BackgroundImageFilename = p.BackgroundImageFilename,
                })
                .FirstAsync();

            var zones = await _context.PanelZones
                .Include(z => z.PanelAdvertisements)
                .Where(z => z.PanelId == panel.Id)
                .Select(z => new DuplicatePanelZoneInfo
                {
                    Id = z.Id,
                    PanelId = z.PanelId,
                    ZoneNumber = z.ZoneNumber,
                    BackgroundColor = z.BackgroundColor,
                    BackgroundImageContent = z.BackgroundImageContent,
                    BackgroundImageFilename = z.BackgroundImageFilename,
                    Effect = z.Effect,
                    ZoneType = z.ZoneType,
                    ZoneSettings = z.ZoneSettings,
                }).ToListAsync();
            panel.PanelZones = zones;

            foreach(var zone in zones)
            {
                var advertisement = await _context.PanelAdvertisements
                    .Where(a => a.PanelZoneId == zone.Id)
                    .Select(a => new DuplicatePanelAdvertisementInfo
                    {
                        Id = a.Id,
                        PanelZoneId = a.PanelZoneId,
                        AdvertisementId = a.AdvertisementId,
                    }).ToListAsync();
                zone.PanelAdvertisements = advertisement;
            }
            return panel;
        }

        public async Task<Panel> DuplicatePanelAsync(DuplicatePanelInfo panel, string panelName)
        {
            var newPanel = new Panel
            {
                Id = 0,
                PanelLayoutId = panel.PanelLayoutId,
                Name = panelName,
                BackgroundColor = panel.BackgroundColor,
                BackgroundImageFilename = panel.BackgroundImageFilename,
            };
            await this.AddAsync(newPanel);

            foreach (var panelZone in panel.PanelZones)
            {
                var newPanelZone = new PanelZone
                {
                    PanelId = newPanel.Id,
                    ZoneNumber = panelZone.ZoneNumber,
                    BackgroundColor = panelZone.BackgroundColor,
                    BackgroundImageFilename = panelZone.BackgroundImageFilename,
                    Effect = panelZone.Effect,
                    ZoneType = panelZone.ZoneType,
                    ZoneSettings = panelZone.ZoneSettings,
                };
                await _panelZoneRepository.AddAsync(newPanelZone);
                foreach (var advertisement in panelZone.PanelAdvertisements)
                {
                    var newAdvertisement = new PanelAdvertisement
                    {
                        PanelZoneId = newPanelZone.Id,
                        AdvertisementId = advertisement.AdvertisementId,
                    };
                    await _panelAdvertisementsRepository.AddAsync(newAdvertisement);
                }
            }

            return newPanel;
        }
    }
}
