namespace DigitalDisplayBO.API.DTOs
{
    public class PanelCreateInfo
    {
        public int PanelLayoutId { get; set; }
        public string? Name { get; set; }
        public string? BackgroundColor { get; set; }
        //public byte[]? BackgroundImageContent { get; set; }
        public string? BackgroundImageFilename { get; set; }

        public List<PanelZoneInfo> Zones { get; set; }

    }
}
