using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HPExpress
{
    public class Test
    {
       public void main()
        {
            string a = BCrypt.Net.BCrypt.HashPassword("123456", 12);
            Console.WriteLine(a);
        }
      
        
    }
}