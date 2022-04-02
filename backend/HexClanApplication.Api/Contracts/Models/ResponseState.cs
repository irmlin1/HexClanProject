namespace HexClanApplication.Api.Contracts.Models
{
    public class ResponseState
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Content { get; set; }
    }
}
