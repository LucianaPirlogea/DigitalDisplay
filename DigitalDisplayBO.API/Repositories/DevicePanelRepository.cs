using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace DigitalDisplayBO.API.Repositories
{
    public class DevicePanelRepository : GenericRepository<DevicePanel>, IDevicePanelRepository
    {
        protected new DigitalDisplayDBContext
            _context;

        public DevicePanelRepository(DigitalDisplayDBContext context) : base(context)
        {
        }
    }
}
