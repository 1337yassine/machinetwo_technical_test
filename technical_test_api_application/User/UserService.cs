using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using technical_test_api_infrastructure.Dto;
using technical_test_api_infrastructure.Extensions;
using technical_test_api_infrastructure.Models;
using technical_test_api_infrastructure.Repositories.Note;
using technical_test_api_infrastructure.Repositories.User;
using technical_test_api_infrastructure.Utils;

namespace technical_test_api_application.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly INoteRepository _noteRepository;
        protected IConfiguration _config;

        public UserService(IUserRepository userRepository, INoteRepository noteRepository, IConfiguration config)
        {
            _userRepository = userRepository;
            _noteRepository = noteRepository;
            _config = config;
        }

        public async Task<Token> generateJwtToken(Login model)
        {
            Token _token = new();

            var user = await _userRepository.FindUserByEmail(model.Email);

            if (model.Email == user.Email && model.Password.HashMD5() == user.Password)
            {
                var issuer = _config["Jwt:Issuer"];
                var audience = _config["Jwt:Audience"];
                var key = Encoding.ASCII.GetBytes
                (_config["Jwt:Key"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                new Claim("Id", user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, model.Email),
                new Claim(JwtRegisteredClaimNames.Email, model.Email),
                new Claim(JwtRegisteredClaimNames.Jti,
                Guid.NewGuid().ToString())
             }),
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials
                    (new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);
                _token.TokenId = tokenHandler.WriteToken(token);
                return _token;
            }
            return null;
        }

        public Guid ValidateToken(string token)
        {
            if (token == null)
                throw new InvalidDataException("token can't be null");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes
               (_config["Jwt:Key"]);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Claims.First(x => x.Type == "Id").Value;

                // return user id from JWT token if validation successful
                return Guid.Parse(userId);
            }
            catch
            {
                // return null if validation fails
                return Guid.Empty;
            }
        }

        public async Task<List<Note>> GetNodesByUserId(Guid id)
        {
            var notes = (await _userRepository.GetAllAsync()).Where(u => u.Id == id).SelectMany(x => x.notes).ToList();
            return notes;
        }
    }
}