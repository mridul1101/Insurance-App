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
        public DbSet<Policy> Policies { get; set; }

        public DbSet<PolicyUser> PolicyUsers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<PolicyUser>()
                .HasKey(pu => new { pu.PolicyUserID }); 

            modelBuilder.Entity<PolicyUser>()
                .HasOne(pu => pu.Policy)
                .WithMany(p => p.PolicyUsers)
                .HasForeignKey(pu => pu.PolicyID);

            modelBuilder.Entity<PolicyUser>()
                .HasOne(pu => pu.User)
                .WithMany(u => u.PolicyUsers)
                .HasForeignKey(pu => pu.ID);
                
        }
    }
}
