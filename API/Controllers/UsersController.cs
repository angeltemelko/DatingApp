using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
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

        [HttpPut]
        public async Task<ActionResult<MemberUpdateDto>> UpdateUser([FromBody] MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userRepository.GetUserByUsernameAsync(username);

            _autoMapper.Map(memberUpdateDto, user);
            
            _userRepository.UpdateUser(user);

            if (await _userRepository.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to update user");
        }
    }
}