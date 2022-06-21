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

namespace HPExpress.Controllers
{
    //[Authorize]
    public class AccountController : Controller
    {
        private BillManagerDBEntities _context = new BillManagerDBEntities();
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager )
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set 
            { 
                _signInManager = value; 
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login()
        {
           
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public  JsonResult Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return this.Json(
                new
                {
                   status = "error",
                   message = "Đã có lỗi xảy ra vui lòng thử lại123"
                }
                , JsonRequestBehavior.AllowGet
                );
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            User user = _context.Users.Where(u => u.UserName.Equals(model.UserName) && u.UserPass.Equals(model.Password)).FirstOrDefault();
            if(user != null)
            {
                FormsAuthentication.SetAuthCookie(user.UserName, false);
                Session.Add("UserID", user.UserID);
                Session.Add("RoleID", user.RoleID);
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

            return this.Json(
            new
            {
                status = "error",
                message = "Tài khoản hoặc mật khẩu không chính xác"
            }
            , JsonRequestBehavior.AllowGet
            );

        }
        public ActionResult LogOut(int id)
        {
              Session.Remove("UserID");
              Session.Remove("RoleID");
             return RedirectToAction("Login", "Account");

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
            User account = new User();
              account  = _context.Users.FirstOrDefault(p => p.UserID == id);
            
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
                    Phone = account.UserPhone,
                    Gender = account.Gender


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
        [AllowAnonymous]
        public ActionResult CreateAcc()
        {
           int userID = (int)Session["UserID"];
            User currUser = _context.Users.FirstOrDefault(u => u.UserID == userID);
            var lstDep = _context.Departments.ToList();
            ViewBag.lstDep = lstDep;

             var lstRole = _context.Roles.ToList();
            ViewBag.lstRole = lstRole;

            return View(currUser);
        }

        //
        // POST: /Account/CreateAcc
        [SessionCheck]
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public JsonResult CreateAcc(User model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                model.CreateAt = DateTime.Now;
                model.Status = 1;
                _context.Users.Add(model);
                _context.SaveChanges();
                return this.Json(new
                {
                    status = "success",
                    returnURL = returnUrl
                }, JsonRequestBehavior.AllowGet) ;
            }
            else { 
            // If we got this far, something failed, redisplay form
            return this.Json(new
            {
                status = "error",
                
            }, JsonRequestBehavior.AllowGet);
            }
        }
        // POST: /Account/UpdateAcc
        [SessionCheck]
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public JsonResult UpdateAcc(FormCollection collection, string returnUrl)
        {
            if (ModelState.IsValid && collection != null)
            {
                int id = Int32.Parse( collection["modal_userID"]);
                User user = _context.Users.Where(u => u.UserID == id).FirstOrDefault();
                if(user != null) {
                   
                    user.UserName = collection["modal_username"];
                    user.FullName = collection["modal_fullname"];
                    string password = collection["modal_UserPass"];
                    
                    if(password != "")
                    {
                        user.UserPass = password;
                    }
                    user.RoleID = Int32.Parse(collection["modal_RoleID"]);
                    user.DepartmentID = Int32.Parse(collection["modal_DepartmentID"]);
                    user.Gender = Int32.Parse(collection["modal_Gender"]);
                    user.UserEmail =collection["modal_UserEmail"];
                    user.UserPhone =collection["modal_userphone"];
                    
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
        //List User
        [SessionCheck]
        [AllowAnonymous]
        public  ActionResult ListUser()
        {
            int id = (int)Session["UserID"];
            
            var lstDep = _context.Departments.ToList();
            ViewBag.lstDep = lstDep;

            var lstRole = _context.Roles.ToList();
            ViewBag.lstRole = lstRole;
            User user =  _context.Users.Where(u => u.UserID == id).FirstOrDefault();
            return View(user);
        }
        public double calLogin(DateTime lastlogin)
        {
            DateTime now = DateTime.Now;
            double result = now.Subtract(lastlogin).TotalDays;
            if (result < 1)
            {
                result = now.Subtract(lastlogin).TotalHours;
                if (result < 1)
                {
                    result = now.Subtract(lastlogin).TotalMinutes;
                    if (result < 1)
                    {
                        result = 0;

                    }
                }
                   
                    

            }
            return result;
        }

        //get Users Data
        [HttpGet]
        //[SessionCheck]
        public JsonResult Accounts(string search = "",int depart = 0, int role = 0, int page = 0)
        {

           
            

            
            //_context.Configuration.ProxyCreationEnabled = false;
            var table = from obj in _context.Users
                        join ro in _context.Roles on obj.RoleID equals ro.RoleID
                        join de in _context.Departments on obj.DepartmentID equals de.DepartmentID
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
                            Gender= obj.Gender,
                            Status = obj.Status,
                            LastLogin = obj.LastLogin,
                            CreateAt = obj.CreateAt
                        };


            if (role != 0 || depart != 0)
            {

                table = table.WhereIf(role != 0, t => t.RoleID == role)
                              .WhereIf(depart != 0, t => t.DepartmentID == depart);
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
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent:  model.RememberMe, rememberBrowser: model.RememberBrowser);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid code.");
                    return View(model);
            }
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await SignInManager.SignInAsync(user, isPersistent:false, rememberBrowser:false);
                    
                    // For more information on how to enable account confirmation and password reset please visit https://go.microsoft.com/fwlink/?LinkID=320771
                    // Send an email with this link
                    // string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    // await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

                    return RedirectToAction("Index", "Home");
                }
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return View("ForgotPasswordConfirmation");
                }

                // For more information on how to enable account confirmation and password reset please visit https://go.microsoft.com/fwlink/?LinkID=320771
                // Send an email with this link
                // string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                // var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);		
                // await UserManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + callbackUrl + "\">here</a>");
                // return RedirectToAction("ForgotPasswordConfirmation", "Account");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            AddErrors(result);
            return View();
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                    return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = loginInfo.Email });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("Index", "Home");
        }

        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
}