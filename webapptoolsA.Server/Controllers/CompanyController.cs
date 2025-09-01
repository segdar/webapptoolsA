using Microsoft.AspNetCore.Mvc;
using webapptoolsA.Server.Entities;
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
    }
}
