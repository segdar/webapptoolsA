using Microsoft.EntityFrameworkCore;
using System.Linq;
using webapptoolsA.Server.Data;
using webapptoolsA.Server.Entities;
using webapptoolsA.Server.Models;

namespace webapptoolsA.Server.Services
{

    public interface ICompanyService
    {
        Task<List<CompanyModel>> GetAllCompany();
        Task<CompanyModel?> GetCompanyById(int id);
        Task<CompanyModel> CreateCompany(CompanyModel company);
        Task<List<ResponseCompanyDto>> GetCompaniesByIds(int iduser);

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

        public async Task<List<ResponseCompanyDto>> GetCompaniesByIds(int iduser)
        {

            var tmpIds = await _context.UserAccessCompaniesModels
       .AsNoTracking()
       .Where(uc => uc.IdUser == iduser)
       .Select(uc => uc.IdCompany)
       .ToListAsync();

            if (!tmpIds.Any())
                return new List<ResponseCompanyDto>();

            // Fetch companies with their warehouses in a single query
            var data = await _context.CompanyModels
                .AsNoTracking()
                .Where(c => tmpIds.Contains(c.Id ?? -1))
                .Select(c => new ResponseCompanyDto
                {
                    Id = c.Id ?? -1,
                    Name = c.Name,
                    Warehouses = c.Warehouses
                        .Where(w => w.IsActived)
                        .Select(w => new WarehouseBase
                        {
                            Id = w.Id,
                            Name = w.Name,
                            code = w.code,
                            Description = w.Description,
                            Location = w.Location,

                           
                        })
                        .ToList()
                })
                .ToListAsync();

            return data;
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
