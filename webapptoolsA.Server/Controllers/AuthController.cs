using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Login([FromBody] RequestUser request)
        {
            // Hardcoded user for demo
            var token = await _authService.Authentication(request);

        if (token == null)
            return Unauthorized("Invalid credentials");

        return Ok(new { Token = token });
        }
    }
}
