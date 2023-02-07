using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class Panel
    {
        public Panel()
        {
            DevicePanels = new HashSet<DevicePanel>();
            PanelZones = new HashSet<PanelZone>();
        }

        public int Id { get; set; }
        public int PanelLayoutId { get; set; }
        public string? Name { get; set; }
        public string? BackgroundColor { get; set; }
        public byte[]? BackgroundImageContent { get; set; }
        public string? BackgroundImageFilename { get; set; }

        public virtual PanelLayout PanelLayout { get; set; } = null!;
        public virtual ICollection<DevicePanel> DevicePanels { get; set; }
        public virtual ICollection<PanelZone> PanelZones { get; set; }
    }
}
