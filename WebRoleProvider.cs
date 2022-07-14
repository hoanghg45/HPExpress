using HPExpress.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace HPExpress
{
    public class WebRoleProvider : RoleProvider
    {
        public override string ApplicationName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] GetRolesForUser(string username)
        {
            using (var context = new BillManagerDBEntities())
            {
                List<string> rol = new List<string>();
                List<string> per = new List<string>();

                rol = (from user in context.Users
                             join role in context.Roles on user.RoleID equals role.RoleID
                             
                             where user.UserName == username.Trim()
                             select role.RoleName).ToList();

                var x = context.Users.Where(r => r.UserName == username).FirstOrDefault();
                var y = x.Role.Permissions.Select(p => p.PermissionName).ToList();
                
               
                rol.AddRange(y);
                
                return rol.ToArray();
            }
           
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }
    }
}