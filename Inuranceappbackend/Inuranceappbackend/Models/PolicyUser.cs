using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Inuranceappbackend.Models
{
    public class PolicyUser
    {
        [Key]

        public int PolicyUserID { get; set; }
        public int PolicyID { get; set; }
        public int ID { get; set; }
        
       
        public Policy Policy { get; set; }
       
        public Users User { get; set; }
    }
}
