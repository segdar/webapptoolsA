using Microsoft.EntityFrameworkCore;
using webapptoolsA.Server.Entities;


namespace webapptoolsA.Server.Data
{

      public class AppDbContext : DbContext
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
            public DbSet<User> UserModels { get; set; }
            public DbSet<TransactionHeader> TransactionHeaderModels { get; set; }
            public DbSet<TransactionDetail> TransactionDetailsModels { get; set; }
            public DbSet<TypeTransaction> TypeTransactionModels { get; set; }
            public DbSet<Project> ProjectModels { get; set; }
            public DbSet<Roles> RoleModels { get; set; }
            public DbSet<UserAccessCompany> UserAccessCompaniesModels { get; set; }



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
                              .WithMany()
                              .HasForeignKey(e => e.CompanyId)
                              .OnDelete(DeleteBehavior.Restrict);
                        entity.HasOne(e => e.WarehouseFather)       // Each warehouse has one parent
                              .WithMany()                           // Parent can have many children (optional: you can add a collection if needed)
                              .HasForeignKey(e => e.WarehouseFatherId)
                              .OnDelete(DeleteBehavior.Restrict);
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
                        entity.Property(e => e.IsConsumable)
                  .IsRequired();
                  });

                  modelBuilder.Entity<Stock>(entity =>
                  {
                        entity.ToTable("stocks");
                        entity.HasKey(e => new { e.IdTools, e.Warehouse }); // composite key
                        entity.Property(e => e.StockQuantity);

                  });
                    
                  modelBuilder.Entity<Roles>(entity =>
                  {
                        entity.ToTable("roles");
                        entity.HasKey(e => e.Id);
                        entity.Property(e => e.Name)
                        .HasMaxLength(50)
                        .IsRequired()
                        .HasColumnName("name");
                        entity.Property(e => e.IsActived)
                        .HasColumnName("isactived")
                        .IsRequired();
                  });

                   modelBuilder.Entity<User>(entity =>
                  {
                        entity.ToTable("users");
                        entity.HasKey(e => e.Id);
                        entity.Property(e => e.Username)
                        .HasMaxLength(100)
                        .IsRequired()
                        .HasColumnName("username");
                         entity.HasOne(e => e.Roles)
                        .WithMany()
                        .HasForeignKey(u => u.Role);
                        entity.Property(e => e.IsActived)
                        .HasColumnName("isactived");
                        entity.Property(e => e.Barcode)
                        .HasMaxLength(200)
                        .HasColumnName("barcode");
                        entity.Property(e => e.Qr)
                        .HasMaxLength(200)
                        .HasColumnName("Qr");
                        entity.Property(e => e.Password)
                        .HasColumnName("password");
                  });

                  modelBuilder.Entity<TransactionHeader>(entity =>
                  {
                        entity.ToTable("toolstransaction_header");
                        entity.HasKey(e => e.Id);
                        entity.Property(e => e.Id).HasColumnName("id");
                        entity.Property(e => e.UserId).HasColumnName("user_id").IsRequired();
                        entity.Property(e => e.UserRecipt).HasColumnName("user_recipt").IsRequired();
                        entity.Property(e => e.Days).HasColumnName("days");
                        entity.Property(e => e.IdType).HasColumnName("type").IsRequired();
                        entity.Property(e => e.Notes).HasColumnName("notes").HasMaxLength(255);
                        entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                        entity.Property(e => e.IdProject).HasColumnName("idproject");
                        entity.Property(e => e.IdWarehouseOrigin).HasColumnName("idwarehouseorigin").IsRequired();
                        entity.Property(e => e.IdWarehouseDestination).HasColumnName("idwarehousedestination").IsRequired();
                        entity.Property(e => e.Status).HasColumnName("status").IsRequired();

                        entity.HasOne(e => e.User)
                        .WithMany()
                        .HasForeignKey(e => e.UserId)
                        .OnDelete(DeleteBehavior.Restrict);

                        entity.HasOne(e => e.UserReciptNavigation)
                        .WithMany()
                        .HasForeignKey(e => e.UserRecipt)
                        .OnDelete(DeleteBehavior.Restrict);

                        entity.HasOne(e => e.WarehouseOrigin)
                        .WithMany()
                        .HasForeignKey(e => e.IdWarehouseOrigin)
                        .OnDelete(DeleteBehavior.Restrict);

                        entity.HasOne(e => e.WarehouseDestination)
                        .WithMany()
                        .HasForeignKey(e => e.IdWarehouseDestination)
                        .OnDelete(DeleteBehavior.Restrict);

                        entity.HasOne(e => e.Type)
                        .WithMany()
                        .HasForeignKey(e => e.IdType)
                        .OnDelete(DeleteBehavior.Restrict);

                        entity.HasOne(e => e.Project)
                        .WithMany()
                        .HasForeignKey(e => e.IdProject)
                        .OnDelete(DeleteBehavior.SetNull);
                  });

                  modelBuilder.Entity<TransactionDetail>(entity =>
                  {
                        entity.ToTable("toolstransaction_detail");

                        entity.HasKey(e => e.IdDetailTransaction);

                        entity.Property(e => e.IdDetailTransaction)
                        .HasColumnName("iddetailtransaction");

                        entity.Property(e => e.IdTransaction)
                        .HasColumnName("idtransaction")
                        .IsRequired();

                        entity.Property(e => e.IdWarehouse)
                        .HasColumnName("idwarehouse")
                        .IsRequired();

                        entity.Property(e => e.Quantity)
                        .HasColumnName("quantity")
                        .IsRequired();

                        // Relationships
                        entity.HasOne(e => e.Transaction)
                        .WithMany(h => h.Details)
                        .HasForeignKey(e => e.IdTransaction)
                        .OnDelete(DeleteBehavior.Cascade);

                        entity.HasOne(e => e.Warehouse)
                        .WithMany()
                        .HasForeignKey(e => e.IdWarehouse)
                        .OnDelete(DeleteBehavior.Restrict);
                  });

                  modelBuilder.Entity<Project>(entity =>
                  {
                        entity.ToTable("project");

                        entity.HasKey(e => e.Id);

                        entity.Property(e => e.Id)
                        .HasColumnName("id");

                        entity.Property(e => e.Name)
                        .HasColumnName("name")
                        .HasMaxLength(150)
                        .IsRequired();

                        entity.Property(e => e.Description)
                        .HasColumnName("description")
                        .HasMaxLength(250);

                        entity.Property(e => e.Location)
                        .HasColumnName("location")
                        .HasMaxLength(250);

                        entity.Property(e => e.UserId)
                        .HasColumnName("user_id")
                        .IsRequired();

                        entity.Property(e => e.CreatedAt)
                        .HasColumnName("created_at")
                        .HasDefaultValueSql("getdate()");


                        // Relationship to User
                        entity.HasOne(e => e.User)
                        .WithMany() // or .WithMany(u => u.Projects) if User has ICollection<Project>
                        .HasForeignKey(e => e.UserId)
                        .OnDelete(DeleteBehavior.Restrict);
                  });

                  modelBuilder.Entity<TypeTransaction>(entity =>
                  {
                        entity.ToTable("typetransaction");
                        entity.ToTable(table =>
                  {
                            table.HasCheckConstraint("CK_TypeTransaction_Type", "[type] IN ('I','E')");
                      });

                        entity.HasKey(e => e.Id);

                        entity.Property(e => e.Id)
                        .HasColumnName("id");

                        entity.Property(e => e.Code)
                        .HasColumnName("code")
                        .HasMaxLength(50)
                        .IsRequired();

                        entity.Property(e => e.Name)
                        .HasColumnName("name")
                        .HasMaxLength(255)
                        .IsRequired();
                        entity.Property(e => e.IsActived)
                  .HasColumnName("isactived")
                  .IsRequired();
                        entity.Property(e => e.Type)
                        .HasColumnName("type")
                        .HasMaxLength(1)
                        .IsRequired();




                  });
                  modelBuilder.Entity<UserAccessCompany>(entity =>
                  {
                        entity.ToTable("usercompany");
                        entity.HasKey(e => e.Id); 
                        entity.Property(e => e.IdUser)
                        .HasColumnName("user_id")
                        .IsRequired();
                        entity.Property(e => e.IdCompany)
                        .HasColumnName("company_id")
                        .IsRequired();
                        // Relationships
                        entity.HasOne<User>()
                        .WithMany()
                        .HasForeignKey(e => e.IdUser)
                        .OnDelete(DeleteBehavior.Cascade);
                        entity.HasOne<CompanyModel>()
                        .WithMany()
                        .HasForeignKey(e => e.IdCompany)
                        .OnDelete(DeleteBehavior.Cascade);
                  });

        }
      }
}