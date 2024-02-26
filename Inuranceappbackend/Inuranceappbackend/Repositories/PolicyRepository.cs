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
            var policies = _context.PolicyUsers
                             .Where(pu => pu.ID == ID)
                             .Select(pu => new Policy
                             {
                                 PolicyId = pu.Policy.PolicyId,
                                 PolicyName = pu.Policy.PolicyName,
                                 PremiumAmount = pu.Policy.PremiumAmount,
                                 LastPremiumPaid = pu.Policy.LastPremiumPaid
                             })
                             .ToList();
            return policies;
        }
        public List<Policy> GetPolicyDetailsById(int policyId)
        {
            var policy = _context.Policies
                                 .Where(p => p.PolicyId == policyId)
                                 .Select(p => new Policy
                                 {
                                     PolicyId = p.PolicyId,
                                     PolicyName = p.PolicyName,
                                     PremiumAmount = p.PremiumAmount,
                                     LastPremiumPaid = p.LastPremiumPaid,
                                     NextPremiumdue = p.NextPremiumdue,
                                     PolicyDescription = p.PolicyDescription,
                                     PolicyType = p.PolicyType
                                 })
                                 .ToList();
            return policy;
        }


    }
}
