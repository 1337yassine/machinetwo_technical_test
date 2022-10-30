namespace technical_test_api_infrastructure.Repositories.Note
{
    public interface INoteRepository
    {
        Task<List<Models.Note>> GetNotes();

        Task<List<Models.Note>> GetNoteByDate(DateTime date);

        Task CreateNote(Models.Note note);

        Task DeleteNoteAsync(Guid Id);
    }
}