using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;

namespace DigitalDisplayBO.API.Repositories
{
    public interface IDeviceRepository : IGenericRepository<Device>
    {
        Task<IEnumerable<DeviceInfo>> GetDevicesInfoAsync();
    }
}
