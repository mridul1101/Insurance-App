using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Inuranceappbackend.Models
{   //This is User Model contain all fields for signup.
    public class Users
    {   [Key]
        public int ID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string password { get; set; }


        public ICollection<PolicyUser> PolicyUsers { get; set; }


    }
}
