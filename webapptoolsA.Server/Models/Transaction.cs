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


    public class TransactionDetailBaseDto
    {
        public int? IdDetailTransaction { get; set; }
        public int IdTransaction { get; set; }
        public int IdWarehouse { get; set; }
        public int IdToolsType { get; set; }
        public int IdStatusTools { get; set; }
        public int Quantity { get; set; }
    }
    public class RequestTransactionDetailDto : TransactionDetailBaseDto
    {
        public TypeTransaction TypeTransaction { get; set; }
    }

    public class ResponseTransactionDetailDto : TransactionDetailBaseDto
    {
        public string ToolTypeName { get; set; }
        public string StatusToolName { get; set; }
    }


}
