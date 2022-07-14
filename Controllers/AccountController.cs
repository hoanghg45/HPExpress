using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using HPExpress.Models;
using HPExpress.Context;
using Newtonsoft.Json;
using System.Text.Json;
using System.Web.Security;
using HPExpress.Security;
using System.Data.Entity;
using HPExpress.Extension;
using NinjaNye.SearchExtensions;
using System.Data.Entity.Validation;

namespace HPExpress.Controllers
{
    //[Authorize]
    public class AccountController : Controller
    {
        private readonly int costHash = 12;
        private BillManagerDBEntities _context = new BillManagerDBEntities();
    

        public AccountController()
        {
        }



        //
        // GET: /Account/Login
        [AllowAnonymous]
        
        public ActionResult Login()
        {
            if(Session["UserID"] != null)
            {
                return RedirectToAction("Index","Home");
            }
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
       
        public JsonResult Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return this.Json(
                new
                {
                    status = "error",
                    message = "Đã có lỗi xảy ra vui lòng thử lại"
                }
                , JsonRequestBehavior.AllowGet
                );
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true

            try
            {
                User user = _context.Users.FirstOrDefault(u => u.UserName.Equals(model.UserName));
                bool isValid = false;
                if (user != null)
                {
                    isValid = BCrypt.Net.BCrypt.Verify(model.Password, user.UserPass.Trim());
                }

                if (user != null && isValid)
                {

                    if (user.Status != 1)
                    {
                        FormsAuthentication.SetAuthCookie(user.UserName, false);
                        Session.Add("UserID", user.UserID);
                        Session.Add("RoleID", user.RoleID);
                        Session.Add("Role", user.Role.RoleName);
                        user.LastLogin = DateTime.Now;

                        _context.SaveChanges();



                        return this.Json(
                       new
                       {
                           returnURL = "/Home",
                           status = "success",
                           message = "Đăng nhập thành công"
                       }
                       , JsonRequestBehavior.AllowGet
                       );
                    }
                    else
                    {
                        return this.Json(
                       new
                       {

                           status = "error",
                           message = "Tài khoản của bạn đã bị hạn chế bởi quản trị viên, vui lòng liên hệ và đăng nhập lại!"
                       }
                       , JsonRequestBehavior.AllowGet
                       );
                    }

                }

                return this.Json(
                new
                {
                    status = "error",
                    message = "Tài khoản hoặc mật khẩu không chính xác"
                }
                , JsonRequestBehavior.AllowGet
                );
            }
            catch (DbEntityValidationException e)
            {
                Console.WriteLine(e);
            }
            return this.Json(
               new
               {
                   status = "error",
                   message = "Đã gặp sự cố hệ thống, vui lòng thử lại"
               }
               , JsonRequestBehavior.AllowGet
               );


        }
        public ActionResult LogOut()
        {
            Session.Remove("UserID");
            Session.Remove("RoleID");
            Session.Remove("Role");
            return RedirectToAction("Login", "Account");

        }

        public void RefreshSession()
        {
            var userid = Session["UserID"];
            var roleid = Session["RoleID"];
            var role = Session["Role"];

            if (userid != null && roleid != null)
            {
                Session.Remove("UserID");
                Session.Remove("RoleID");
                Session.Remove("Role");
            }
            Session.Add("UserID", userid);
            Session.Add("RoleID", roleid);
            Session.Add("Role", role);

        }





