using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Data;
using webapptoolsA.Server.Entities;

namespace webapptoolsA.Server.Services
{

    public interface IToolService
    {
        Task<List<Category>> GetAllCategory();
        Task<List<StatusTool>> GetAllStatusTool();
        Task<List<Tools>> GetAllTools();    

    }
    public class ToolService : IToolService
    {

        private readonly AppDbContext _context;
        public ToolService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllCategory()
        {
            return await _context.CategoryModels.
                ToListAsync();
        }

        public async Task<List<StatusTool>> GetAllStatusTool()
        {
            return await _context.StatusToolModels.ToListAsync();
        }

        public async Task<List<Tools>> GetAllTools()
        {
            return await _context.ToolsModels
                .Include(i => i.statustools)
                .Include(i => i.objcategory)
                .ToListAsync();
        }
    }
}
