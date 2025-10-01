using Azure.Core;
using Humanizer;
using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Data;
using webapptoolsA.Server.Entities;
using webapptoolsA.Server.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace webapptoolsA.Server.Services
{
    public interface ITransactionService
    {
        Task<List<ResponseTransactionHeader>> GetAllAsync();
        Task<ResponseTransactionHeader?> GetByIdAsync(int id);
        Task<ResponseTransactionHeader> CreateAsync(TransactionHeaderBase transaction);
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

        Task<ResponseTransactionDetailDto> CreateAsyncDetail(RequestTransactionDetailDto detail);
        Task<ResponseTransactionDetailDto?> GetByIdAsyncDetail(int id);
        Task<List<ResponseTransactionDetailDto>> GetAllAsyncDetail(int idHeader);
        Task<ResponseTransactionDetailDto?> UpdateAsyncDetail(RequestTransactionDetailDto updatedDetail);
        Task<bool> DeleteAsyncDetail(int id);
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

        public async Task<ResponseTransactionHeader> CreateAsync(TransactionHeaderBase transaction)
        {
            var entity = new TransactionHeader
            {
                UserId = transaction.UserId,
                Days = transaction.Days,
                IdType = transaction.IdType,
                Notes = transaction.Notes,
                UserRecipt = transaction.UserRecipt,
                IdProject = transaction.IdProject,
                IdWarehouseOrigin = transaction.IdWarehouseOrigin,
                IdWarehouseDestination = transaction.IdWarehouseDestination,
                Status = transaction.Status
            };
            _context.TransactionHeaderModels.Add(entity);
            await _context.SaveChangesAsync();
            var transactionTmp = await _context.TransactionHeaderModels
                .AsNoTracking()
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

        public async Task<ResponseTransactionDetailDto> CreateAsyncDetail(RequestTransactionDetailDto detail)
        {

                var entity = new TransactionDetail
                {
                    IdTransaction = detail.IdTransaction,
                    IdWarehouse = detail.IdWarehouse,
                    IdToolsType = detail.IdToolsType,
                    IdStatusTools = detail.IdStatusTools,
                    Quantity = detail.Quantity
                };
             _context.TransactionDetailsModels.Add(entity);



            if (detail.TypeTransaction.Type == "I")
            {
                await UpdateStockAsync(detail.IdWarehouse, 1, detail.Quantity, true);
            }
            else
            {
                await UpdateStockAsync(detail.IdWarehouse, detail.IdToolsType, detail.Quantity, false);

            }



            await _context.SaveChangesAsync();
            


            var response = new ResponseTransactionDetailDto
            {
                IdDetailTransaction = entity.IdDetailTransaction,
                IdTransaction = entity.IdTransaction,
                IdWarehouse = entity.IdWarehouse,
                WarehouseName = entity.Warehouse!.Name,
                IdToolsType = entity.IdToolsType,
                ToolName = entity.ToolsType!.Name,
                IdStatusTools = entity.IdStatusTools,
                StatusToolName = entity.ToolsType.Name,
                Quantity = entity.Quantity
            };

            return response;
        }

        public Task<ResponseTransactionDetailDto?> GetByIdAsyncDetail(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<ResponseTransactionDetailDto>> GetAllAsyncDetail(int idHeader)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseTransactionDetailDto?> UpdateAsyncDetail(RequestTransactionDetailDto updatedDetail)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsyncDetail(int id)
        {
            throw new NotImplementedException();
        }


        private async Task UpdateStockAsync(int warehouseId, int productId, int qty,bool isIngress)
        {
            var stock = await _context.StockModels
                .FirstOrDefaultAsync(s => s.IdCategory == productId && s.IdWarehouse == warehouseId);

            if (stock == null)
            {
                stock = new Stocks
                {
                    IdCategory = productId,
                    IdWarehouse = warehouseId,
                    Stock = 0
                };
                _context.StockModels.Add(stock);
            }

            if (isIngress)
            {
                stock.Stock += qty;
            }
            else
            {
                if (stock.Stock < qty)
                    throw new InvalidOperationException($"Insufficient stock for Product {productId} in warehouse {warehouseId}");
                stock.Stock -= qty;
            }

            _context.StockModels.Update(stock);
        }
    }
}
