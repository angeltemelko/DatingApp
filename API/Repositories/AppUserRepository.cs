using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public AppUserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void UpdateUser(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        
        public async Task<IEnumerable<MembersDto>> GetMembersAsync()
        {
            return await _context.Users
                .ProjectTo<MembersDto>(_mapper.ConfigurationProvider).ToListAsync();

        }

        public async Task<MembersDto> GetMembersByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ProjectTo<MembersDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x=> x.Username == username);
        }
    }
}