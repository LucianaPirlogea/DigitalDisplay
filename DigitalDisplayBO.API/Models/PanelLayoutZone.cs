using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class PanelLayoutZone
    {
        public int Id { get; set; }
        public int PanelLayoutId { get; set; }
        public short RowStart { get; set; }
        public short RowSpan { get; set; }
        public short ColumnStart { get; set; }
        public short ColumnSpan { get; set; }

        public virtual PanelLayout PanelLayout { get; set; } = null!;
    }
}
