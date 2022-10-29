using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Text.Json.Nodes;
using technical_test_api_application.User;
using technical_test_api_infrastructure.Models;
using technical_test_api_infrastructure.Repositories.User;

namespace technical_test_api_presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;


        public UserController(IUserRepository userRepository, IUserService userService)
        {
            _userRepository = userRepository;
            _userService = userService;
        }

        [Route("/AddUser")]
        [HttpPost]
        [SwaggerOperation(Summary = "Add User")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            try
            {
                _userRepository.CreateUser(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("/UpdatePwd")]
        [HttpPost]
        [SwaggerOperation(Summary = "API : Update Password ")]
        public async Task<IActionResult> UpdatePassword([FromBody] JsonObject data)
        {
            try
            {
                var newPassword = data["newPwd"].ToString();
                var id = data["iduser"].ToString();
                await _userRepository.PasswordReset(newPassword, id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        //GetNodesByUserId
        [Route("/GetNotesByUser")]
        [HttpGet]
        [SwaggerOperation(Summary = "Get Notes of a specific user")]
        public async Task<IActionResult> GetUserById([FromQuery] Guid id)
        {
            try
            {
                var notes = await _userService.GetNodesByUserId(id);
                return Ok(notes);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

    }
}
