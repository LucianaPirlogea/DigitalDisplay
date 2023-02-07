using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class PanelLayout
    {
        public PanelLayout()
        {
            PanelLayoutZones = new HashSet<PanelLayoutZone>();
            Panels = new HashSet<Panel>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Rows { get; set; } = null!;
        public string Columns { get; set; } = null!;
        public short RowGap { get; set; }
        public short ColumnGap { get; set; }

        public virtual ICollection<PanelLayoutZone> PanelLayoutZones { get; set; }
        public virtual ICollection<Panel> Panels { get; set; }
    }
}
