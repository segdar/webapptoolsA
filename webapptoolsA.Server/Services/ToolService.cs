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
        Task<Category?> GetCategoryById(int id);
        Task<StatusTool?> GetStatusToolById(int id);
        Task<Tools?> GetToolsById(int id);
        Task<Category> CreateCategory(Category category);
        Task<StatusTool> CreateStatusTool(StatusTool statusTool);
        Task<Tools> CreateTools(Tools tools);

    }
    public class ToolService : IToolService
    {

        private readonly AppDbContext _context;
        public ToolService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Category> CreateCategory(Category category)
        {
            _context.CategoryModels.Add(category); 
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<StatusTool> CreateStatusTool(StatusTool statusTool)
        {
            _context.StatusToolModels.Add(statusTool);
            await _context.SaveChangesAsync();  
            return statusTool;
        }

        public async Task<Tools> CreateTools(Tools tools)
        {
            _context.ToolsModels.Add(tools);
            await _context.SaveChangesAsync();
            return tools;
        }

        public async Task<List<Category>> GetAllCategory()
        {
            return await _context.CategoryModels.AsNoTracking().
                ToListAsync();
        }

        public async Task<List<StatusTool>> GetAllStatusTool()
        {
            return await _context.StatusToolModels.AsNoTracking().ToListAsync();
        }

        public async Task<List<Tools>> GetAllTools()
        {
            return await _context.ToolsModels.AsNoTracking()
                .Include(i => i.statustools)
                .Include(i => i.objcategory)
                .ToListAsync();
        }

        public async Task<Category?> GetCategoryById(int id)
        {
           return await _context.CategoryModels.FindAsync(id);
        }

        public async Task<StatusTool?> GetStatusToolById(int id)
        {
            return await _context.StatusToolModels.FindAsync(id);
        }

        public async Task<Tools?> GetToolsById(int id)
        {
            return await _context.ToolsModels.AsNoTracking()
    .Include(t => t.statustools)
    .Include(t => t.objcategory)
    .FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}
