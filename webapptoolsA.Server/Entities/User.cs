namespace webapptoolsA.Server.Entities
{
    public class UserBase
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class Roles
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public bool IsActived { get; set; }

    }

    public class User : UserBase 
    {
        public int? Id { get; set; }
        public int Role { get; set; }

        public bool IsActived { get; set; }

        public string? Barcode { get; set; }

        public string? Qr { get; set; }

         public Roles? Roles { get; set; }  
        }

    public class UserAccessCompany
    {
        public int? Id { get; set; }
        public int IdUser { get; set; }
        public int IdCompany { get; set; }

    }
}
