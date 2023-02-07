using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class DevicePanel
    {
        public int Id { get; set; }
        public int DeviceId { get; set; }
        public int PanelId { get; set; }
        public DateTime StartDateTime { get; set; }
        public string? PanelSetByUser { get; set; }

        public virtual Device Device { get; set; } = null!;
        public virtual Panel Panel { get; set; } = null!;
    }
}
