using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using technical_test_api_infrastructure.Models;
namespace technical_test_api_application.User
{
    public interface IUserService
    {
        Task<List<technical_test_api_infrastructure.Models.Note>> GetNodesByUserId(Guid id);
    }
}
