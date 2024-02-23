﻿using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Inuranceappbackend
{   //This is jwt service for token
    public class JwtServices
    {
        public string SecretKey { get; set; }
        public int TokenDuration { get; set; }
        private readonly IConfiguration _config;

        public JwtServices(IConfiguration config)
        {
            _config = config;
            this.SecretKey = _config.GetSection("jwtConfig").GetSection("Key").Value;
            this.TokenDuration = Int32.Parse(config.GetSection("jwtConfig").GetSection("Duration").Value);
        }
        public string GenerateToken(String ID, String FullName, String Email, String Mobile)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecretKey));
            var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var payload = new[]
            {
                new Claim("id",ID),
                new Claim("fullname",FullName),
                new Claim("email",Email),
                new Claim("mobile",Mobile),
               
            };
            var jwtToken = new JwtSecurityToken(
                issuer: "localhost",
                audience: "localhost",
                claims: payload,
                expires: DateTime.Now.AddMinutes(TokenDuration),
                signingCredentials: signature

                );
            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }
    }
}
