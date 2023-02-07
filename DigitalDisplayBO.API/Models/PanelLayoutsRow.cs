using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class PanelLayoutsRow
    {
        public PanelLayoutsRow()
        {
            PanelLayoutsRowColumns = new HashSet<PanelLayoutsRowColumn>();
        }

        public int Id { get; set; }
        public int PanelLayoutId { get; set; }
        public int? RowHeight { get; set; }

        public virtual PanelLayout PanelLayout { get; set; } = null!;
        public virtual ICollection<PanelLayoutsRowColumn> PanelLayoutsRowColumns { get; set; }
    }
}
