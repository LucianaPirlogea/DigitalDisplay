using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Models;
using DigitalDisplayBO.API.Repositories;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace DigitalDisplayBO.API.Services.Users
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IConfiguration _configuration;
        public UserService(IUserRepository userRepository, IRoleRepository roleRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _configuration = configuration;
        }
        public async Task Register(UserRegister user)
        {
            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                throw new Exception("Must enter an email and password");
            }

            if (string.IsNullOrEmpty(user.FirstName))
            {
                throw new Exception("First name field is required");
            }

            if (string.IsNullOrEmpty(user.LastName))
            {
                throw new Exception("Last name field is required");
            }

            if (!user.Email.Contains("@"))
            {
                throw new Exception("Invalid email format");
            }

            if (user.Password.Length < 10)
            {
                throw new Exception("Password must be 10 characters or longer");
            }

            var userInDb = await _userRepository.GetUserByEmail(user.Email);

            if (userInDb != null)
            {
                throw new Exception("User with this email already exists");
            }

            Guid guid = Guid.NewGuid();
            string salt = GenerateSalt();
            string hashedPassword = HashPassword(user.Password, salt);
            var allRoles = await _roleRepository.GetAllAsync();
            var role = allRoles.Where(a => a.Id == 2).FirstOrDefault() ?? new Role();

            User newUser = new User
            {
                Id = guid,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = hashedPassword,
                Salt = salt,
                IdRole = 2,
                IdRoleNavigation = role,
                IsDeleted = false
            };

            await _userRepository.AddAsync(newUser);
        }

        public string HashPassword(string password, string salt)
        {
            byte[] saltByte = Convert.FromBase64String(salt);

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: saltByte,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 32));

            return hashed;
        }

        public string GenerateSalt()
        {
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return Convert.ToBase64String(salt);
        }

        public async Task<string?> Authenticate(UserLogin user)
        {
            if (user == null || user.Email == null || user.Password == null
                || user.Email == "" || user.Password == "")
            {
                throw new Exception("Must enter a email and password");
            }

            var userInDb = await _userRepository.GetUserByEmail(user.Email);
            if (userInDb == null)
            {
                throw new Exception("User doesn't exist");
            }

            string salt = userInDb.Salt;
            string hashedPassword;
            if (salt != null)
            {
                hashedPassword = HashPassword(user.Password, salt);
            }
            else return null;

            userInDb = await _userRepository.GetUserByEmailAndHashedPassword(user.Email, hashedPassword);

            if (userInDb == null)
            {
                throw new Exception("Incorrect password");
            }

            var allRoles = await _roleRepository.GetAllAsync();
            Role role = allRoles.Where(a => a.Id == userInDb.IdRole).FirstOrDefault() ?? new Role();

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(_configuration["JWT:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, userInDb.Email),
                    new Claim(ClaimTypes.Role, role.Name.ToString()) //Returns the name field of the entry in the db
                }),
                Expires = DateTime.UtcNow.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"]
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token).ToString();
        }

        public async Task<Guid> GetUserId(string userEmail)
        {
            return (await _userRepository.GetUserByEmail(userEmail)).Id;
        }

    }
}
