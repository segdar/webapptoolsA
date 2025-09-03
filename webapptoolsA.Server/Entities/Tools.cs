using System.Text.Json.Serialization;

namespace webapptoolsA.Server.Entities
{
    //base
    public class ToolsBase
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int Category { get; set; }
        public string? Location { get; set; }
        public int status_tool { get; set; }
        public string? Provider { get; set; }
        public string? Barcode { get; set; }
        public string? Qr { get; set; }
        public decimal Cost { get; set; }
        public bool IsActived { get; set; }
        public bool IsConsumable { get; set; }
        
    }

    public class ToolCommonBase
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public bool IsActived { get; set; }
    }

    
   

    public class StatusTool : ToolCommonBase
    {
        [JsonIgnore]
        public ICollection<Tools>? Tools { get; set; }
    }

    public class Category : ToolCommonBase
    {
        //public int MinStock { get; set; }
        [JsonIgnore]
        public ICollection<Tools>? Tools { get; set; }
    }

    public class Tools : ToolsBase
    {

        public Category? objcategory { get; set; }
        public StatusTool? statustools { get; set; }
    }

    public class Stock
    {
        public int IdTools { get; set; }
        public int Warehouse { get; set; }
        public int StockQuantity { get; set; }

    }
}
