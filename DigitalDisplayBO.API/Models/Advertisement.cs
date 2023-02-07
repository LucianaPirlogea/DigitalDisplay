using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class Advertisement
    {
        public Advertisement()
        {
            PanelAdvertisements = new HashSet<PanelAdvertisement>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int CategoryId { get; set; }
        public int AdvertisementTypeId { get; set; }
        public byte[]? GraphicalContent { get; set; }
        public string? GraphicalContentFilename { get; set; }
        public short? ImageFit { get; set; }
        public string? Text { get; set; }
        public string? TextFontFamily { get; set; }
        public int? TextFontSize { get; set; }
        public string? TextFontColor { get; set; }
        public short? TextVerticalAlignment { get; set; }
        public short? TextHorizontalAlignment { get; set; }
        public string? TextPadding { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public short? TextScrolling { get; set; }
        public bool? Archive { get; set; }
        public string? BirthdayData { get; set; }

        public virtual AdvertisementType AdvertisementType { get; set; } = null!;
        public virtual Category Category { get; set; } = null!;
        public virtual ICollection<PanelAdvertisement> PanelAdvertisements { get; set; }
    }
}
