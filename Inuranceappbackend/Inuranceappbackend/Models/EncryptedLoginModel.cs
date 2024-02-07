using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inuranceappbackend.Models
{
    public class EncryptedLoginModel
    {
        public string EncryptedEmail { get; set; }
        public string EncryptedPassword { get; set; }
        public string IV { get; set; }
    }
}
