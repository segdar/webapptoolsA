using Azure.Core;
using Microsoft.AspNetCore.Identity;
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
        Task<string?> Authentication(RequestUserLoginDto user);
        Task RegisterAsync(User model);
    }
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher = new();
        public  AuthService(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context; 
        }

        public async Task<string?> Authentication(RequestUserLoginDto user)
        {
            var tmpuser = await _context.UserModels.AsNoTracking().FirstOrDefaultAsync(i => i.Username == user.Username);
           
            if (tmpuser == null)
                return null;

            var result = _passwordHasher.VerifyHashedPassword(tmpuser, tmpuser.Password, user.Password);
            // Compare password (in real life: hash check with BCrypt)
            if (PasswordVerificationResult.Success != result)
                return null;

            // Generate token with claims (role, id, etc.)
            var token = GenerateJwtToken(tmpuser);
            tmpuser = null;
            return token;
        }

        public async Task RegisterAsync(User model)
        {
           
            model.Password = _passwordHasher.HashPassword(model, model.Password);

            _context.UserModels.Add(model);
            await _context.SaveChangesAsync();
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
