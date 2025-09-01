using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Data;
using webapptoolsA.Server.Entities;

namespace webapptoolsA.Server.Services
{
   
    public interface ICompanyService
    {
        Task<List<CompanyModel>>  GetAllCompany();

    }

   
    public class CompanyService : ICompanyService
    {
        private readonly AppDbContext _context;
        public CompanyService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<CompanyModel>> GetAllCompany()
        {
            try
            {
             var data= await _context.CompanyModels.ToListAsync();
                return data;
            }
            catch (Exception ex) { 
                Console.WriteLine(ex.ToString());
                return new List<CompanyModel>();
            }
        }

       
    }
}
