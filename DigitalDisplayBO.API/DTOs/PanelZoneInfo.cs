namespace DigitalDisplayBO.API.DTOs
{
    public class PanelZoneInfo
    {
        public int ZoneNumber { get; set; }
        public short ZoneType { get; set; }
        public List<int> AdvertisementIds { get; set; }
    }
}
