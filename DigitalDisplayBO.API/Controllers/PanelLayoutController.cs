using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using DigitalDisplayBO.API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace DigitalDisplayBO.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PanelLayoutController : ControllerBase
    {
        private readonly IPanelLayoutRepository _panelLayoutRepository;
        private readonly IPanelLayoutZoneRepository _panelLayoutZoneRepository;
        private readonly ILogger<PanelLayoutController> _logger;

        public PanelLayoutController(IPanelLayoutRepository panelLayoutRepository, IPanelLayoutZoneRepository panelLayoutZoneRepository, ILogger<PanelLayoutController> logger)
        {
            _panelLayoutRepository = panelLayoutRepository;
            _panelLayoutZoneRepository = panelLayoutZoneRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Getting Panel Layouts Details");
            var panelLayouts = await _panelLayoutRepository.GetPanelLayoutsAsync();

            if (panelLayouts.Count == 0)
                return NoContent();
            return Ok(panelLayouts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            _logger.LogInformation("Getting Panel Layout Details");
            var panelLayout = await _panelLayoutRepository.GetPanelLayoutDataAsync(id);

            if (panelLayout == null)
                return NoContent();
            return Ok(panelLayout);
        }

        

        [HttpPost("AddLayout")]
        public async Task<IActionResult> Create([FromBody] PanelLayoutData panelLayoutInfo)
        {
            var panelLayout = new PanelLayout
            {
                Name = panelLayoutInfo.Name,
                Description = panelLayoutInfo.Description,
                Rows = panelLayoutInfo.Rows,
                Columns = panelLayoutInfo.Columns,
                RowGap = panelLayoutInfo.RowGap,
                ColumnGap = panelLayoutInfo.ColumnGap
            };

            await _panelLayoutRepository.AddAsync(panelLayout);

            foreach (var zone in panelLayoutInfo.panelLayoutZones)
            {
                var zoneLayout = new PanelLayoutZone
                {
                    PanelLayoutId = panelLayout.Id,
                    RowStart = zone.RowStart,
                    RowSpan = zone.RowSpan,
                    ColumnStart = zone.ColumnStart,
                    ColumnSpan = zone.ColumnSpan
                };
                await _panelLayoutZoneRepository.AddAsync(zoneLayout);
            }

            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PanelLayoutData updatedPanelLayoutData)
        {
            _logger.LogInformation("Getting Panel Layout Details");
            var panelLayoutWithZones = await _panelLayoutRepository.GetPanelLayoutWithZonesAsync(id);

            panelLayoutWithZones.Name = updatedPanelLayoutData.Name;
            panelLayoutWithZones.Description = updatedPanelLayoutData.Description;
            panelLayoutWithZones.Rows = updatedPanelLayoutData.Rows;
            panelLayoutWithZones.Columns = updatedPanelLayoutData.Columns;
            panelLayoutWithZones.RowGap = updatedPanelLayoutData.RowGap;
            panelLayoutWithZones.ColumnGap = updatedPanelLayoutData.ColumnGap;


            foreach ( var zone in panelLayoutWithZones.PanelLayoutZones)
            {
                await _panelLayoutZoneRepository.DeleteAsync(zone.Id);
            }

            await _panelLayoutRepository.UpdateAsync(panelLayoutWithZones);

            foreach (var zone in updatedPanelLayoutData.panelLayoutZones)
            {
                
                var zoneLayout = new PanelLayoutZone
                {
                    PanelLayoutId = id,
                    RowStart = zone.RowStart,
                    RowSpan = zone.RowSpan,
                    ColumnStart = zone.ColumnStart,
                    ColumnSpan = zone.ColumnSpan
                };
                await _panelLayoutZoneRepository.AddAsync(zoneLayout);
            }


            if (panelLayoutWithZones == null)
                return NoContent();
            return Ok();
        }


        [HttpDelete("DeleteLayout/{id}")]
        public async Task<IActionResult> DeleteLayout([FromRoute] int id)
        {
            _logger.LogInformation("Deleting Panel Layout Details");
            if (await _panelLayoutRepository.IsUsed(id))
            {
                return BadRequest("ERROR_DELETE_PANEL_LAYOUT");
            }
            else
            {
                var deleted = await _panelLayoutRepository.DeleteAsync(id);
                if (deleted == false)
                    return BadRequest("ERROR_UPDATE_DATABASE");
                return Ok(deleted);
            }

        }

        [HttpGet("PanelLayoutsData")]
        public async Task<IActionResult> GetPanelLayoutsData()
        {
            var panelLayoutsInfo = await _panelLayoutRepository.GetPanelLayoutsDataAsync();
            return Ok(panelLayoutsInfo);
        }

        [HttpPost("DuplicatePanelLayout/{id}")]
        public async Task<IActionResult> Duplicate([FromRoute] int id)
        {
            var layout = await _panelLayoutRepository.GetDuplicateLayoutInfoAsync(id);
            var layouts = await _panelLayoutRepository.GetAllAsync();
            var countLayout = layouts.ToList().FindAll(el => el.Name == layout.Name || el.Name.Split("_")[0] == layout.Name).Count;
            var layoutName = layout.Name + string.Concat(Enumerable.Repeat("_copy", countLayout));

            var newLayout = await _panelLayoutRepository.DuplicateLayoutAsync(layout, layoutName);

            var returnLayout = new PanelLayoutOverview
            {
                Id = newLayout.Id,
                Name = newLayout.Name,
                zonesNumber = newLayout.PanelLayoutZones.Count,
                panelsNumber = 0
            };

            return Ok(returnLayout);
        }

    }
}
