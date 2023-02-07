namespace DigitalDisplayBO.API.DTOs
{
    public class PanelLayoutOverview
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int panelsNumber { get; set; }
        public int zonesNumber { get; set; }
    }
}
