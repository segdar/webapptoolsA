using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Entities;
using webapptoolsA.Server.Models;
using webapptoolsA.Server.Services;


namespace webapptoolsA.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService) 
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] RequestUserLoginDto request)
        {
            
            var token = await _authService.Authentication(request);

        if (token == null)
            return Unauthorized("Invalid credentials");

        return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]User model)
        {

            await _authService.RegisterAsync(model);
            return Ok("User registered successfully!");
        }
    }
}
