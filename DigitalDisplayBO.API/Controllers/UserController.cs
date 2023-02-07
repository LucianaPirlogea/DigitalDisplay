using DigitalDisplayBO.API.DTOs;
using DigitalDisplayBO.API.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DigitalDisplayBO.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IActionResult> PostUser(UserRegister user)
        {
            try
            {
                await _userService.Register(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> Authenticate(UserLogin user)
        {
            String? token;
            try
            {
                token = await _userService.Authenticate(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }
    }
}
