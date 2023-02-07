using DigitalDisplayBO.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DigitalDisplayBO.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdvertisementTypeController : ControllerBase
    {
        private readonly IAdvertisementTypeRepository _advertisementTypeRepository;
        private ILogger<AdvertisementTypeRepository> _logger;

        public AdvertisementTypeController(IAdvertisementTypeRepository advertisementTypeRepository, ILogger<AdvertisementTypeRepository> logger)
        {
            _advertisementTypeRepository = advertisementTypeRepository;
            _logger = logger;
        }

       [HttpGet]
       public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Getting all advertisement types");
            var advertisementTypes = await _advertisementTypeRepository.GetAllAsync();
            if(advertisementTypes.Count() == 0)
            {
                return NoContent();
            }
            return Ok(advertisementTypes);
        }
    }
}