        [HttpGet]
        [SessionCheck]
        public JsonResult DetailAccount(int id)
        {
            //var account = from obj in _context.Users
            //            join ro in _context.Roles on obj.RoleID equals ro.RoleID
            //            join de in _context.Departments on obj.DepartmentID equals de.DepartmentID

            //            select new
            //            {
            //                Id = obj.UserID,
            //                Name = obj.UserName,
            //                FullName = obj.FullName,

            //            };
            
           var account = _context.Users.FirstOrDefault(p => p.UserID == id);

            if (account != null)
            {
                return this.Json(new
                {
                    status = "success",
                    Id = account.UserID,
                    Name = account.UserName.Trim(),
                    FullName = account.FullName.Trim(),
                    RoleID = account.RoleID,
                    Role = account.Role.RoleDesc,
                    Department = account.Department.DepartmentName,
                    DepartmentID = account.DepartmentID,
                    Email = account.UserEmail.Trim(),
                    Phone = account.UserPhone.Trim(),
                    Gender = account.Gender,
                    Per = account.Role.Permissions.Select(p => p.PermissionName).ToList()


                }, JsonRequestBehavior.AllowGet) ;
            }
            else
            {
                return this.Json(new
                {
                    status = "error",
                }, JsonRequestBehavior.AllowGet);
            }


        }
        [SessionCheck]
        [Authorize(Roles = "Admin")]
        public ActionResult CreateAcc()
        {
            int userID = (int)Session["UserID"];
            User currUser = _context.Users.FirstOrDefault(u => u.UserID == userID);
            var lstDep = _context.Departments.ToList();
            ViewBag.lstDep = lstDep;

            var lstRole = _context.Roles.ToList();
            if (_context.Users.Count(u => u.RoleID == 1) > 0)
            {
                lstRole.RemoveAt(0);
            }
            ViewBag.lstRole = lstRole;

            return View(currUser);
        }

