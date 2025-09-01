using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Data;
using webapptoolsA.Server.Entities;

namespace webapptoolsA.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WarehouseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WarehouseController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Warehouse>> CreateBodega(RequestWarehouseCreateDto dto)
        {
            int newId;

            if (dto.WarehouseFatherId.HasValue)
            {
                // Generate child ID like ParentID * 1000 + next number
                var children = await _context.Warehouses
                    .Where(b => b.WarehouseFatherId== dto.WarehouseFatherId)
                    .ToListAsync();

                newId = dto.WarehouseFatherId.Value * 1000 + children.Count + 1;
            }
            else
            {
                // Parent warehouse, just max + 1
                var maxId = await _context.Warehouses.Where(b => b.WarehouseFatherId == null).MaxAsync(b => (int?)b.code) ?? 0;
                newId = maxId + 1;
                //dto.WarehouseFatherId = newId;
            }

            var warehouse = new Warehouse
            {
                code = newId,
                Name = dto.Name,
                Description = dto.Description,
                Location    = dto.Location,
                WarehouseFatherId = dto.WarehouseFatherId,
                CompanyId = dto.CompanyId,
                IsActived = dto.IsActived,
                
            };

            _context.Warehouses.Add(warehouse);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBodega), new { code = warehouse.code }, warehouse);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Warehouse>> GetBodega(int id)
        {
            var warehouse = await _context.Warehouses
                .Include(b => b.Children)
                .FirstOrDefaultAsync(b => b.code == id);

            if (warehouse == null) return NotFound();

            return warehouse;
        }

        [HttpGet]
        public async Task<ActionResult<List<Warehouse>>> GetAll()
        {
            return await _context.Warehouses
                .Include(b => b.WarehouseFather)
                .ToListAsync();
        }
    }
}
