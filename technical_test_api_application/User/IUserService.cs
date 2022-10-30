using technical_test_api_infrastructure.Dto;
using technical_test_api_infrastructure.Utils;

namespace technical_test_api_application.User
{
    public interface IUserService
    {
        Task<List<technical_test_api_infrastructure.Models.Note>> GetNodesByUserId(Guid id);

        Task<Token> generateJwtToken(Login model);

        Guid ValidateToken(string token);
    }
}