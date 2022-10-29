using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace technical_test_api_infrastructure.Extensions
{
    public static class StringExtentionMethode
    {
        public static string HashMD5(this string password)
        {
            var md5 = new MD5CryptoServiceProvider();
            byte[] pwd = Encoding.ASCII.GetBytes(password);
            var md5data = md5.ComputeHash(pwd);
            return Convert.ToBase64String(md5data);
        }
    }
}
