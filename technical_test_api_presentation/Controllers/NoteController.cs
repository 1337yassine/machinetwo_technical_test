using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using technical_test_api_application.User;
using technical_test_api_infrastructure.Models;
using technical_test_api_infrastructure.Repositories.Note;
using technical_test_api_infrastructure.Repositories.User;

namespace technical_test_api_presentation.Controllers
{
    public class NoteController : Controller
    {
        private readonly INoteRepository _noteRepository;
        private readonly IUserRepository _userRepository;

        private readonly IUserService _userService;

        public NoteController(INoteRepository noteRepository, IUserService userService, IUserRepository userRepository)
        {
            _noteRepository = noteRepository;
            _userService = userService;
            _userRepository = userRepository;
        }

        [Route("/GetNoteByDate")]
        [HttpGet]
        [SwaggerOperation(Summary = "Get List of notes in a specific date")]
        public async Task<IActionResult> GetNoteByDate([FromBody] DateTime date)
        {
            try
            {
                var notes = (await _userService.GetNodesByUserId(new Guid())).Where(x => x.date == date).ToList();
                return Ok(notes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("/addNote")]
        [HttpPost]
        [SwaggerOperation(Summary = "add new Note")]
        public async Task<IActionResult> AddNote([FromBody] Note note)
        {
            try
            {
                note.Id = Guid.NewGuid();
                var token = Request.Headers.FirstOrDefault(x => x.Key == "Authorization").Value.ToString().Replace("Bearer ", string.Empty);
                var idUser = _userService.ValidateToken(token);
                await _noteRepository.CreateNote(note);
                var userNote = await _userRepository.GetUserByIdAsync(idUser);

                userNote.notes = new List<Note>()
                {
                    note
                };

                await _userRepository.UpdateUserAsync(userNote);

                return Ok("Note Created Succesfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("/DeleteNote")]
        [HttpPost]
        [SwaggerOperation(Summary = "Delete Note")]
        public async Task<IActionResult> DeleteNote([FromBody] Dictionary<string, string> Id)
        {
            try
            {
                var token = Request.Headers.FirstOrDefault(x => x.Key == "Authorization").Value.ToString().Replace("Bearer ", string.Empty);
                var idUser = _userService.ValidateToken(token);
                var Idparam = Guid.Parse(Id["Id"]);
                if (Guid.Empty == idUser)
                {
                    throw new Exception();
                }
                await _noteRepository.DeleteNoteAsync(Idparam);

                return Ok("Note Deleted Succesfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}