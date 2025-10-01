using webapptoolsA.Server.Entities;

namespace webapptoolsA.Server.Models
{
    public class ResponseCompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<WarehouseBase> Warehouses { get; set; } = new List<WarehouseBase>();

    }
}
