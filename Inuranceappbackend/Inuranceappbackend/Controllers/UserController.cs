using Inuranceappbackend.Helper;
using Inuranceappbackend.Interfaces;
using Inuranceappbackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inuranceappbackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly AesDecryptionService decryptionService;

        private readonly IAccountRepository _accountRepository;
        private readonly IConfiguration _config;
        public UserController(IConfiguration config, IAccountRepository accountRepository)
        {

            _config = config;

            _accountRepository = accountRepository;
            this.decryptionService = new AesDecryptionService("abcdefghijklmnopqrstuvwxyzabcdef");


        }
        [HttpPost("CreateUser")]
        public IActionResult CreateUser([FromBody] Users user)
        {
            string result = _accountRepository.CreateUser(user);
            return Ok(result);
        }

        [HttpPost("LoginUser")]
        public IActionResult LoginUser([FromBody] EncryptedLoginModel encryptedLogin)
        {
            
            string decryptedEmail = decryptionService.Decrypt(encryptedLogin.EncryptedEmail, encryptedLogin.IV);
            string decryptedPassword = decryptionService.Decrypt(encryptedLogin.EncryptedPassword, encryptedLogin.IV);

            var login = new Login
            {
                Email = decryptedEmail,
                Password = decryptedPassword
            };

            var userAvailable = _accountRepository.Login(login);

            if (userAvailable == null)
            {
                return NotFound();
            }

            if (!PasswordHasher.VerifyPassword(login.Password, userAvailable.EncryptedPassword))
            {
                return Ok("Wrong Password Entered");
            }

            return Ok(new JwtServices(_config).GenerateToken(
                    userAvailable.ID.ToString(),
                    userAvailable.FullName,
                    userAvailable.Email,
                    userAvailable.Mobile,
                    userAvailable.IsAdmin
                ));
        }
    }
}
