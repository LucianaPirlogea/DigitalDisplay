using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.DTOs
{
    public class DuplicatePanelZoneInfo
    {
        public int Id { get; set; }
        public int PanelId { get; set; }
        public int ZoneNumber { get; set; }
        public string? BackgroundColor { get; set; }
        public byte[]? BackgroundImageContent { get; set; }
        public string? BackgroundImageFilename { get; set; }
        public short? Effect { get; set; }
        public short? ZoneType { get; set; }
        public string? ZoneSettings { get; set; }

        public List<DuplicatePanelAdvertisementInfo> PanelAdvertisements { get; set; }
    }
}
