using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Inuranceappbackend.Models
{
    public class Policy
    {
        [Key]
        public int PolicyId { get; set; }
       
        public string PolicyName { get; set; }
        public int PremiumAmount { get; set; }
        public DateTime LastPremiumPaid { get; set; }
        public DateTime NextPremiumdue { get; set; }
        public string PolicyDescription { get; set; }
        public string PolicyType { get; set; }

        public ICollection<PolicyUser> PolicyUsers { get; set; }


    }
}
