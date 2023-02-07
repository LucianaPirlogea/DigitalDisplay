using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class Device
    {
        public Device()
        {
            DevicePanels = new HashSet<DevicePanel>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? Location { get; set; }
        public string? DeviceUniqueId { get; set; }
        public string? RegisteredByUser { get; set; }
        public DateTime? LatestRefresh { get; set; }

        public virtual ICollection<DevicePanel> DevicePanels { get; set; }
    }
}
