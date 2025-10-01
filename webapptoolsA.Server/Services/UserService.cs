using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Data;
using webapptoolsA.Server.Models;

namespace webapptoolsA.Server.Services
{
    public interface IUserService
    {
        Task<List<ResponseModuleAccessDto>> GetUserAccessAsync(int idrole);
    }
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ResponseModuleAccessDto>> GetUserAccessAsync(int idrole)
        {
           var result = await _context.RoleModulePermissionsModels
                .AsNoTracking()
                .Where(rmp => rmp.IdRole == idrole)
                .GroupBy(rmp => rmp.Module.ModuleName)
                .Select(g => new ResponseModuleAccessDto
                 {
                     ModuleName = g.Key,
                     Actions = g.Select(x => x.Permission.PermissionName).ToList() // Collect actions
                 })
                .ToListAsync();

            return result;
        }
    }
}
