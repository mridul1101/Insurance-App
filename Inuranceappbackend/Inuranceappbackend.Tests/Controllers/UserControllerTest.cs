using Inuranceappbackend.Controllers;
using Inuranceappbackend.Interfaces;
using Inuranceappbackend.Models;
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
        public void LoginUser_UserNotFound_ReturnsNotFoundResult()
        {
            
            var mockRepository = new Mock<IAccountRepository>();
            mockRepository.Setup(repo => repo.Login(It.IsAny<Login>()))
                .Returns((Users)null);

            var mockConfig = new Mock<IConfiguration>();
            var controller = new UserController(mockConfig.Object, mockRepository.Object);

           
            var result = controller.LoginUser(new EncryptedLoginModel());

            
            Assert.IsType<NotFoundResult>(result);
        }

    }
}
