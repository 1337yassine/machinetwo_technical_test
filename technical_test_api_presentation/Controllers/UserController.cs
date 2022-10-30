using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using technical_test_api_application.User;
using technical_test_api_infrastructure.Dto;
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
        protected IConfiguration _config;

        public UserController(IUserRepository userRepository, IUserService userService, IConfiguration config)
        {
            _userRepository = userRepository;
            _userService = userService;
            _config = config;
        }

        [Route("/Login")]
        [HttpPost]
        [SwaggerOperation(Summary = "User Connect")]
        public async Task<ActionResult> Login([FromBody] Login model)
        {
            try
            {
                var token = await _userService.generateJwtToken(model);
                return Ok(token);
            }
            catch (Exception)
            {
                return BadRequest("Unauthorized");
            }
        }

        [Route("/AddUser")]
        [HttpPost]
        [SwaggerOperation(Summary = "Add User")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            try
            {
                await _userRepository.CreateUser(user);
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
        public async Task<IActionResult> UpdatePassword([FromBody] Dictionary<string, string> newPwd)
        {
            try
            {
                var token = Request.Headers.FirstOrDefault(x => x.Key == "Authorization").Value.ToString().Replace("Bearer ", string.Empty);
                var id = _userService.ValidateToken(token).ToString();
                var newPassword = newPwd["newPwd"];
                await _userRepository.PasswordReset(newPassword, id);
                return Ok("Updated Succefully");
            }
            catch (Exception ex)
            {
                return BadRequest("Invalid");
            }
        }

        //GetNodesByUserId
        [Route("/GetNotesByUser")]
        [HttpGet]
        [SwaggerOperation(Summary = "Get Notes of a specific user")]
        public async Task<IActionResult> GetNoteByUser([FromBody] Dictionary<string, string> Id)
        {
            try
            {
                var token = Request.Headers.FirstOrDefault(x => x.Key == "Authorization").Value.ToString().Replace("Bearer ", string.Empty);
                var idUser = _userService.ValidateToken(token);

                var notes = await _userService.GetNodesByUserId(idUser);
                return Ok(notes);
            }
            catch (Exception)
            {
                return NotFound("Invalid Operation");
            }
        }
    }
}