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

                user.password = PasswordHasher.HashPassword(user.password);
                _context.Users.Add(user);
                _context.SaveChanges();

                return "Success";
            }

        }
        public Users Login(Login login)
        {
            var userAvailable = _context.Users.FirstOrDefault(x => x.Email == login.Email);
            if (userAvailable == null)
            {
                return userAvailable;
            }

           
            return userAvailable;
        }
    }
}