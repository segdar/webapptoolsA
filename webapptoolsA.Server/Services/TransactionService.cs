using Humanizer;
using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Data;
using webapptoolsA.Server.Entities;
using webapptoolsA.Server.Models;

namespace webapptoolsA.Server.Services
{
    public interface ITransactionService
    {
        Task<List<ResponseTransactionHeader>> GetAllAsync();
        Task<ResponseTransactionHeader?> GetByIdAsync(int id);
        Task<ResponseTransactionHeader> CreateAsync(TransactionHeader transaction);
        Task<ResponseTransactionHeader?> UpdateAsync(TransactionHeader transaction);
        Task<bool> DeleteAsync(int id);

        Task<ResponseProjectDto> CreateAsyncProject(RequestProjectDto project);
        Task<ResponseProjectDto?> GetByIdAsyncProject(int id);
        Task<List<ResponseProjectDto>> GetAllAsyncProject();
        Task<ResponseProjectDto?> UpdateAsyncProject(RequestProjectDto updatedProject);

        Task<ResponseTypeTransactionDto> CreateAsyncType(RequestTypeTransactionDto typeTransaction);
        Task<ResponseTypeTransactionDto?> GetByIdAsyncType(int id);
        Task<List<ResponseTypeTransactionDto>> GetAllAsyncType();
        Task<ResponseTypeTransactionDto?> UpdateAsyncType(RequestTypeTransactionDto updatedTypeTransaction);
        Task<bool> DeleteAsyncType(int id);
    }
    public class TransactionService :ITransactionService
    {
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ResponseTransactionHeader>> GetAllAsync()
        {
            return await _context.TransactionHeaderModels
                .Select(t => new ResponseTransactionHeader
                {
                    Id = t.Id,
                    UserId = t.UserId,
                    UsernameRegister = t.User!.Username,
                    Days = t.Days,
                    IdType = t.IdType,
                    nameTypeTransaction = t.Type!.Name,
                    Notes = t.Notes,
                    UserRecipt = t.UserRecipt,
                    UsernameRecipt = t.UserReciptNavigation!.Username,
                    IdProject = t.IdProject,
                    NameProject = t.Project!.Name,
                    IdWarehouseOrigin = t.IdWarehouseOrigin,
                    WarehouseOrigin = t.WarehouseOrigin!.Name,
                    IdWarehouseDestination = t.IdWarehouseDestination,
                    WarehouseDestination = t.WarehouseDestination!.Name,
                    CreatedAt = t.CreatedAt,
                    Status = t.Status
                })
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<ResponseTransactionHeader?> GetByIdAsync(int id)
        {
            return await _context.TransactionHeaderModels
                 .Where(t => t.Id == id)
                 .Select(t => new ResponseTransactionHeader
                 {
                     Id = t.Id,
                     UserId = t.UserId,
                     UsernameRegister = t.User!.Username,
                     Days = t.Days,
                     IdType = t.IdType,
                     nameTypeTransaction = t.Type!.Name,
                     Notes = t.Notes,
                     UserRecipt = t.UserRecipt,
                     UsernameRecipt = t.UserReciptNavigation!.Username,
                     IdProject = t.IdProject,
                     NameProject = t.Project!.Name,
                     IdWarehouseOrigin = t.IdWarehouseOrigin,
                     WarehouseOrigin = t.WarehouseOrigin!.Name,
                     IdWarehouseDestination = t.IdWarehouseDestination,
                     WarehouseDestination = t.WarehouseDestination!.Name,
                     CreatedAt = t.CreatedAt,
                     Status = t.Status
                 })
                .AsNoTracking()                
                .FirstOrDefaultAsync();
        }

        public async Task<ResponseTransactionHeader> CreateAsync(TransactionHeader transaction)
        {
            _context.TransactionHeaderModels.Add(transaction);
            await _context.SaveChangesAsync();
            var transactionTmp = await _context.TransactionHeaderModels
                .Where(t => t.Id == transaction.Id)
                .Select(t => new ResponseTransactionHeader
                {
                    Id = t.Id,
                    UserId = t.UserId,
                    UsernameRegister = t.User!.Username,
                    Days = t.Days,
                    IdType = t.IdType,
                    nameTypeTransaction = t.Type!.Name,
                    Notes = t.Notes,
                    UserRecipt = t.UserRecipt,
                    UsernameRecipt = t.UserReciptNavigation!.Username,
                    IdProject = t.IdProject,
                    NameProject = t.Project!.Name,
                    IdWarehouseOrigin = t.IdWarehouseOrigin,
                    WarehouseOrigin = t.WarehouseOrigin!.Name,
                    IdWarehouseDestination = t.IdWarehouseDestination,
                    WarehouseDestination = t.WarehouseDestination!.Name,
                    CreatedAt = t.CreatedAt,
                    Status = t.Status
                }).FirstOrDefaultAsync();

            return transactionTmp!;
        }

        public async Task<ResponseTransactionHeader?> UpdateAsync(TransactionHeader transaction)
        {
            _context.TransactionHeaderModels.Attach(transaction);
            _context.Entry(transaction).State = EntityState.Modified;

           var effect =  await _context.SaveChangesAsync();
            if (effect == 0) return null;

            return  await _context.TransactionHeaderModels
                .Where(t => t.Id == transaction.Id)
                .Select(t => new ResponseTransactionHeader
                {
                    Id = t.Id,
                    UserId = t.UserId,
                    UsernameRegister = t.User!.Username,
                    Days = t.Days,
                    IdType = t.IdType,
                    nameTypeTransaction = t.Type!.Name,
                    Notes = t.Notes,
                    UserRecipt = t.UserRecipt,
                    UsernameRecipt = t.UserReciptNavigation!.Username,
                    IdProject = t.IdProject,
                    NameProject = t.Project!.Name,
                    IdWarehouseOrigin = t.IdWarehouseOrigin,
                    WarehouseOrigin = t.WarehouseOrigin!.Name,
                    IdWarehouseDestination = t.IdWarehouseDestination,
                    WarehouseDestination = t.WarehouseDestination!.Name,
                    CreatedAt = t.CreatedAt,
                    Status = t.Status
                }).FirstOrDefaultAsync();
           
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.TransactionHeaderModels.FindAsync(id);
            if (entity == null) return false;

            _context.TransactionHeaderModels.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ResponseProjectDto> CreateAsyncProject(RequestProjectDto project)
        {

            var entity = new Project
            {
                Name = project.Name,
                Description = project.Description,
                Location = project.Location,
                UserId = project.UserId
            };

            _context.ProjectModels.Add(entity);
            await _context.SaveChangesAsync();

            var username = await _context.UserModels
                .Where(u => u.Id == entity.UserId)
                .Select(u => u.Username)
                .FirstOrDefaultAsync();

            // Map entity → response DTO
            return new ResponseProjectDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Location = entity.Location,
                UserId = entity.UserId,
                CreatedAt = entity.CreatedAt,
                Username = username ?? ""
            };
        }

        public async Task<ResponseProjectDto?> GetByIdAsyncProject(int id)
        {
            return await _context.ProjectModels
            .Where(p => p.Id == id)
            .Select(p => new ResponseProjectDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Location = p.Location,
                CreatedAt = p.CreatedAt,
                UserId = p.UserId,
                Username = p.User.Username
            })
            .AsNoTracking()
            .FirstOrDefaultAsync();
        }

