using technical_test_api_infrastructure.Base;
using technical_test_api_infrastructure.Context;

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

        public async Task CreateNote(Models.Note note)
        {
            Insert(note);
            await SaveAsync();
        }

        public async Task DeleteNoteAsync(Guid Id)
        {
            var note = await Task.Run(() => _dbSet.FirstOrDefault(n => n.Id == Id));
            DeleteAsync(note.Id);
            await SaveAsync();
        }
    }
}