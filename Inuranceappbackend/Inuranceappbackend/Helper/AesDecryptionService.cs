using Inuranceappbackend.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Inuranceappbackend.Helper
{
    public  class AesDecryptionService
    {
        private readonly string key;

        public AesDecryptionService(string key)
        {
            

            this.key = key;
        }


        public string Decrypt(string encryptedText, string iv)
        {
            if (string.IsNullOrEmpty(encryptedText))
            {
                throw new ArgumentNullException(nameof(encryptedText), "Encrypted text cannot be null or empty.");
            }

            if (string.IsNullOrEmpty(iv))
            {
                throw new ArgumentNullException(nameof(iv), "Initialization vector (IV) cannot be null or empty.");
            }
            if (!TryVerifyBase64String(encryptedText) || !TryVerifyBase64String(iv))
            {
                throw new FormatException("The input is not a valid Base64-encoded string.");
            }
            byte[] ivBytes = Convert.FromBase64String(iv);

            if (ivBytes.Length != 16)
            {
                // Handle the case where the IV length is not valid
                throw new ArgumentException("Initialization vector (IV) must be 16 bytes long.", nameof(iv));
            }
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Encoding.UTF8.GetBytes(key);
                aesAlg.IV = ivBytes;

                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msDecrypt = new MemoryStream(Convert.FromBase64String(encryptedText)))
                {
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                        {
                            return srDecrypt.ReadToEnd();
                        }
                    }
                }
            }
             bool TryVerifyBase64String(string base64String)
            {
                try
                {
                    // Attempt to decode the Base64 string
                    byte[] decodedBytes = Convert.FromBase64String(base64String);
                    return true; // If successful, the string is valid Base64
                }
                catch (FormatException)
                {
                    return false; // If an exception occurs, the string is not valid Base64
                }
            }
        }
    }
}
