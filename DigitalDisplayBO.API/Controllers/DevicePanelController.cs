using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using DigitalDisplayBO.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DigitalDisplayBO.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DevicePanelController : ControllerBase
    {
        private readonly IDevicePanelRepository _devicePanelRepository;
        private readonly ILogger<DevicePanelController> _logger;
        public DevicePanelController(IDevicePanelRepository devicePanelRepository, ILogger<DevicePanelController> logger)
        {
            _devicePanelRepository = devicePanelRepository;
            _logger = logger;
        }

        [HttpPost("AssignPanelDevice")]
        public async Task<IActionResult> AssignPanel([FromBody] List<PanelDeviceRequest> panelDeviceRequest)
        {
            var ids = new List<int>();
            foreach (var device in panelDeviceRequest)
            {
                var devicePanel = new DevicePanel
                {
                    DeviceId = device.DeviceId,
                    PanelId = device.PanelId,
                    StartDateTime = device.StartDateTime,
                };
                await _devicePanelRepository.AddAsync(devicePanel);
                ids.Add(devicePanel.Id);
            }
            return Ok(ids);

        }

        [HttpDelete("{devicePanelId}")]
        public async Task<IActionResult> Delete(int devicePanelId)
        {
            _logger.LogInformation("Deleting Assign Device Panel Details");
            var result = await _devicePanelRepository.DeleteAsync(devicePanelId);

            if (result == false)
            {
                return BadRequest("ERROR_DELETE_ASSIGN_DEVICE_PANEL");
            }

            return Ok(result);
        }

    }
}
