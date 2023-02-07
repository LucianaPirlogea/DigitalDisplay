using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using System.Xml.Linq;

namespace DigitalDisplayBO.API.Repositories
{
    public class PanelLayoutRepository : GenericRepository<PanelLayout>, IPanelLayoutRepository
    {
        private readonly ILogger<PanelLayoutRepository> _logger;
        private readonly IPanelLayoutZoneRepository _panelLayoutZoneRepository;
        public PanelLayoutRepository(NetRomInternship2022OlandaDevContext context, ILogger<PanelLayoutRepository> logger, IPanelLayoutZoneRepository panelLayoutZoneRepository) : base(context)
        {
            _logger = logger;
            _context = context;
            _panelLayoutZoneRepository = panelLayoutZoneRepository;
        }

        public async Task<int> GetPanelsCountAsync(int id)
        {
            var panels = (from table in _context.Panels
                          where table.PanelLayoutId == id
                          select new
                          {
                              table.Id
                          });
            return panels.ToList().Count;
        }

        public async Task<int> GetZonesCountAsync(int id)
        {
            var zones = (from table in _context.PanelLayoutZones
                         where table.PanelLayoutId == id
                         select new
                         {
                             table.Id
                         });
            return zones.ToList().Count;
        }

        public async Task<bool> IsUsed(int id)
        {
            return await GetPanelsCountAsync(id) > 0;
        }

        public async Task<List<PanelLayoutOverview>> GetPanelLayoutsAsync()
        {

            var panelLayouts = await GetAllAsync();
            var panelLayoutsOverview = new List<PanelLayoutOverview>();

            foreach (var layout in panelLayouts)
            {
                var layoutDTO = new PanelLayoutOverview();
                layoutDTO.Id = layout.Id;
                layoutDTO.Name = layout.Name;

                layoutDTO.panelsNumber = await GetPanelsCountAsync(layoutDTO.Id);
                layoutDTO.zonesNumber = await GetZonesCountAsync(layoutDTO.Id);

                panelLayoutsOverview.Add(layoutDTO);
            }

            return panelLayoutsOverview;

        }
        public async Task<IEnumerable<PanelLayoutData>> GetPanelLayoutsDataAsync()
        {
            var panelLayoutsInfo = await _context.PanelLayouts
                .Select(pl => new PanelLayoutData
                {
                    Id = pl.Id,
                    Name = pl.Name,
                    Rows = pl.Rows,
                    Columns = pl.Columns,
                    RowGap = pl.RowGap,
                    ColumnGap = pl.ColumnGap
                }).ToListAsync();

            foreach (var panelLayoutInfo in panelLayoutsInfo)
            {
                var zones = await _context.PanelLayoutZones
                    .Where(zone => zone.PanelLayoutId == panelLayoutInfo.Id)
                    .Select(zone => new PanelLayoutZoneResponse
                    {
                        RowStart = zone.RowStart,
                        RowSpan = zone.RowSpan,
                        ColumnStart = zone.ColumnStart,
                        ColumnSpan = zone.ColumnSpan
                    }).ToListAsync();

                panelLayoutInfo.panelLayoutZones = zones;
            }

            return panelLayoutsInfo;
        }


        public async Task<PanelLayoutData> GetPanelLayoutDataAsync(int id)
        {
            var panelLayout = await _context.PanelLayouts
                   .Include(panelLayout => panelLayout.PanelLayoutZones)
                   .Where(panelLayout => panelLayout.Id == id)
                   .SingleOrDefaultAsync();

            var panelLayoutData = new PanelLayoutData();
            var panelLayoutZonesResponse = new List<PanelLayoutZoneResponse>();

            panelLayoutData.Id = id;
            panelLayoutData.Name = panelLayout.Name;
            panelLayoutData.Description = panelLayout.Description;
            panelLayoutData.RowGap = panelLayout.RowGap;
            panelLayoutData.Rows = panelLayout.Rows;
            panelLayoutData.ColumnGap = panelLayout.ColumnGap;
            panelLayoutData.Columns = panelLayout.Columns;

            foreach( var zone in panelLayout.PanelLayoutZones)
            {
                var zoneDto = new PanelLayoutZoneResponse();
                zoneDto.RowSpan = zone.RowSpan;
                zoneDto.RowStart = zone.RowStart;
                zoneDto.ColumnSpan = zone.ColumnSpan;
                zoneDto.ColumnStart = zone.ColumnStart;
                panelLayoutZonesResponse.Add(zoneDto);
            }

            panelLayoutData.panelLayoutZones = panelLayoutZonesResponse; 


            return panelLayoutData;
        }



        public async Task<PanelLayout> GetPanelLayoutWithZonesAsync(int id)
        {
            var panelLayout = await _context.PanelLayouts
                   .Include(panelLayout => panelLayout.PanelLayoutZones)
                   .Where(panelLayout => panelLayout.Id == id)
                   .SingleOrDefaultAsync();
            return panelLayout;
        }

        public async Task<DuplicatePanelLayoutInfo> GetDuplicateLayoutInfoAsync(int id)
        {
            var layout = await _context.PanelLayouts
                .Include(l => l.PanelLayoutZones)
                .Where(l => l.Id == id)
                .Select(l => new DuplicatePanelLayoutInfo
                {
                    Id = l.Id,
                    Name = l.Name,
                    Description = l.Description,
                    Rows = l.Rows,
                    Columns = l.Columns,
                    RowGap = l.RowGap,
                    ColumnGap = l.ColumnGap
                }).FirstAsync();

            var layoutZones = await _context.PanelLayoutZones
                .Where(lz => lz.PanelLayoutId == layout.Id)
                .Select(lz => new DuplicatePanelLayoutZoneInfo
                {
                    PanelLayoutId = lz.PanelLayoutId,
                    RowSpan = lz.RowSpan,
                    RowStart = lz.RowStart,
                    ColumnSpan = lz.ColumnSpan,
                    ColumnStart = lz.ColumnStart
                }).ToListAsync();

            layout.PanelLayoutZones = layoutZones;

            return layout;
        }

        public async Task<PanelLayout> DuplicateLayoutAsync(DuplicatePanelLayoutInfo layout, string layoutName)
        {
            var newLayout = new PanelLayout
            {
                Id = 0,
                Name = layoutName,
                Description = layout.Description,
                Rows = layout.Rows,
                Columns = layout.Columns,
                RowGap = layout.RowGap,
                ColumnGap = layout.ColumnGap
            };

            await this.AddAsync(newLayout);

            foreach(var layoutZone in layout.PanelLayoutZones)
            {
                var newLayoutZone = new PanelLayoutZone
                {
                    PanelLayoutId = newLayout.Id,
                    RowSpan = layoutZone.RowSpan,
                    RowStart = layoutZone.RowStart,
                    ColumnSpan = layoutZone.ColumnSpan,
                    ColumnStart = layoutZone.ColumnStart
                };
                await _panelLayoutZoneRepository.AddAsync(newLayoutZone);
            }

            return newLayout;
        }
    }
}
