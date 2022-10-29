using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using technical_test_api_infrastructure.Base;
using technical_test_api_infrastructure.Context;
using technical_test_api_infrastructure.Repositories.User;

namespace technical_test_api_infrastructure.Repositories.Note
{
    public sealed class NoteRepository : BaseRepository<Models.Note>, INoteRepository
    {

        public NoteRepository(UserDbContext context) : base(context)
        {

        }

        public Task<List<Models.Note>> GetNoteByDate(DateTime date)
        {
            var nodes = Task.Run(() => _dbSet.Where(n => n.date == date).ToList());
            return nodes;
        }

        public Task<List<Models.Note>> GetNotes()
        {
            var notes = Task.Run(() => _dbSet.ToList());
            return notes;
        }
    }
}
