using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task GetSeed(DataContext context)
        {
            if(await context.Users.AnyAsync())
                return;

            string user = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            List<AppUser> appUsers = JsonSerializer.Deserialize<List<AppUser>>(user);

            foreach (var appUser in appUsers)
            {
                using var hmac = new HMACSHA512();
                appUser.Username = appUser.Username;
                appUser.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                appUser.PasswordSalt = hmac.Key;
                
                context.Add(appUser);
            }

            await context.SaveChangesAsync();
        }
    }
}