using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public interface IAdvertisementRepository: IGenericRepository<Advertisement>
    {
        Task<List<AdvertisementResponse>> GetAdvertisementsAsync();
        Task<AdvertisementResponse> GetAdvertisementAsync(int id);
        Task<string> GetSpecificAdvertisementType(int id);

        Task<int> GetAdvertisementDuplicatesCount(string advertisementName);
        Task<Advertisement> UpdateAdvertisement(AdvertisementResponse updatedAdResponse, Advertisement advertisement);
    }
}
