using System;

namespace API.Extensions
{
    public static class DateExtension
    {
        public static int GetAge(this DateTime dob)
        {
            int age = DateTime.Today.Year - dob.Year;

            if (dob.Date > DateTime.Today.AddYears(-age)) 
                age--;
            
            return age;
        }
    }
}