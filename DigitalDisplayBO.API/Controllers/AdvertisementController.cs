using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using DigitalDisplayBO.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DigitalDisplayBO.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdvertisementController : ControllerBase
    {
        private readonly IAdvertisementRepository _advertisementRepository;
        private readonly IAdvertisementTypeRepository _advertisementTypeRepository;
        private readonly ILogger<AdvertisementController> _logger;

        public AdvertisementController(IAdvertisementRepository advertisementRepository,IAdvertisementTypeRepository advertisementTypeRepository  ,ILogger<AdvertisementController> logger)
        {
            _advertisementRepository = advertisementRepository;
            _advertisementTypeRepository = advertisementTypeRepository;
            _logger = logger;
        }
 
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Getting Advertisements Details");
            var advertisements = await _advertisementRepository.GetAdvertisementsAsync();
            if (advertisements.Count == 0)
            {
                return NoContent();
            }
            return Ok(advertisements.OrderByDescending(a => a.CreatedDate));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            _logger.LogInformation("Getting Advertisement Details");
            var advertisement = await _advertisementRepository.GetByIdAsync(id);
            if (advertisement == null)
                return NoContent();

            return Ok(advertisement);
        }

        [HttpPost("AddAdvertisement")]
        public async Task<IActionResult> Create([FromBody] AdvertisementResponse advertisement)
        {
            
            var newAdvertisement = new Advertisement
            {
                Name = advertisement.Name,
                AdvertisementTypeId = advertisement.AdvertisementTypeId,
                GraphicalContentFilename = advertisement.GraphicalContentFilename,
                Text = advertisement.Text,
                TextFontFamily = advertisement.TextFontFamily,
                TextFontSize = advertisement.TextFontSize,
                TextFontColor = advertisement.TextFontColor,
                TextVerticalAlignment = advertisement.TextVerticalAlignment,
                TextHorizontalAlignment = advertisement.TextHorizontalAlignment,
                TextScrolling = advertisement.TextScrolling,
                TextPadding = advertisement.TextPadding,
                CategoryId = advertisement.CategoryId,
                CreatedDate = advertisement.CreatedDate,
                CreatedBy = advertisement.CreatedBy,
                ImageFit = advertisement.ImageFit,
                BirthdayData = advertisement.BirthdayData,
                   
            };

            await _advertisementRepository.AddAsync(newAdvertisement);
            return Ok();

        }


        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AdvertisementResponse updatedAdResponse)
        {
            _logger.LogInformation("Getting Advertisement Details");
            var advertisement = await _advertisementRepository.GetByIdAsync(id);

            if (advertisement == null)
            {
                return NoContent();
            }
            var response = await _advertisementRepository.UpdateAdvertisement(updatedAdResponse, advertisement);
            if(response == null)
            {
                return BadRequest("ERROR_UPDATE_ADVERTISEMENT");
            }
            return Ok();
        }

        [HttpPut("Archive/{id}")]
        public async Task<IActionResult> Archive([FromRoute] int id)
        {
            _logger.LogInformation("Getting Advertisement Details");
            var advertisement = await _advertisementRepository.GetByIdAsync(id);
            if (advertisement == null)
            {
                return NoContent();
            }
            advertisement.Archive = true;
            var response = await _advertisementRepository.UpdateAsync(advertisement);
            if (response == null)
            {
                return BadRequest("ERROR_ARCHIVE_ADVERTISEMENT");
            }
            return Ok(advertisement);
        }

        [HttpPut("Unarchive/{id}")]
        public async Task<IActionResult> Unarchive([FromRoute] int id)
        {
            _logger.LogInformation("Getting Advertisement Details");
            var advertisement = await _advertisementRepository.GetByIdAsync(id);
            if (advertisement == null)
            {
                return NoContent();
            }
            advertisement.Archive = false;
            var response = await _advertisementRepository.UpdateAsync(advertisement);
            if (response == null)
            {
                return BadRequest("ERROR_UNARCHIVE_ADVERTISEMENT");
            }
            return Ok(advertisement);
        }

        [HttpPost("Duplicate/{id}")]
        public async Task<IActionResult> Duplicate([FromRoute] int id)
        {

            var advertisement = await _advertisementRepository.GetByIdAsync(id);

            var advertisementDuplicatesCount = await _advertisementRepository.GetAdvertisementDuplicatesCount(advertisement.Name);

            if(advertisementDuplicatesCount > 0)
            {
                advertisement.Name = $"{advertisement.Name}_copy_{advertisementDuplicatesCount+1}";
            } else
            {
                advertisement.Name = $"{advertisement.Name}_copy";
            }
            
            advertisement.CreatedDate = DateTime.Now;
            advertisement.UpdatedDate = DateTime.Now;
            advertisement.Id = 0;
            var createdAdvertisement = await _advertisementRepository.AddAsync(advertisement);

            if(createdAdvertisement == null)
            {
                return BadRequest("ERROR_ADD_ADVERTISEMENT");
            }

            var returnAdvertisement = await _advertisementRepository.GetAdvertisementAsync(createdAdvertisement.Id);


            return Ok(returnAdvertisement);

        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteAdvertisement([FromRoute] int id)
        {
            _logger.LogInformation("Deleting Advertisement Details");
            var deleteAd = await _advertisementRepository.DeleteAsync(id);
            if(deleteAd == false)
            {
                return BadRequest("ERROR_UPDATE_DATABASE");
            }
            return Ok(deleteAd);

        }
    }
}
