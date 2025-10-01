using System.Data;

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

    public class Module
    {
        public int IdModule { get; set; }
        public string ModuleName { get; set; }
    }

    public class Permission
    {
        public int IdPermission { get; set; }
        public string PermissionName { get; set; }
    }

    public class RoleModulePermission
    {
        public int IdRole { get; set; }
        public Roles Role { get; set; }

        public int IdModule { get; set; }
        public Module Module { get; set; }

        public int IdPermission { get; set; }
        public Permission Permission { get; set; }
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

        public User User { get; set; }
        public CompanyModel Company { get; set; }

    }
}
