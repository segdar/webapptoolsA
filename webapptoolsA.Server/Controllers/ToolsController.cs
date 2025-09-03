using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Entities;
using webapptoolsA.Server.Models;
using webapptoolsA.Server.Services;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace webapptoolsA.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ToolsController : ControllerBase
    {
        private readonly IToolService _toolService;

        public ToolsController(IToolService toolService)
        {
            _toolService = toolService;
        }
        [HttpGet("category")]
        public async Task<ActionResult<List<Category>>> GetAll()
        {
           return  await _toolService.GetAllCategory();
           
        }

        [HttpPost("category")]
        public async Task<ActionResult<Category>> CreateCategory([FromBody] Category model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newCategory = await _toolService.CreateCategory(model);

                return CreatedAtAction(
                    nameof(GetCategory),
                    new { id = newCategory.Id },  // route values
                    newCategory                   // body of response
                );
            }
            catch (DbUpdateException ex)
            {
                return Conflict(new { message = "Error creating category.", detail = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Unexpected error.", detail = ex.Message });
            }


        }

        [HttpGet("category/{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _toolService.GetCategoryById(id);

            if (category == null) return NotFound();

            return category;
        }

        [HttpGet("status")]
        public async Task<ActionResult<List<StatusTool>>> GetAllStatus()
        {
            return await _toolService.GetAllStatusTool();
        }

        [HttpPost("status")]
        public async Task<ActionResult<StatusTool>> CreateStatus([FromBody] StatusTool model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newStatus = await _toolService.CreateStatusTool(model);

                return CreatedAtAction(
                    nameof(GetStatusTool),
                    new { id = newStatus.Id },  // route values
                    newStatus                  // body of response
                );
            }
            catch (DbUpdateException ex)
            {
                return Conflict(new { message = "Error creating Status Tools.", detail = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Unexpected error.", detail = ex.Message });
            }


        }

        [HttpGet("status/{id}")]
        public async Task<ActionResult<StatusTool>> GetStatusTool(int id)
        {
            var statustool = await _toolService.GetStatusToolById(id);

            if (statustool == null) return NotFound();

            return statustool;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tools>>> GetAllTools()
        {
            return await _toolService.GetAllTools();
        }


        [HttpPost]
        public async Task<ActionResult<Tools>> CreateStatus([FromBody] Tools model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newTool = await _toolService.CreateTools(model);
                var relation = await _toolService.GetToolsById(newTool.Id ?? -1);
                return CreatedAtAction(
                    nameof(GetTool),
                    new { id = newTool.Id },  // route values
                    relation                // body of response
                );
            }
            catch (DbUpdateException ex)
            {
                return Conflict(new { message = "Error creating Tools.", detail = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Unexpected error.", detail = ex.Message });
            }


        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Tools>> GetTool(int id)
        {
            var tool = await _toolService.GetToolsById(id);

            if (tool == null) return NotFound();

            return tool;
        }



    }
}
