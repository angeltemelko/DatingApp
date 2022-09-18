using System;
using System.Collections.Generic;

namespace API.Dtos
{
    public class MembersDto
    {
        public string Id { get; set; }
        
        public string UserName { get; set; }
        
        public string PhotoUrl { get; set; }
        
        public int Age { get; set; }
        
        public string KnowAs { get; set; }
        
        public string Gender { get; set; }
        
        public DateTime CreatedOn { get; set; } 
        
        public DateTime LastActive { get; set; } 
        
        public string City { get; set; }
        
        public string Country { get; set; }
        
        public string Introduction { get; set; }
        
        public string Interests { get; set; }
        
        public string LookingFor { get; set; }
        
        public ICollection<PhotoDto> Photos { get; set; }
    }
}