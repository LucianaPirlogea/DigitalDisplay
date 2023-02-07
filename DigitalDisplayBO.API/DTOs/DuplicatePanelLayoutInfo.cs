using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.DTOs
{
    public class DuplicatePanelLayoutInfo
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Rows { get; set; } = null!;
        public string Columns { get; set; } = null!;
        public short RowGap { get; set; }
        public short ColumnGap { get; set; }

        public virtual List<DuplicatePanelLayoutZoneInfo> PanelLayoutZones { get; set; }

    }
}
