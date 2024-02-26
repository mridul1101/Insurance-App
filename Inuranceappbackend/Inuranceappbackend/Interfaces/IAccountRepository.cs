using Inuranceappbackend.Models;

namespace Inuranceappbackend.Interfaces
{  //This is interface of Account Repository.
    public interface IAccountRepository
    {
        string CreateUser(Users user);
        Users Login(Login login);
       

    }
}
