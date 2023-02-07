namespace DigitalDisplayBO.API.DTOs
{
    public class DeviceInfo
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        public string? Description { get; set; }
        public string? Location { get; set; }
        public string? DeviceUniqueId { get; set; }
        public string? RegisteredByUser { get; set; }
        public DateTime? LatestRefresh { get; set; }
        public int? ActivePanelId { get; set; }
        public string? ActivePanelName { get; set; }
        public DateTime? StartDateTime { get; set; }

    }
}
