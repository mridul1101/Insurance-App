using Inuranceappbackend.Helper;
using Inuranceappbackend.Interfaces;
using Inuranceappbackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Inuranceappbackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
       

        private readonly IAccountRepository _accountRepository;
        private readonly IConfiguration _config;
        public UserController(IConfiguration config, IAccountRepository accountRepository)
        {

            _config = config;

            _accountRepository = accountRepository;
        


        }
        [HttpPost("CreateUser")]
        public IActionResult CreateUser([FromBody] Users user)
        {
            string result = _accountRepository.CreateUser(user);
            return Ok(result);
        }

        [HttpPost("LoginUser")]
        public IActionResult LoginUser([FromBody] Login login)
        {
            var userAvailable = _accountRepository.Login(login);
            
            if (userAvailable == null)
            {
                return NotFound();
            }

          
            try
            {
                string decryptedPassword = Decrypt(login.Password);

                if (PasswordHasher.VerifyPassword(decryptedPassword, userAvailable.password))
                {
                    return Ok("Wrong Password Entered");
                }

                string token = new JwtServices(_config).GenerateToken(
                    userAvailable.ID.ToString(),
                    userAvailable.FullName,
                    userAvailable.Email,
                    userAvailable.Mobile
                );

                return Ok(token);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

        }
        private string Decrypt(string cipherText)
        {
            try {
                string key = _config["AppSettings:EncryptionKey"];
                byte[] cipherBytes = Convert.FromBase64String(cipherText);
                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Key = Encoding.UTF8.GetBytes(key);
                    // You should not specify IV here if it's not used on the frontend
                    aesAlg.Mode = CipherMode.ECB; // ECB mode does not require an IV
                    aesAlg.Padding = PaddingMode.PKCS7;

                    ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, null); // Passing null for IV

                    using (MemoryStream msDecrypt = new MemoryStream(cipherBytes))
                    {
                        using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                            {
                                return srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
                }
            catch (Exception ex)
            {
                // Log decryption error for debugging
                Console.WriteLine($"Error during decryption: {ex.Message}");
                throw; // Rethrow the exception to handle it in the calling method
            }
        }






    }
}