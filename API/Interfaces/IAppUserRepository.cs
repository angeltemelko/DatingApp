using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;

namespace API.Interfaces
{
    public interface IAppUserRepository
    {
        public void UpdateUser(AppUser user);

        public Task<bool> SaveAllAsync();

        public Task<AppUser> GetUserByUsernameAsync(string username);

        public Task<IEnumerable<MembersDto>> GetMembersAsync();
        
        public Task<MembersDto> GetMembersByUsernameAsync(string username);
    }
}