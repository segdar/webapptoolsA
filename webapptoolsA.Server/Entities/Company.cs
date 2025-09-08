using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace webapptoolsA.Server.Entities
{
    [Table("company")]
    public class CompanyModel
    {
        [Column("id")]
        public int? Id { get; set; }

        [Column("name")]
        public string Name { get; set; }
        [Column("address")]
        public  string Address { get; set; }
        [Column("contant_info")]
        public string ContactInfo { get; set; }

        [JsonIgnore]
        public virtual ICollection<Warehouse> Warehouses { get; set; } = new List<Warehouse>();
    }
}
