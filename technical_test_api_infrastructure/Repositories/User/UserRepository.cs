using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using technical_test_api_infrastructure.Base;
using technical_test_api_infrastructure.Context;
using technical_test_api_infrastructure.Models;
using technical_test_api_infrastructure.Extensions;
using System.Xml.Linq;
using Microsoft.EntityFrameworkCore;

namespace technical_test_api_infrastructure.Repositories.User
{
    public sealed class UserRepository : BaseRepository<Models.User>, IUserRepository
    {

        public UserRepository(UserDbContext context) : base(context)
        {

        }

        public async Task CreateUser(Models.User user)
        {
            user.Password = user.Password.HashMD5();
            Insert(user);
            await SaveAsync();
        }

        public async Task<List<Models.User>> GetAllAsync()
        {
            var users = await Task.Run(() => _dbSet.Include(n => n.notes).ToList());
            return users;
        }

        public async Task<Models.User> GetUserByIdAsync(Guid id)
        {
            var user = await Task.Run(() => _dbSet.FirstOrDefault(u => u.Id == id));
            return user;
        }

        public async Task PasswordReset(string newPassword, string userId)
        {
            var id = Guid.Parse(userId);

            var user = await GetUserByIdAsync(id);
            user.Password = newPassword.HashMD5();
            Update(user);
            await SaveAsync();
        }
    }
}
