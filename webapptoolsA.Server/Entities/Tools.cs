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
        public virtual ICollection<Tools>? Tools { get; set; }
    }

    public class Category : ToolCommonBase
    {
        //public int MinStock { get; set; }
        [JsonIgnore]
        public virtual ICollection<Tools>? Tools { get; set; }
    }

    public class Tools : ToolsBase
    {

        public virtual Category? objcategory { get; set; }
        public virtual StatusTool? statustools { get; set; }
    }

    public class Stocks
    {
        public int IdCategory { get; set; }
        public int IdWarehouse { get; set; }
        public int Stock { get; set; }

    }
}
