using Inuranceappbackend.Models;
using Microsoft.EntityFrameworkCore;

namespace Inuranceappbackend
{   // This is Dbcontext class
    public class BackendDbcontext:DbContext
    {
        public BackendDbcontext(DbContextOptions<BackendDbcontext> options) : base(options)
        {
        }
        public DbSet<Users> Users { get; set; }
    }
}
