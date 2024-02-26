using Inuranceappbackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inuranceappbackend.Interfaces
{
   public interface IPolicyRepository
    {

        List<Policy> GetPoliciesByUserId(int ID);
        object GetPolicyDetailsById(int policyId);



    }
}
