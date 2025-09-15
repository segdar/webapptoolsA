using webapptoolsA.Server.Entities;

namespace webapptoolsA.Server.Models
{
    public class RequestTransactionHeader : TransactionHeaderBase
    {
    }

    public class ResponseTransactionHeader : TransactionHeaderBase
    {
        public string UsernameRegister { get; set; }
        public string UsernameRecipt { get; set; }
        public string WarehouseOrigin { get; set; }
        public string WarehouseDestination { get; set; }
        public string nameTypeTransaction { get; set; }
        public string NameProject { get; set; }


    }

    public class RequestProjectDto : ProjectBase
    {

    }

    public class ResponseProjectDto : ProjectBase
    {
        public string Username { get; set; }
    }


    public class ResponseTypeTransactionDto : TypeTransaction
    {

    }

    public class RequestTypeTransactionDto: TypeTransaction
    {

    }
}
