using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.DTOs
{
    public class DuplicatePanelInfo
    {
        public int Id { get; set; }
        public int PanelLayoutId { get; set; }
        public string? Name { get; set; }
        public string? BackgroundColor { get; set; }
        public byte[]? BackgroundImageContent { get; set; }
        public string? BackgroundImageFilename { get; set; }

        public List<DuplicatePanelZoneInfo>? PanelZones { get; set; }
    }
}
