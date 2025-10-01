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
        private readonly ICompanyService _companyService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService, ICompanyService companyService, IUserService userService)
        {
            _authService = authService;
            _companyService = companyService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] RequestUserLoginDto request)
        {
            
            var token = await _authService.Authentication(request);

        if (token == null)
            return Unauthorized("Invalid credentials");
            
        
        var access = await _companyService.GetCompaniesByIds(token.Info.Id);
        var permission = await _userService.GetUserAccessAsync(token.Info.Idrole);

            return Ok(new {  token.Token , access, permission });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]User model)
        {

            await _authService.RegisterAsync(model);
            return Ok("User registered successfully!");
        }
    }
}
