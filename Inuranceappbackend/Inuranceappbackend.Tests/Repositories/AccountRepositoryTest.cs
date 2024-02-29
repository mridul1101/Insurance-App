using Inuranceappbackend.Models;
using Inuranceappbackend.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using System.Linq;
using Xunit;

namespace Inuranceappbackend.Tests.Repositories
{   // This contains unit test cases for Account Repository
    public class AccountRepositoryTest
    {
        [Fact]
        public void CreateUser_Successfully()
        {
            var user = new Users { Email = "test@example.com", password = "password" };
            var mockConfig = new Mock<IConfiguration>();
            var options = new DbContextOptionsBuilder<BackendDbcontext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;
            var context = new BackendDbcontext(options);
            var repository = new AccountRepository(context, mockConfig.Object);

            var result = repository.CreateUser(user);

            Assert.Equal("Success", result);
            Assert.Equal(1, context.Users.Count());
        }

        [Fact]
        public void CreateUser_Failure_UserAlreadyExists()
        {
            var existingUser = new Users { Email = "existing@example.com", password = "password" };
            var mockConfig = new Mock<IConfiguration>();
            var options = new DbContextOptionsBuilder<BackendDbcontext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;
            var context = new BackendDbcontext(options);
            context.Users.Add(existingUser);
            context.SaveChanges();
            var repository = new AccountRepository(context, mockConfig.Object);
            var newUser = new Users { Email = "existing@example.com", password = "password" };

            var result = repository.CreateUser(newUser);

            Assert.Equal("FAILURE", result);
            Assert.Equal(1, context.Users.Count());
        }

        [Fact]
        public void Login_Successful()
        {
            var user = new Users { Email = "test@example.com", password = "password" };
            var mockConfig = new Mock<IConfiguration>();
            var options = new DbContextOptionsBuilder<BackendDbcontext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;
            var context = new BackendDbcontext(options);
            context.Users.Add(user);
            context.SaveChanges();
            var repository = new AccountRepository(context, mockConfig.Object);
            var login = new Login { Email = "test@example.com" };

            var result = repository.Login(login);

            Assert.Equal("test@example.com", result.Email);
        }

        [Fact]
        public void Login_UserNotFound()
        {
            var mockConfig = new Mock<IConfiguration>();
            var options = new DbContextOptionsBuilder<BackendDbcontext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;
            var context = new BackendDbcontext(options);
            var repository = new AccountRepository(context, mockConfig.Object);
            var login = new Login { Email = "nonexisting@example.com" };

            Assert.Throws<Exception>(() => repository.Login(login));
        }
    }
}