        public async Task<List<ResponseProjectDto>> GetAllAsyncProject()
        {
            return await _context.ProjectModels
            .Select(p => new ResponseProjectDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Location = p.Location,
                CreatedAt = p.CreatedAt,
                UserId = p.UserId,
                Username = p.User.Username
            })
            .AsNoTracking()
             .ToListAsync();
        }

        public async Task<ResponseProjectDto?> UpdateAsyncProject(RequestProjectDto updatedProject)
        {
            var existing = await _context.ProjectModels.Include(p => p.User) 
                                        .FirstOrDefaultAsync(p => p.Id == updatedProject.Id);
            if (existing == null) return null;

            _context.Entry(existing).CurrentValues.SetValues(updatedProject);
            await _context.SaveChangesAsync();

            return new ResponseProjectDto
            {
                Id = existing.Id,
                Name = existing.Name,
                Description = existing.Description,
                Location = existing.Location,
                UserId = existing.UserId,
                CreatedAt = existing.CreatedAt,
                Username = existing.User.Username
            };

        }

        public async Task<ResponseTypeTransactionDto> CreateAsyncType(RequestTypeTransactionDto typeTransaction)
        {
            var entity = new TypeTransaction
            {
                Code = typeTransaction.Code,
                Name = typeTransaction.Name,
                Type = typeTransaction.Type,
                IsActived = typeTransaction.IsActived
            };

            _context.TypeTransactionModels.Add(entity);
            await _context.SaveChangesAsync();

            var response = new ResponseTypeTransactionDto
            {
                Id = entity.Id,
                Code = entity.Code,
                Name = entity.Name,
                Type = entity.Type,
                IsActived = entity.IsActived
                
            };

            return response;
        }

        public async Task<ResponseTypeTransactionDto?> GetByIdAsyncType(int id)
        {
            return await _context.TypeTransactionModels
                 .Where(p => p.Id == id)
                 .Select(p => new ResponseTypeTransactionDto
                 {
                     Id = p.Id,
                     Code = p.Code,
                     Name = p.Name,
                     Type = p.Type,
                     IsActived = p.IsActived
                     

                 }).AsNoTracking()
            .FirstOrDefaultAsync();
        }

        public async Task<List<ResponseTypeTransactionDto>> GetAllAsyncType()
        {
            return await _context.TypeTransactionModels
                .Select(p => new ResponseTypeTransactionDto
                {
                    Id = p.Id,  
                    Code = p.Code,
                    Name = p.Name,
                    Type = p.Type,
                    IsActived = p.IsActived
                })
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<ResponseTypeTransactionDto?> UpdateAsyncType(RequestTypeTransactionDto updatedTypeTransaction)
        {
            var existing = await _context.TypeTransactionModels.FindAsync(updatedTypeTransaction.Id);
            if (existing == null) return null;

            _context.Entry(existing).CurrentValues.SetValues(updatedTypeTransaction);
            await _context.SaveChangesAsync();
            return new ResponseTypeTransactionDto
            {
                Id = existing.Id,
                Code = existing.Code,
                Name = existing.Name,
                Type = existing.Type,
                IsActived = existing.IsActived

            };
        }

        public async Task<bool> DeleteAsyncType(int id)
        {
            var entity = await _context.TypeTransactionModels.FindAsync(id);
            if (entity == null) return false;

            _context.TypeTransactionModels.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
