using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Data;
using webapptoolsA.Server.Entities;

namespace webapptoolsA.Server.Services
{
    public interface ITransactionService
    {
        Task<List<TransactionHeader>> GetAllAsync();
        Task<TransactionHeader?> GetByIdAsync(int id);
        Task<TransactionHeader> CreateAsync(TransactionHeader transaction);
        Task<TransactionHeader?> UpdateAsync(TransactionHeader transaction);
        Task<bool> DeleteAsync(int id);

        Task<Project> CreateAsyncProject(Project project);
        Task<Project?> GetByIdAsyncProject(int id);
        Task<List<Project>> GetAllAsyncProject();
        Task<Project?> UpdateAsyncProject( Project updatedProject);

        Task<TypeTransaction> CreateAsyncType(TypeTransaction typeTransaction);
        Task<TypeTransaction?> GetByIdAsyncType(int id);
        Task<List<TypeTransaction>> GetAllAsyncType();
        Task<TypeTransaction?> UpdateAsyncType(TypeTransaction updatedTypeTransaction);

    }
    public class TransactionService :ITransactionService
    {
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TransactionHeader>> GetAllAsync()
        {
            return await _context.TransactionHeaderModels.AsNoTracking()
                .Include(t => t.User)
                .Include(t => t.UserReciptNavigation)
                .Include(t => t.Project)
                .Include(t => t.WarehouseOrigin)
                .Include(t => t.WarehouseDestination)
                .Include(t => t.Type)
                .Include(t => t.Details)
                .ToListAsync();
        }

        public async Task<TransactionHeader?> GetByIdAsync(int id)
        {
            return await _context.TransactionHeaderModels.AsNoTracking()
                .Include(t => t.User)
                .Include(t => t.UserReciptNavigation)
                .Include(t => t.Project)
                .Include(t => t.WarehouseOrigin)
                .Include(t => t.WarehouseDestination)
                .Include(t => t.Type)
                .Include(t => t.Details)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<TransactionHeader> CreateAsync(TransactionHeader transaction)
        {
            _context.TransactionHeaderModels.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        public async Task<TransactionHeader?> UpdateAsync(TransactionHeader transaction)
        {
            var existing = await _context.TransactionHeaderModels.FindAsync(transaction.Id);
            if (existing == null) return null;

            _context.Entry(existing).CurrentValues.SetValues(transaction);
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.TransactionHeaderModels.FindAsync(id);
            if (entity == null) return false;

            _context.TransactionHeaderModels.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Project> CreateAsyncProject(Project project)
        {
            
            _context.ProjectModels.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<Project?> GetByIdAsyncProject(int id)
        {
            return await _context.ProjectModels
            .AsNoTracking()
            .Include(p => p.User) // eager load User
            .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Project>> GetAllAsyncProject()
        {
            return await _context.ProjectModels
            .AsNoTracking()
             .Include(p => p.User)
             .ToListAsync();
        }

        public async Task<Project?> UpdateAsyncProject( Project updatedProject)
        {
            var existing = await _context.ProjectModels.FindAsync(updatedProject.Id);
            if (existing == null) return null;

            _context.Entry(existing).CurrentValues.SetValues(updatedProject);
            await _context.SaveChangesAsync();
            return existing;

        }

        public async Task<TypeTransaction> CreateAsyncType(TypeTransaction typeTransaction)
        {
            _context.TypeTransactionModels.Add(typeTransaction);
            await _context.SaveChangesAsync();
            return typeTransaction;
        }

        public async Task<TypeTransaction?> GetByIdAsyncType(int id)
        {
            return await _context.TypeTransactionModels.FindAsync(id);
        }

        public async Task<List<TypeTransaction>> GetAllAsyncType()
        {
            return await _context.TypeTransactionModels.AsNoTracking().ToListAsync();
        }

        public async Task<TypeTransaction?> UpdateAsyncType(TypeTransaction updatedTypeTransaction)
        {
            var existing = await _context.TypeTransactionModels.FindAsync(updatedTypeTransaction.Id);
            if (existing == null) return null;

            _context.Entry(existing).CurrentValues.SetValues(updatedTypeTransaction);
            await _context.SaveChangesAsync();
            return existing;
        }
    }
}
