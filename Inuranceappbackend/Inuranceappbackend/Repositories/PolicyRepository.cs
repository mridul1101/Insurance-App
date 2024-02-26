using Inuranceappbackend.Interfaces;
using Inuranceappbackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inuranceappbackend.Repositories
{
    public class PolicyRepository : IPolicyRepository
    {
        private readonly IConfiguration _config;
        private readonly BackendDbcontext _context;

        public PolicyRepository(BackendDbcontext context, IConfiguration config)
        {
            _context = context;
            _config = config;

        }


        public List<Policy> GetPoliciesByUserId(int ID)
        {
            return _context.PolicyUsers
                             .Where(pu => pu.ID == ID)
                             .Select(pu => pu.Policy)
                             .ToList();
        }
        public object GetPolicyDetailsById(int policyId)
        {
            return _context.Policies
                             .Where(p => p.PolicyId == policyId)
                             .Select(p => new
                             {
                                 p.PolicyId,
                                 p.PolicyName,
                                 p.PremiumAmount,
                                 p.LastPremiumPaid,
                                 p.NextPremiumdue,
                                 p.PolicyDescription,
                                 p.PolicyType
                             })
                             .FirstOrDefault();
        }

    }
}
