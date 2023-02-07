using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class PanelZone
    {
        public PanelZone()
        {
            PanelAdvertisements = new HashSet<PanelAdvertisement>();
        }

        public int Id { get; set; }
        public int PanelId { get; set; }
        public int ZoneNumber { get; set; }
        public string? BackgroundColor { get; set; }
        public byte[]? BackgroundImageContent { get; set; }
        public string? BackgroundImageFilename { get; set; }
        public short? Effect { get; set; }
        public short? ZoneType { get; set; }
        public string? ZoneSettings { get; set; }

        public virtual Panel Panel { get; set; } = null!;
        public virtual ICollection<PanelAdvertisement> PanelAdvertisements { get; set; }
    }
}
