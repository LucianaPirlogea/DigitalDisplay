namespace DigitalDisplayBO.API.DTOs
{
    public class PanelInfo
    {
        public int Id { get; set; }
        public int PanelLayoutId { get; set; }
        public string PanelLayoutName { get; set; }
        public string? Name { get; set; }
        public string? BackgroundColor { get; set; }
        public byte[]? BackgroundImageContent { get; set; }
        public string? BackgroundImageFilename { get; set; }

        public int ZoneCount { get; set; }

        public List<PanelInfoDevice>? Devices { get; set; }
    }
}
