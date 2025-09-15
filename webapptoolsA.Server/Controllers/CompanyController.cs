using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Entities;
using webapptoolsA.Server.Models;
using webapptoolsA.Server.Services;

namespace webapptoolsA.Server.Controllers
{
    
    [Route("[controller]")] // safer
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;
        private readonly ILogger<CompanyController> _logger;

        public CompanyController(ILogger<CompanyController> logger, ICompanyService companyService)
        {
            _logger = logger;
            _companyService = companyService;
        }

        [HttpGet(Name ="GetCompany")] // GET api/company
        public async Task<List<CompanyModel>> Get()
        {
            var companies = await _companyService.GetAllCompany();
            return companies;
        }

        [HttpPost]
        public async Task<ActionResult<CompanyModel>> CreateCompany([FromBody] CompanyModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); 
            }

            try
            {
                var newCompany = await _companyService.CreateCompany(model);

                return CreatedAtAction(
                    nameof(GetCompany),
                    new { id = newCompany.Id },  // route values
                    newCompany                   // body of response
                );
            }
            catch (DbUpdateException ex) 
            {
                return Conflict(new { message = "Error creating company.", detail = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Unexpected error.", detail = ex.Message });
            }

           
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(int id, [FromBody] CompanyModel model)
        {
            if (id != model.Id) return BadRequest("ID mismatch");

            var updated = await _companyService.updateCompany(model);
            if (updated == null) return NotFound();

            return Ok(updated);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyModel>> GetCompany(int id)
        {
            var company = await _companyService.GetCompanyById(id);

            if (company == null) return NotFound();

            return company;
        }
    }
}
