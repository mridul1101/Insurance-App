using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inuranceappbackend.Models
{
    public class Users
    {
        public int ID { get; set; }
        public string FullName { get; set; }

        public string Email { get; set; }
        public string Mobile { get; set; }
       
        public string password { get; set; }
       
    }
}
