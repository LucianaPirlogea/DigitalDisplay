using System;
using System.Collections.Generic;

namespace DigitalDisplayBO.API.Models
{
    public partial class Category
    {
        public Category()
        {
            Advertisements = new HashSet<Advertisement>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        public virtual ICollection<Advertisement> Advertisements { get; set; }
    }
}
