using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace DigitalDisplayBO.API.Repositories
{
    public class DeviceRepository : GenericRepository<Device>, IDeviceRepository
    {
        protected new DigitalDisplayDBContext _context;
        private readonly ILogger<DeviceRepository> _logger;

        public DeviceRepository(DigitalDisplayDBContext context, ILogger<DeviceRepository> logger) : base(context)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<DeviceInfo>> GetDevicesInfoAsync()
        {

            var devicesInfo = new List<DeviceInfo>();

            var devices = await _context.Devices.ToListAsync();

            foreach (var device in devices)
            {
                var devicePanels = await _context.DevicePanels
                .Include(dp => dp.Panel)
                .Include(dp => dp.Device)
                .Where(dp => dp.DeviceId == device.Id)
                .ToListAsync();

                var devicePanelActive = devicePanels.OrderByDescending(o => o.StartDateTime).Take(1).FirstOrDefault();

                var deviceInfo = new DeviceInfo
                {
                    Name = device.Name,
                    Id = device.Id,
                    Description = device.Description,
                    Location = device.Location,
                    DeviceUniqueId = device.DeviceUniqueId,
                    RegisteredByUser = device.RegisteredByUser,
                    LatestRefresh = device.LatestRefresh,
                };

                if (devicePanelActive == null)
                {
                    deviceInfo.ActivePanelId = null;
                    deviceInfo.ActivePanelName = null;
                    deviceInfo.StartDateTime = null;

                    devicesInfo.Add(deviceInfo);
                } else
                {
                    deviceInfo.ActivePanelId = devicePanelActive.Panel.Id;
                    deviceInfo.ActivePanelName = devicePanelActive.Panel.Name;
                    deviceInfo.StartDateTime = devicePanelActive.StartDateTime;

                    devicesInfo.Add(deviceInfo);
                }

            }

            return devicesInfo;


        }
    }
}
