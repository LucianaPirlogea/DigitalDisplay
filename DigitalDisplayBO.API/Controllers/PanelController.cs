using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using DigitalDisplayBO.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalDisplayBO.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PanelController : ControllerBase
    {
        private readonly IPanelRepository _panelRepository;
        private readonly IPanelZoneRepository _panelZoneRepository;
        private readonly IPanelAdvertisementsRepository _panelAdvertisementsRepository;
        private readonly ILogger<PanelController> _logger;
        public PanelController(IPanelRepository panelRepository, IPanelZoneRepository panelZoneRepository, ILogger<PanelController> logger, IPanelAdvertisementsRepository panelAdvertisementsRepository)
        {
            _panelRepository = panelRepository;
            _panelZoneRepository = panelZoneRepository;
            _logger = logger;
            _panelAdvertisementsRepository = panelAdvertisementsRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Getting Panels Details");
            var panels = await _panelRepository.GetPanelsInfoAsync();
            if (panels.Count() == 0)
            {
                return NoContent();
            }
            return Ok(panels);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _logger.LogInformation("Deleting Panel Details");
            var result = await _panelRepository.DeleteAsync(id);

            if(result!=true)
                return BadRequest("ERROR_DELETE_PANEL");

            return Ok(result);
        }

        [HttpPost("AddPanel")]
        public async Task<IActionResult> Create([FromBody] PanelCreateInfo panelCreateInfo)
        {
            var panels = _panelRepository.GetAll();
            var panel = new Panel
            {
                PanelLayoutId = panelCreateInfo.PanelLayoutId,
                Name = panelCreateInfo.Name,
                BackgroundColor = panelCreateInfo.BackgroundColor,
                BackgroundImageFilename = panelCreateInfo.BackgroundImageFilename
            };

            if(panels.ToList().Find(el => el.Name == panel.Name) != null)
            {
                return BadRequest("NAME_ALREADY_IN_USE");
            }

            await _panelRepository.AddAsync(panel);

            await _panelAdvertisementsRepository.AddZonesAsync(panel, panelCreateInfo.Zones);

            return Ok();
        }

        [HttpPut("UpdatePanel/{id}")]
        public async Task<IActionResult> Update([FromBody] PanelUpdateInfo panelUpdateInfo)
        {
            var panelUpdated = await _panelRepository.GetByIdAsync(panelUpdateInfo.Id);
            panelUpdated.Name = panelUpdateInfo.Name;
            await _panelRepository.UpdateAsync(panelUpdated);
            return Ok(panelUpdated);
        }

        [HttpPost("DuplicatePanel/{id}&={fileName}")]
        public async Task<IActionResult> Duplicate([FromRoute] int id, string fileName)
        {
            var panel = await _panelRepository.GetDuplicatePanelInfoAsync(id);
            var panels = await _panelRepository.GetAllAsync();
            var countPanel = panels.ToList().FindAll(el => el.Name == panel.Name || el.Name.Split("_")[0] == panel.Name).Count;
            var panelName = panel.Name + string.Concat(Enumerable.Repeat("_copy", countPanel));
            panel.BackgroundImageFilename = fileName;
            var newPanel = await _panelRepository.DuplicatePanelAsync(panel, panelName);
                
            var returnPanel = new PanelInfo
            {
                Id = newPanel.Id,
                PanelLayoutId = newPanel.PanelLayoutId,
                Name = newPanel.Name,
                BackgroundColor = newPanel.BackgroundColor,
                BackgroundImageFilename = newPanel.BackgroundImageFilename,
                ZoneCount = newPanel.PanelZones.Count,
                Devices = new List<PanelInfoDevice>()
            };

            return Ok(returnPanel);
        }
    }
}
