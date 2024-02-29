using Inuranceappbackend.Helper;
using Xunit;

namespace Inuranceappbackend.Tests.Helper
{   //This contains unit test for Password Hasher
    public class PasswordHasherTest
    {
        [Fact]
        public void HashPassword_ReturnsDifferentHashesForSamePassword()
        {
            string password = "password";

            var hashedPassword1 = PasswordHasher.HashPassword(password);
            var hashedPassword2 = PasswordHasher.HashPassword(password);

            Assert.NotEqual(hashedPassword1, hashedPassword2);
        }

        [Fact]
        public void VerifyPassword_CorrectPassword_ReturnsTrue()
        {
            string password = "password";
            string hashedPassword = PasswordHasher.HashPassword(password);

            var result = PasswordHasher.VerifyPassword(password, hashedPassword);

            Assert.True(result);
        }

        [Fact]
        public void VerifyPassword_IncorrectPassword_ReturnsFalse()
        {
           
            string correctPassword = "password";
            string incorrectPassword = "incorrectpassword";
            string hashedPassword = PasswordHasher.HashPassword(correctPassword);
            var result = PasswordHasher.VerifyPassword(incorrectPassword, hashedPassword);
            Assert.False(result);
        } 
    }
}

