using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using technical_test_api_infrastructure.Models;

namespace technical_test_api_infrastructure.Repositories.User
{
    public interface IUserRepository
    {
        Task CreateUser(Models.User user);
        Task PasswordReset(string newPassword, string userId);
        Task<List<Models.User>> GetAllAsync();
        Task<Models.User> GetUserByIdAsync(Guid id);




    }
}
