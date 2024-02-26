using Inuranceappbackend.Interfaces;
using Inuranceappbackend.Models;
using Inuranceappbackend.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inuranceappbackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PolicyController : Controller
    {
        private readonly IPolicyRepository _policyRepository;
        private readonly IAccountRepository _accountRepository;

        public PolicyController(IPolicyRepository policyRepository,IAccountRepository accountRepository)
        {
            _policyRepository = policyRepository;
            _accountRepository = accountRepository;
        }

        [HttpGet("UserPolicies/{ID}")]
        public IActionResult GetUserPolicies(int ID)
        {
            try
            {
                var policies = _policyRepository.GetPoliciesByUserId(ID);
                return Ok(policies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


        [HttpGet("PolicyDetails/{policyId}")]
        public IActionResult GetPolicyDetails(int policyId)
        {
            try
            {
                var policyDetails = _policyRepository.GetPolicyDetailsById(policyId);
                if (policyDetails == null || policyDetails.Count == 0) // Check for empty list
                    return NotFound("Policy details not found.");

                return Ok(policyDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


    }
}
