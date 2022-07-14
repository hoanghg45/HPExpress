using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HPExpress.Security
{
    public class HasCredentialAttribute : AuthorizeAttribute
    {
        public string RoleID { get; set; }

             
    }
}