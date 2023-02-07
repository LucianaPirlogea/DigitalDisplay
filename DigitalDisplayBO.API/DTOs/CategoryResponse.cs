using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.DTOs
{
    public class CategoryResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public CategoryResponse() { }
        public CategoryResponse(Category category)
        {
            this.Id = category.Id;
            this.Name = category.Name;
            this.Description = category.Description;
        }
    }
}
