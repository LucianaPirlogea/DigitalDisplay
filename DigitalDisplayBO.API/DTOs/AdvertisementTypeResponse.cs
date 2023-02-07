using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.DTOs
{
    public class AdvertisementTypeResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public AdvertisementTypeResponse() { }
        public AdvertisementTypeResponse(AdvertisementType advertisementType)
        {
            this.Id = advertisementType.Id;
            this.Name = advertisementType.Name;
        }
    }
}
