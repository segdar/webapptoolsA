using webapptoolsA.Server.Entities;

namespace webapptoolsA.Server.Models
{
    public class RequestTransactionHeader : TransactionHeader
    {
    }

    public class ResponseTransactionHeader
    {

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
