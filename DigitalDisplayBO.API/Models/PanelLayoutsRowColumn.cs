using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class PanelLayoutsRowColumn
    {
        public PanelLayoutsRowColumn()
        {
            PanelLayoutsRowColumnRows = new HashSet<PanelLayoutsRowColumnRow>();
        }

        public int Id { get; set; }
        public int PanelLayoutsRowsId { get; set; }
        public int? ColumnWidth { get; set; }

        public virtual PanelLayoutsRow PanelLayoutsRows { get; set; } = null!;
        public virtual ICollection<PanelLayoutsRowColumnRow> PanelLayoutsRowColumnRows { get; set; }
    }
}
