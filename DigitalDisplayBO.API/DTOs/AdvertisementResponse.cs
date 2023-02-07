using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.DTOs
{
    public class AdvertisementResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int CategoryId { get; set; }
        public int AdvertisementTypeId { get; set; }
        public string? GraphicalContentFilename { get; set; }
        public short? ImageFit { get; set; }
        public string? Text { get; set; }
        public string? TextFontFamily { get; set; }
        public int? TextFontSize { get; set; }
        public string? TextFontColor { get; set; }
        public short? TextVerticalAlignment { get; set; }
        public short? TextHorizontalAlignment { get; set; }
        public short? TextScrolling { get; set; }
        public string? TextPadding { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public string? AdvertisementType { get; set; }
        public string? CategoryName { get; set; }
        public bool? Archive { get; set; }
        public string? BirthdayData { get; set; }

        public AdvertisementResponse() { }
        public AdvertisementResponse(Advertisement advertisement)
        {
            this.Id = advertisement.Id;
            this.Name = advertisement.Name;
            this.CategoryId = advertisement.CategoryId;
            this.AdvertisementTypeId = advertisement.AdvertisementTypeId;
            this.GraphicalContentFilename = advertisement.GraphicalContentFilename;
            this.ImageFit = advertisement.ImageFit;
            this.Text = advertisement.Text;
            this.TextFontFamily = advertisement.TextFontFamily;
            this.TextFontSize = advertisement.TextFontSize;
            this.TextFontColor = advertisement.TextFontColor;
            this.TextVerticalAlignment = advertisement.TextVerticalAlignment;
            this.TextHorizontalAlignment = advertisement.TextHorizontalAlignment;
            this.TextScrolling = advertisement.TextScrolling;
            this.TextPadding = advertisement.TextPadding;
            this.CreatedDate = advertisement.CreatedDate;
            this.CreatedBy = advertisement.CreatedBy;
            this.UpdatedDate = advertisement.UpdatedDate;
            this.UpdatedBy = advertisement.UpdatedBy;
            this.Archive = advertisement.Archive;
            this.BirthdayData = advertisement.BirthdayData;
        }
        
    }
}
