using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class AdvertisementType
    {
        public AdvertisementType()
        {
            Advertisements = new HashSet<Advertisement>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Advertisement> Advertisements { get; set; }
    }
}
