using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IAppUserRepository _userRepository;
        private readonly IMapper _autoMapper;

        public UsersController(IAppUserRepository userRepository, 
            IMapper autoMapper)
        {
            _userRepository = userRepository;
            _autoMapper = autoMapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MembersDto>>> GetUsers()
        {
            return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet]
        [Route("{username}")]
        public async Task<ActionResult<MembersDto>> GetUser([FromRoute] string username)
        {

            return await _userRepository.GetMembersByUsernameAsync(username);
        }
    }
}