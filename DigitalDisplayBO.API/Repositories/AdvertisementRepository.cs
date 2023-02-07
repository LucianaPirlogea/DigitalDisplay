using DigitalDisplayBO.API.Controllers;
using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace DigitalDisplayBO.API.Repositories
{
    public class AdvertisementRepository : GenericRepository<Advertisement>, IAdvertisementRepository
    {
        private readonly ILogger<AdvertisementRepository> _logger;
        public AdvertisementRepository(NetRomInternship2022OlandaDevContext context, ILogger<AdvertisementRepository> logger) : base(context) {
            _logger = logger;    
        }

        public async Task<string> GetSpecificCategory(int id)
        {
            var query = (from category in _context.Set<Category>()
                         where category.Id == id
                         select category.Name
                         ).FirstAsync();

            return await query;
        }
        public async Task<string> GetSpecificAdvertisementType(int id)
        {
      
            var query = (from advertisementType in _context.Set<AdvertisementType>()
                         where advertisementType.Id == id
                         select advertisementType.Name
                         ).FirstAsync();

            return await query;
        }

        public async Task<List<AdvertisementResponse>> GetAdvertisementsAsync()
        {
            var advertisements = await GetAllAsync();
            var orderedAds = advertisements.OrderBy(o => o.CreatedDate).ToList();

            var ads = new List<AdvertisementResponse>();

            foreach (var ad in orderedAds)
            {
                
                var adDTO = new AdvertisementResponse(ad);
                adDTO.AdvertisementType = await GetSpecificAdvertisementType(ad.AdvertisementTypeId);
                adDTO.CategoryName = await GetSpecificCategory(ad.CategoryId);
                ads.Add(adDTO);
            }
            return ads;
        }

        public async Task<AdvertisementResponse> GetAdvertisementAsync(int id)
        {
            var advertisement = await GetByIdAsync(id);
           

            var advertisementDTO = new AdvertisementResponse(advertisement);
            advertisementDTO.AdvertisementType = await GetSpecificAdvertisementType(advertisement.AdvertisementTypeId);
            advertisementDTO.CategoryName = await GetSpecificCategory(advertisement.CategoryId);
            
            return advertisementDTO;
        }

        public async Task<int> GetAdvertisementDuplicatesCount(string advertisementName)
        {
            var duplicatedName = $"{advertisementName}_copy";
            var advertisementDuplicatesCount = await _context.Advertisements.Where(advertisement => advertisement.Name.Contains($"{duplicatedName}")).CountAsync();
            return advertisementDuplicatesCount;
        }

        public async Task<Advertisement> UpdateAdvertisement(AdvertisementResponse updatedAdResponse, Advertisement advertisement)
        {
            advertisement.Name = updatedAdResponse.Name;
            advertisement.Text = updatedAdResponse.Text;
            advertisement.TextFontFamily = updatedAdResponse.TextFontFamily;
            advertisement.TextFontSize = updatedAdResponse.TextFontSize;
            advertisement.TextFontColor = updatedAdResponse.TextFontColor;
            advertisement.TextVerticalAlignment = updatedAdResponse.TextVerticalAlignment;
            advertisement.TextHorizontalAlignment = updatedAdResponse.TextHorizontalAlignment;
            advertisement.ImageFit = updatedAdResponse.ImageFit;
            advertisement.GraphicalContentFilename = updatedAdResponse.GraphicalContentFilename;
            advertisement.TextScrolling = updatedAdResponse.TextScrolling;
            advertisement.TextPadding = updatedAdResponse.TextPadding;
            advertisement.CategoryId = updatedAdResponse.CategoryId;
            advertisement.CreatedDate = updatedAdResponse.CreatedDate;
            advertisement.CreatedBy = updatedAdResponse.CreatedBy;

            return await UpdateAsync(advertisement);
        }

    }
}
