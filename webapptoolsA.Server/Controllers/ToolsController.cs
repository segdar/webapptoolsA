using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapptoolsA.Server.Entities;
using webapptoolsA.Server.Models;
using webapptoolsA.Server.Services;

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

        [HttpGet("status")]
        public async Task<ActionResult<List<StatusTool>>> GetAllStatus()
        {
            return await _toolService.GetAllStatusTool();
        }

        [HttpGet]
        public async Task<ActionResult<List<Tools>>> GetAllTools()
        {
            return await _toolService.GetAllTools();
        }

    }
}
