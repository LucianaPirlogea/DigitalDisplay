using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DigitalDisplayBO.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly IDeviceRepository _deviceRepository;
        private readonly ILogger<DeviceController> _logger;

        public DeviceController(IDeviceRepository deviceRepository, ILogger<DeviceController> logger)
        {
            _deviceRepository = deviceRepository;
            _logger = logger;
        }
        
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Getting Devices Details");

            var devices = await _deviceRepository.GetDevicesInfoAsync();
            if(devices.Count() == 0)
            {
                return NoContent();
            }
            return Ok(devices);
        }
        
       
    }
}
