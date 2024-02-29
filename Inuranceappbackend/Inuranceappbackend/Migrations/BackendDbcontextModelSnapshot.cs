﻿// <auto-generated />
using System;
using Inuranceappbackend;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Inuranceappbackend.Migrations
{
    [DbContext(typeof(BackendDbcontext))]
    partial class BackendDbcontextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Inuranceappbackend.Models.Policy", b =>
                {
                    b.Property<int>("PolicyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("LastPremiumPaid")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("NextPremiumdue")
                        .HasColumnType("datetime2");

                    b.Property<string>("PolicyDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PolicyName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PolicyType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PremiumAmount")
                        .HasColumnType("int");

                    b.HasKey("PolicyId");

                    b.ToTable("Policies");
                });

            modelBuilder.Entity("Inuranceappbackend.Models.PolicyUser", b =>
                {
                    b.Property<int>("PolicyUserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("ID")
                        .HasColumnType("int");

                    b.Property<int>("PolicyID")
                        .HasColumnType("int");

                    b.HasKey("PolicyUserID");

                    b.HasIndex("ID");

                    b.HasIndex("PolicyID");

                    b.ToTable("PolicyUsers");
                });

            modelBuilder.Entity("Inuranceappbackend.Models.Users", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mobile")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Inuranceappbackend.Models.PolicyUser", b =>
                {
                    b.HasOne("Inuranceappbackend.Models.Users", "User")
                        .WithMany("PolicyUsers")
                        .HasForeignKey("ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Inuranceappbackend.Models.Policy", "Policy")
                        .WithMany("PolicyUsers")
                        .HasForeignKey("PolicyID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Policy");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Inuranceappbackend.Models.Policy", b =>
                {
                    b.Navigation("PolicyUsers");
                });

            modelBuilder.Entity("Inuranceappbackend.Models.Users", b =>
                {
                    b.Navigation("PolicyUsers");
                });
#pragma warning restore 612, 618
        }
    }
}
