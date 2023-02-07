namespace DigitalDisplayBO.API.DTOs
{
    public class DuplicatePanelLayoutZoneInfo
    {
        public int PanelLayoutId { get; set; }
        public short RowStart { get; set; }
        public short RowSpan { get; set; }
        public short ColumnStart { get; set; }
        public short ColumnSpan { get; set; }
    }
}
