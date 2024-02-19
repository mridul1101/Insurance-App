using Inuranceappbackend.Controllers;
using Inuranceappbackend.Interfaces;
using Inuranceappbackend.Models;
using Inuranceappbackend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Inuranceappbackend.Tests.Controllers
{
    public class UserControllerTest
    {
      
        [Fact]
        public void CreateUser_ReturnsOkResult()
        {

            var mockRepository = new Mock<IAccountRepository>();
            mockRepository.Setup(repo => repo.CreateUser(It.IsAny<Users>()))
                .Returns("User created successfully.");

            var mockConfig = new Mock<IConfiguration>();
            var controller = new UserController(mockConfig.Object, mockRepository.Object);


            var result = controller.CreateUser(new Users());


            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("User created successfully.", okResult.Value);
        }
        [Fact]
        public void LoginUser_Returns_Unauthorized_When_User_Not_Found()
        {
            // Arrange
            var accountRepositoryMock = new Mock<IAccountRepository>();
            var configMock = new Mock<IConfiguration>();
            var controller = new UserController(configMock.Object, accountRepositoryMock.Object);

            var login = new Login { Email = "test@example.com", Password = "password" };
            accountRepositoryMock.Setup(repo => repo.Login(login)).Returns((Users)null);

          //Act
            var result = controller.LoginUser(login);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void LoginUser_Returns_Unauthorized_When_Passwords_Do_Not_Match()
        {
            // Arrange
            var accountRepositoryMock = new Mock<IAccountRepository>();
            var configMock = new Mock<IConfiguration>();
            var controller = new UserController(configMock.Object, accountRepositoryMock.Object);

            var login = new Login { Email = "test@example.com", Password = "encryptedPassword"};
            accountRepositoryMock.Setup(repo => repo.Login(login)).Returns(new Users {  });

           
            var result = controller.LoginUser(login);

            
            Assert.IsType<UnauthorizedResult>(result);
        }

    }
}
