using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class PanelAdvertisement
    {
        public int Id { get; set; }
        public int PanelZoneId { get; set; }
        public int AdvertisementId { get; set; }

        public virtual Advertisement Advertisement { get; set; } = null!;
        public virtual PanelZone PanelZone { get; set; } = null!;
    }
}
