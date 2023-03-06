using System.Text;
using System.Security.Cryptography;

namespace filesync_server.Utils;

internal static class MyHash
{
    internal static String sha256_hash(string value)
    {
        StringBuilder sb = new StringBuilder();

        using (var hash = SHA256.Create())
        {
            Encoding enc = Encoding.UTF8;
            byte[] result = hash.ComputeHash(enc.GetBytes(value));

            foreach (byte b in result)
                sb.Append(b.ToString("x2"));
        }

        return sb.ToString();
    }
}