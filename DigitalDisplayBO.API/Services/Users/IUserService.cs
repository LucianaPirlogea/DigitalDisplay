using DigitalDisplayBO.API.DTOs;

namespace DigitalDisplayBO.API.Services.Users
{
    public interface IUserService
    {
        string GenerateSalt();
        string HashPassword(string password, string salt);
        Task Register(UserRegister user);
        Task<string?> Authenticate(UserLogin? user);
        Task<Guid> GetUserId(string userEmail);
    }
}
