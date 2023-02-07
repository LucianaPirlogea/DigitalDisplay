namespace DigitalDisplayBO.API.DTOs
{
    public class PanelDeviceRequest
    {
        public int DeviceId { get; set; }
        public int PanelId { get; set; }
        public DateTime StartDateTime { get; set; }
    }
}
