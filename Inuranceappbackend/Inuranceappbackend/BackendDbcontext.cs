using Inuranceappbackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inuranceappbackend
{
    public class BackendDbcontext:DbContext
    {
        public BackendDbcontext(DbContextOptions<BackendDbcontext> options) : base(options)
        {

        }
        
        public DbSet<Users> Users { get; set; }
    }
}
