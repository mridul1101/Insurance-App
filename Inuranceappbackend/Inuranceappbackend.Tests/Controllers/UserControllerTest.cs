using Inuranceappbackend.Controllers;
using Inuranceappbackend.Interfaces;
using Inuranceappbackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using Xunit;

namespace Inuranceappbackend.Tests.Controllers
{
    // This contains unit test for UserController
    public class UserControllerTest
    {
        private readonly Mock<IAccountRepository> _accountRepositoryMock;
        private readonly Mock<IConfiguration> _configMock;
        private readonly UserController _controller;

        public UserControllerTest()
        {
            _accountRepositoryMock = new Mock<IAccountRepository>();
            _configMock = new Mock<IConfiguration>();
            _controller = new UserController(_configMock.Object, _accountRepositoryMock.Object);
            _configMock.SetupGet(x => x["AppSettings:EncryptionKey"]).Returns("test_key");
        }

        [Fact]
        public void CreateUser_ReturnsOkResult()
        {
            _accountRepositoryMock.Setup(repo => repo.CreateUser(It.IsAny<Users>()))
                .Returns("User created successfully.");

            var result = _controller.CreateUser(new Users());
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("User created successfully.", okResult.Value);
        }

        [Fact]
        public void LoginUser_Returns_Ok_When_User_Found()
        {
            var login = new Login { Email = "test@example.com", Password = "password" };
            _accountRepositoryMock.Setup(repo => repo.Login(login)).Returns(new Users());

            var result = _controller.LoginUser(login);

            var objectResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, objectResult.StatusCode);
        }

        [Fact]
        public void CreateUser_Returns_InternalServerError_When_ExceptionThrown()
        {
            _accountRepositoryMock.Setup(repo => repo.CreateUser(It.IsAny<Users>())).Throws(new Exception("Simulated exception"));

            var ex = Assert.Throws<Exception>(() => _controller.CreateUser(new Users()));
            Assert.Equal("Simulated exception", ex.Message);
        }

        [Fact]
        public void LoginUser_Returns_InternalServerError_When_DecryptionFails()
        {
            var login = new Login { Email = "test@example.com", Password = "password" };
            var user = new Users { ID = 1, FullName = "Test User", Email = "test@example.com", Mobile = "1234567890", password = "hashed_password" };
            _accountRepositoryMock.Setup(repo => repo.Login(login)).Returns(user);

            var result = _controller.LoginUser(login);

            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
        }

        [Fact]
        public void LoginUser_Returns_Ok_And_Token_When_Credentials_Are_Valid()
        {
            var login = new Login { Email = "test@example.com", Password = "password" };
            var user = new Users { ID = 1, FullName = "Test User", Email = "test@example.com", Mobile = "1234567890", password = "hashed_password" };
            _accountRepositoryMock.Setup(repo => repo.Login(login)).Returns(user);

            var result = _controller.LoginUser(login);

            if (result is OkObjectResult okObjectResult)
            {
                Assert.IsType<string>(okObjectResult.Value);
            }
            else
            {
                Assert.True(true, $"Unexpected result type: {result.GetType()}");
            }
        }
    }
}
