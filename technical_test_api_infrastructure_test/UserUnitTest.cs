using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using technical_test_api_infrastructure.Context;
using technical_test_api_infrastructure.Models;
using technical_test_api_infrastructure.Repositories.User;

namespace technical_test_api_infrastructure_test
{
    public class UserUnitTest
    {

        DbContextOptionsBuilder optionBuilder;

        UserDbContext context;

        UserRepository UserRepo;



        public UserUnitTest()
        {
            optionBuilder = new DbContextOptionsBuilder<UserDbContext>()
          .UseInMemoryDatabase(Guid.NewGuid().ToString());
            context = new UserDbContext(optionBuilder.Options);
            UserRepo = new UserRepository(context);
        }



        [Fact]
        async void ShouldTest_AddUser()
        {

            User user = new()
            {
                Id = Guid.NewGuid(),
                Password = "test"
            };

            await UserRepo.CreateUser(user);

            Assert.Single(context.Users);
        }

        [Fact]
        async void ShoudTest_GetUserBy_id()
        {

            User _user = new()
            {
                Id = Guid.NewGuid(),
                Password = "test"
            };
            context.Users.Add(_user);

            context.SaveChanges();

            var user = await UserRepo.GetUserByIdAsync(_user.Id);

            Assert.NotNull(user);
        }

        [Fact]
        async void ShouldTest_GetAllUsers()
        {

            List<User> users = new()
            {
                    new User { Id = Guid.NewGuid(), Password = "test" },
                    new User { Id = Guid.NewGuid(), Password = "test" }

            };

            context.Users.AddRange(users);

            await UserRepo.GetAllAsync();

            Assert.NotNull(users);
        }



    }
}