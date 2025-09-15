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
        public async Task<ActionResult<Warehouse>> CreateBodega(RequestWarehouseDto dto)
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

            return CreatedAtAction(nameof(GetBodega), new { id = warehouse.code }, warehouse);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Warehouse>> GetBodega(int id)
        {
            var warehouse = await _context.Warehouses
                .FirstOrDefaultAsync(b => b.code == id);

            if (warehouse == null) return NotFound();

            return warehouse;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWarehouse(int id ,[FromBody] RequestWarehouseDto model)
        {
            if (id != model.Id) return BadRequest("ID mismatch");
            var warehouse = new Warehouse
            {
                code = model.code,
                Name =model.Name,
                Description = model.Description,
                Location    = model.Location,
                WarehouseFatherId = model.WarehouseFatherId,
                CompanyId = model.CompanyId,
                IsActived = model.IsActived,
                Id = model.Id
            };
            _context.Warehouses.Attach(warehouse);
            _context.Entry(warehouse).State = EntityState.Modified;
            var effected = await _context.SaveChangesAsync();
            if (effected == 0) return NotFound();
            return Ok(effected);
        }

        [HttpGet]
        public async Task<ActionResult<List<ResponseWarehouseDto>>> GetAll()
        {
            return await _context.Warehouses
                 .Include(w => w.WarehouseFather) // Include only the direct parent
        .Select(w => new ResponseWarehouseDto
        {
            Id = w.Id,
            code = w.code,
            Name = w.Name,
            Description = w.Description,
            Location = w.Location,
            IsActived = w.IsActived,
            CompanyId = w.CompanyId,
            WarehouseFatherId = w.WarehouseFatherId,
            NameWarehouseFather = w.WarehouseFather!.Name
        })
         .AsNoTracking()
        .ToListAsync();

        }
    }
}
