using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Data;
using webapptoolsA.Server.Entities;

namespace webapptoolsA.Server.Services
{

    public interface ICompanyService
    {
        Task<List<CompanyModel>> GetAllCompany();
        Task<CompanyModel?> GetCompanyById(int id);
        Task<CompanyModel> CreateCompany(CompanyModel company);

        Task<CompanyModel?> updateCompany(CompanyModel company);

    }

   
    public class CompanyService : ICompanyService
    {
        private readonly AppDbContext _context;
        public CompanyService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CompanyModel> CreateCompany(CompanyModel company)
        {
            _context.CompanyModels.Add(company);
            await _context.SaveChangesAsync();
            return company;
        }

        public async Task<List<CompanyModel>> GetAllCompany()
        {
            try
            {
             var data= await _context.CompanyModels.AsNoTracking().ToListAsync();
                return data;
            }
            catch (Exception ex) { 
                Console.WriteLine(ex.ToString());
                return new List<CompanyModel>();
            }
        }
        

        public async Task<CompanyModel?> GetCompanyById(int id)
        {
            return await _context.CompanyModels.FindAsync(id);

        }

        public async Task<CompanyModel?> updateCompany(CompanyModel company)
        {
            _context.CompanyModels.Attach(company);
            _context.Entry(company).State = EntityState.Modified;

            var affected = await _context.SaveChangesAsync();

            if (affected == 0)
            {
                return null; 
            }

            return company;



        }

    }
}