        //
        // POST: /Account/CreateAcc
        [SessionCheck]
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        [Route("CreateAcc")]
        public JsonResult CreateAcc(User model, string returnUrl)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    var check = _context.Users.Any(u => u.UserName == model.UserName);
                    if (!check)
                    {
                        model.CreateAt = DateTime.Now;
                        model.Status = 2;
                        model.UserPass = BCrypt.Net.BCrypt.HashPassword(model.UserPass, costHash);
                        _context.Users.Add(model);
                        _context.SaveChanges();
                        return this.Json(new
                        {
                            status = "success",
                            returnURL = returnUrl
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return this.Json(new
                        {
                            status = "error",
                            message = "Tên tài khoản đã có người sử dụng, vui lòng thay đổi"
                        }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    // If we got this far, something failed, redisplay form
                    return this.Json(new
                    {
                        status = "error",

                    }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (DbEntityValidationException e)
            {
                Console.WriteLine(e);
            }
            return this.Json(new
            {
                status = "error",

            }, JsonRequestBehavior.AllowGet);
        }
        // POST: /Account/UpdateAcc
        [SessionCheck]
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public JsonResult UpdateAcc(FormCollection collection, string returnUrl)
        {
            if (ModelState.IsValid && collection != null)
            {
                int id = Int32.Parse(collection["modal_userID"]);
                User user = _context.Users.Where(u => u.UserID == id).FirstOrDefault();
                if (user != null)
                {

                    user.UserName = collection["modal_username"];
                    user.FullName = collection["modal_fullname"];
                    string password = collection["modal_UserPass"];

                    if (password != "")
                    {
                        user.UserPass = BCrypt.Net.BCrypt.HashPassword(password, costHash);
                    }
                    if (collection["modal_RoleID"] != null)
                    {
                        user.RoleID = Int32.Parse(collection["modal_RoleID"]);
                    }
                    if (collection["modal_DepartmentID"] != null)
                    {
                        user.DepartmentID = Int32.Parse(collection["modal_DepartmentID"]);
                    }

                    user.Gender = Int32.Parse(collection["modal_Gender"]);
                    user.UserEmail = collection["modal_UserEmail"];
                    user.UserPhone = collection["modal_userphone"];

                    _context.SaveChanges();
                    return this.Json(new
                    {
                        status = "success",
                        returnURL = returnUrl
                    }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return this.Json(new
                    {
                        status = "error",

                    }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                // If we got this far, something failed, redisplay form  return this.Json(new
                return this.Json(new
                {
                    status = "error",

                }, JsonRequestBehavior.AllowGet);
            }
        }
        [SessionCheck]
        [HttpPost]
        [AllowAnonymous]
        [Authorize(Roles = "Admin")]
        public JsonResult updateStatus(int id = 0)
        {
            if (ModelState.IsValid && id != 0)
            {

                User user = _context.Users.FirstOrDefault(u => u.UserID == id);
                if (user != null)
                {

                    if (user.Status == 1)
                    {
                        user.Status = 2;
                    }
                    else
                    {
                        user.Status = 1;
                    }
                    _context.SaveChanges();
                    return this.Json(new
                    {
                        status = "success",

                    }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return this.Json(new
                    {
                        status = "error",

                    }, JsonRequestBehavior.AllowGet);
                }

            }
            else
            {
                // If we got this far, something failed, redisplay form  return this.Json(new
                return this.Json(new
                {
                    status = "error",

                }, JsonRequestBehavior.AllowGet);
            }
        }


        [SessionCheck]
        [HttpPost]
        [Authorize(Roles = "Admin")]

        public JsonResult DeleteAccount(int id = 0, bool check = false)
        {
            if (ModelState.IsValid && id != 0)
            {

                User user = _context.Users.FirstOrDefault(u => u.UserID == id);

                if (user != null)
                {
                    int countBill = _context.Bills.Count(b => b.UserID == id);
                    if (check == true)
                    {
                        foreach (var bill in _context.Bills.Where(b => b.UserID == id).ToList())
                        {
                            _context.Bills.Remove(bill);
                        }
                        _context.Users.Remove(user);
                        _context.SaveChanges();
                        return this.Json(new
                        {
                            status = "success",
                            message = "Xóa thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    if (countBill < 1)
                    {
                        _context.Users.Remove(user);
                        _context.SaveChanges();
                        return this.Json(new
                        {
                            status = "success",
                            message = "Xóa thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return this.Json(new
                        {
                            status = "warning",
                            message = "Tài khoản này có liên quan đến dữ liệu phiếu gửi, bạn có muốn xóa tài khoản cùng các dữ liệu liên quan!"

                        }, JsonRequestBehavior.AllowGet);
                    }

                }



                else
                {
                    return this.Json(new
                    {
                        status = "error",
                        message = "Tài khoản không tồn tại vui lòng kiểm tra lại!"
                    }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                // If we got this far, something failed, redisplay form  return this.Json(new
                return this.Json(new
                {
                    status = "error",
                    message = "Hệ thống đã gặp lỗi!"
                }, JsonRequestBehavior.AllowGet);
            }
        }
        //List User
        [SessionCheck]
        [AllowAnonymous]
        public ActionResult ListUser()
        {
            int id = (int)Session["UserID"];

            var lstDep = _context.Departments.ToList();
            ViewBag.lstDep = lstDep;

            var lstRole = _context.Roles.ToList();

            ViewBag.lstRole = lstRole;

            User user = _context.Users.Where(u => u.UserID == id).FirstOrDefault();
            return View(user);
        }

        [HttpGet]
        [SessionCheck]

        public JsonResult filterRoleByDepart(int id, int idUser = 0)
        {
            var roles = _context.Roles.Select(x => new { x.RoleID, x.RoleDesc, x.RoleName }).ToList();
            var dep = _context.Departments.FirstOrDefault(d => d.DepartmentID == id);
            if (dep.DepartmentName.Equals("BỘ PHẬN KHO XƯỞNG") || dep.DepartmentName.Equals("HÀNH CHÍNH NHÂN SỰ") || dep.DepartmentName.Equals("SALES ADMIN"))
            {
                roles = roles.ToList();
            }
            else
            {
                var e = roles.Where(z => z.RoleName == "BillManager").Single();
                roles.Remove(e);
                var user = _context.Users.FirstOrDefault(u => u.UserID == idUser);

                //bool countAdmin = _context.Users.Any(u => u.RoleID == 1);
                bool countManager = _context.Users.Any(u => u.Role.RoleName == "Manager" && u.DepartmentID == id);
                var manager = roles.Where(m => m.RoleName == "Manager");
                if (user != null)
                {
                    //if (countAdmin && user.Role.RoleName != "Admin")
                    //{
                    //    roles.RemoveAt(0);
                    //}
                    if (countManager && user.Role.RoleName != "Manager")
                    {
                        roles = roles.Except(manager).ToList();
                    }
                }
                else
                {
                    //if (countAdmin)
                    //{
                    //    roles.RemoveAt(0);
                    //}
                    if (countManager)
                    {
                        roles = roles.Except(manager).ToList();
                    }
                }



                var hc = roles.Where(r => r.RoleName == "HC/K").ToList();
                roles = roles.Except(hc).ToList();

                //_context.Configuration.ProxyCreationEnabled = false;


            }
            return this.Json(
             new
             {
                 data = roles,
             }
             , JsonRequestBehavior.AllowGet
             );

        }
        //get Users Data
        [HttpGet]
        //[SessionCheck]
        public JsonResult Accounts(string search = "", int depart = 0, int role = 0, int stt = 0, int id = 0, int page = 0)
        {





            //_context.Configuration.ProxyCreationEnabled = false;
            var table = from obj in _context.Users
                        join ro in _context.Roles on obj.RoleID equals ro.RoleID
                        join de in _context.Departments on obj.DepartmentID equals de.DepartmentID
                        where obj.UserID != id
                        select new
                        {
                            Id = obj.UserID,
                            Name = obj.UserName.Trim(),
                            FullName = obj.FullName.Trim(),
                            Role = ro.RoleDesc.Trim(),
                            RoleID = ro.RoleID,
                            Department = de.DepartmentName.Trim(),
                            DepartmentID = de.DepartmentID,
                            Email = obj.UserEmail.Trim(),
                            Phone = obj.UserPhone,
                            Gender = obj.Gender,
                            Status = obj.Status,
                            LastLogin = obj.LastLogin,
                            CreateAt = obj.CreateAt
                        };


            if (role != 0 || depart != 0 || stt != 0)
            {

                table = table.WhereIf(role != 0, t => t.RoleID == role)
                              .WhereIf(depart != 0, t => t.DepartmentID == depart)
                              .WhereIf(stt != 0, t => t.Status == stt);
            }
            if (search != "")
            {

                search = search.Trim();
                table = table.Search(t => t.Id.ToString(),
                 t => t.Name,
                 t => t.FullName,
                 t => t.Role,
                   t => t.Department,
                   t => t.Email,
                   t => t.Phone
                   ).Containing(search);


            }

            int pageSize = 10;
            page = (page > 0) ? page : 1;
            int start = (int)(page - 1) * pageSize;

            ViewBag.pageCurrent = page;
            int totalBill = table.Count();
            float totalNumsize = (totalBill / (float)pageSize);
            int numSize = (int)Math.Ceiling(totalNumsize);
            ViewBag.numSize = numSize;
            table = table.OrderByDescending(x => x.CreateAt).Skip(start).Take(pageSize);
            var fromto = PaginationExtension.FromTo(totalBill, (int)page, pageSize);

            int from = fromto.Item1;
            int to = fromto.Item2;


            return this.Json(
         new
         {
             data = table,
             pageCurrent = page,
             numSize = numSize,
             total = totalBill,
             size = pageSize,
             from = from,
             to = to

         }
         , JsonRequestBehavior.AllowGet
         );


        }
        [SessionCheck]
        [AllowAnonymous]
        public ActionResult userProfile()
        {
            int id = (int)Session["UserID"];


            User user = _context.Users.Where(u => u.UserID == id).FirstOrDefault();
            return View(user);
        }
        [SessionCheck]
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public JsonResult UpdateProfile(FormCollection collection, string returnUrl)
        {
            if (ModelState.IsValid && collection != null)
            {
                int id = Int32.Parse(collection["userid"]);
                User user = _context.Users.Where(u => u.UserID == id).FirstOrDefault();
                if (user != null)
                {
                    if (Int32.Parse(collection["type"]) == 0)
                    {
                        user.UserName = collection["username"];
                        user.FullName = collection["fullname"];
                        user.Gender = Int32.Parse(collection["Gender"]);
                        user.UserEmail = collection["useremail"];
                        user.UserPhone = collection["userphone"];
                        _context.SaveChanges();
                        return this.Json(new
                        {
                            status = "success",
                            returnURL = returnUrl
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        string oldpass = collection["oldpass"];
                        bool isvalid = BCrypt.Net.BCrypt.Verify(oldpass, user.UserPass.Trim());
                        if (isvalid)
                        {
                            string newpass = BCrypt.Net.BCrypt.HashPassword(collection["newpass"]);
                            user.UserPass = newpass;
                            _context.SaveChanges();
                            return this.Json(new
                            {
                                status = "success",
                                returnURL = returnUrl
                            }, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            return this.Json(new
                            {
                                status = "error",
                                message = "Mật khẩu hiện tại không chính xác, vui lòng nhập lại!"
                            }, JsonRequestBehavior.AllowGet);
                        }


                    }



                }
                else
                {
                    return this.Json(new
                    {
                        status = "error",

                    }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                // If we got this far, something failed, redisplay form  return this.Json(new
                return this.Json(new
                {
                    status = "error",

                }, JsonRequestBehavior.AllowGet);
            }
        }
        // GET: /Account/VerifyCode
    }
}