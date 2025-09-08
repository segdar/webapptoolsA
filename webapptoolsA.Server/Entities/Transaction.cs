

namespace webapptoolsA.Server.Entities
{
    public class TransactionHeader
    {
        public int? Id { get; set; }
        public int UserId { get; set; }
        public int? Days { get; set; }
        public int IdType { get; set; }
        public string? Notes { get; set; }
        public int UserRecipt { get; set; }
        public int? IdProject { get; set; }
        public int IdWarehouseOrigin { get; set; }
        public int IdWarehouseDestination { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int Status { get; set; }

        public virtual User? User { get; set; }

        public virtual User? UserReciptNavigation { get; set; }

        public virtual Warehouse? WarehouseOrigin { get; set; }

        public virtual Warehouse? WarehouseDestination { get; set; }

        public virtual TypeTransaction? Type { get; set; }

        public virtual Project? Project { get; set; }

        public virtual ICollection<TransactionDetail>? Details { get; set; }
    }

    public class TransactionDetail
    {
        public int IdDetailTransaction { get; set; }
        public int IdTransaction { get; set; }
        public int IdWarehouse { get; set; }
        public int Quantity { get; set; }

        public virtual TransactionHeader? Transaction { get; set; }
        public virtual Warehouse? Warehouse { get; set; }

    }

    public class TypeTransaction
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Type { get; set; } 
    }

    public class Project
    {
        public int? Id { get; set; }
        public string Name { get; set; } 
        public string? Description { get; set; }
        public string? Location { get; set; }
        public int UserId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public virtual User? User { get; set; }
    }


}
