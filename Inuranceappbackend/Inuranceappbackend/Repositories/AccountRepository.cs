using Inuranceappbackend.Helper;
using Inuranceappbackend.Interfaces;
using Inuranceappbackend.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inuranceappbackend.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IConfiguration _config;
        private readonly BackendDbcontext _context;
        private readonly AesDecryptionService _aesDecryptionService;
      

        public AccountRepository(BackendDbcontext context, IConfiguration config)
        {
            _context = context;
            _config = config;

        }
        public string CreateUser(Users user)
        {

            {
                if (_context.Users.Any(x => x.Email == user.Email))
                {
                    return "FAILURE";
                }

                user.EncryptedPassword = PasswordHasher.HashPassword(user.EncryptedPassword);
                _context.Users.Add(user);
                _context.SaveChanges();

                return "Success";
            }

        }
        public Users Login(Login login)
        {


            var user = _context.Users.FirstOrDefault(u => u.Email == login.Email);

            if (user != null)
            {
                string decryptedStoredPassword = _aesDecryptionService.Decrypt(user.EncryptedPassword, user.IV);

                if (decryptedStoredPassword == _aesDecryptionService.Decrypt(login.Password, user.IV))
                {
                    return user;
                }
            }

            return null;





        }
    }
}