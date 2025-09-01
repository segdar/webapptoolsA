using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Entities;

namespace webapptoolsA.Server.Data
{

    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options)
        {
        }
        public DbSet<CompanyModel> CompanyModels { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<Tools> ToolsModels { get; set; }
        public DbSet<Category> CategoryModels { get; set; }
        public DbSet<StatusTool> StatusToolModels { get; set; }
        
        public DbSet<Stock> StockModels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Warehouse>(entity =>
            {
                entity.ToTable("warehouse");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)
                      .HasMaxLength(100)
                      .IsRequired();
                entity.Property(e => e.Description)
                      .HasMaxLength(75);
                entity.Property(e => e.Location)
                      .HasMaxLength(100);
                entity.Property(e => e.IsActived)
                      .IsRequired();
                entity.Property(e => e.code);
                entity.HasOne(e => e.Company)
                      .WithMany(c => c.Warehouses)
                      .HasForeignKey(e => e.CompanyId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.WarehouseFather)
                      .WithMany(e => e.Children)
                      .HasForeignKey(e => e.WarehouseFatherId)
                      .OnDelete(DeleteBehavior.NoAction); // or SetNull via trigger
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsRequired();
                entity.Property(e => e.IsActived)
                    .IsRequired();
            });


            modelBuilder.Entity<StatusTool>(entity =>
            {
                entity.ToTable("statustools");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsRequired();
                entity.Property(e => e.IsActived)
                    .IsRequired();
            });

            modelBuilder.Entity<Tools>(entity =>
            {
                entity.ToTable("toolstype");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsRequired();
                entity.Property(e => e.Description)
                    .HasMaxLength(100);
                entity.Property(e => e.Location)
                    .HasMaxLength(75);
                entity.HasOne(e => e.objcategory)
                .WithMany(c => c.Tools)
                .HasForeignKey(e => e.Category)
                .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.statustools)
                .WithMany(c => c.Tools)
                .HasForeignKey(e => e.status_tool)
                .OnDelete(DeleteBehavior.Restrict);
                entity.Property(e => e.Provider)
                    .HasMaxLength(50);  
                entity.Property(e => e.Barcode);
                entity.Property(e => e.Qr);
                entity.Property(e => e.Cost)
                    .HasColumnType("decimal(15,5)")
                    .IsRequired();
                entity.Property(e => e.IsActived)
                    .IsRequired();
            });

            modelBuilder.Entity<Stock>(entity =>
            {
                entity.ToTable("stocks");
                entity.HasKey(e => new { e.IdTools, e.Warehouse }); // composite key
                entity.Property(e => e.StockQuantity);
                entity.Property(e => e.MinStock);
            });



        }
    }
}