using Azure.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using webapptoolsA.Server.Data;
using webapptoolsA.Server.Entities;
using webapptoolsA.Server.Models;

namespace webapptoolsA.Server.Services
{

    public interface  IAuthService
    {
        Task<string?> Authentication(RequestUser user); 
    }
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;
        public  AuthService(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context; 
        }

        public async Task<string?> Authentication(RequestUser user)
        {
            var tmpuser = await _context.UserModels.FirstOrDefaultAsync(i => i.Username == user.Username);

            if (tmpuser == null)
                return null;

            // Compare password (in real life: hash check with BCrypt)
            if (tmpuser.Password != user.Password)
                return null;

            // Generate token with claims (role, id, etc.)
            var token = GenerateJwtToken(tmpuser);
            tmpuser = null;
            return token;
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _config.GetSection("JwtSettings");

            var claims = new[]
            {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString()) // Example role
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(double.Parse(jwtSettings["ExpiryMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
           
        }
    }
}
