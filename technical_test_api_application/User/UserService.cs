using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using technical_test_api_infrastructure.Models;
using technical_test_api_infrastructure.Repositories.Note;
using technical_test_api_infrastructure.Repositories.User;

namespace technical_test_api_application.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly INoteRepository _noteRepository;

        public UserService(IUserRepository userRepository, INoteRepository noteRepository)
        {
            _userRepository = userRepository;
            _noteRepository = noteRepository;
        }

        public async Task<List<Note>> GetNodesByUserId(Guid id)
        {
            var notes = (await _userRepository.GetAllAsync()).Where(u => u.Id == id).SelectMany(x => x.notes).ToList();
            return notes;
        }
    }
}
