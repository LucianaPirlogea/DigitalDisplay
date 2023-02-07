using DigitalDisplayBO.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DigitalDisplayBO.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private ILogger<CategoryRepository> _logger;

        public CategoryController(ICategoryRepository categoryRepository, ILogger<CategoryRepository> logger)
        {
            _categoryRepository = categoryRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Getting all categories");
            var categories = await _categoryRepository.GetAllAsync();
            if(categories.Count() == 0)
            {
                return NoContent();
            }
            return Ok(categories);
        }
    }
}
