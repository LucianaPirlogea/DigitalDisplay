using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace DigitalDisplayBO.API.Repositories
{
    public class DevicePanelRepository : GenericRepository<DevicePanel>, IDevicePanelRepository
    {
        protected new NetRomInternship2022OlandaDevContext _context;

        public DevicePanelRepository(NetRomInternship2022OlandaDevContext context) : base(context)
        {
        }
    }
}
