using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class PanelLayoutsRowColumnRow
    {
        public int Id { get; set; }
        public int PanelLayoutsRowColumnId { get; set; }
        public int? RowHeight { get; set; }

        public virtual PanelLayoutsRowColumn PanelLayoutsRowColumn { get; set; } = null!;
    }
}
