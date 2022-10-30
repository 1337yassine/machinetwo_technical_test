namespace technical_test_api_infrastructure.Repositories.User
{
    public interface IUserRepository
    {
        Task CreateUser(Models.User user);

        Task PasswordReset(string newPassword, string userId);

        Task<List<Models.User>> GetAllAsync();

        Task<Models.User> GetUserByIdAsync(Guid id);

        Task UpdateUserAsync(Models.User user);

        Task<Models.User> FindUserByEmail(string email);
    }
}