using webapptoolsA.Server.Entities;

namespace webapptoolsA.Server.Models
{
    public class RequestUserLoginDto : UserBase
    {
       
    }
    public class RequestRegisterUser : User
    {
      
    }

    public class ResponseInfoUser
    {
        public int Id { get; set; }
        public int Idrole { get; set; }
        public string Namerole { get; set; }
        public string Username {  get; set; }
    }
}
