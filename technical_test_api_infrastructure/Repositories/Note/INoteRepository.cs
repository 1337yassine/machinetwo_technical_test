using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using technical_test_api_infrastructure.Models;

namespace technical_test_api_infrastructure.Repositories.Note
{
    public interface INoteRepository
    {
        Task<List<Models.Note>> GetNotes();

        Task<List<Models.Note>> GetNoteByDate(DateTime date);
    }
}
