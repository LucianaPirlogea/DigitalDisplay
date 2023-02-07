namespace DigitalDisplayBO.API.DTOs
{
    public class PanelInfoDevice
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public DateTime? StartDateTime { get; set; }
        public int? DeviceId { get; internal set; }
    }
}
