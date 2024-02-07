using Inuranceappbackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inuranceappbackend.Interfaces
{
   public interface IAccountRepository
    {
        string CreateUser(Users user);
        Users Login(Login login);
       
    }
}
