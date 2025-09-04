using System.Text.Json.Serialization;


namespace webapptoolsA.Server.Entities
{
    public class WarehouseBase
    {
        public int? Id { get; set; }                  // [id] INT IDENTITY

        public int? code { get; set; }
        public string Name { get; set; }             // [name] VARCHAR(100)
        public string? Description { get; set; }     // [description] VARCHAR(75) NULL
        public string? Location { get; set; }        // [location] VARCHAR(100) NULL
        public bool IsActived { get; set; }          // [isactived] BIT
        public int CompanyId { get; set; }           // [companyid] INT
        public int? WarehouseFatherId { get; set; }  // [warehousefatherid] INT NULL
    }

    public class Warehouse :WarehouseBase
    {
        public Warehouse? WarehouseFather { get; set; }
        [JsonIgnore]
        public ICollection<Warehouse> Children { get; set; } = new List<Warehouse>();

        public CompanyModel Company { get; set; }
    }



    public class RequestWarehouseCreateDto :WarehouseBase
    {
            
    }
}
