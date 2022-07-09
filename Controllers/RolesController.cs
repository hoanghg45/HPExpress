using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using HPExpress.Context;

namespace HPExpress.Controllers
{
    public class RolesController : Controller
    {
        private BillManagerDBEntities db = new BillManagerDBEntities();

        [HttpGet]
        // GET: Roles
        public JsonResult Roles()
        {

            var permis = db.Permissions.Select(x => new { x.PermissionID, x.PermissionName }).ToList();
            var role = (from ro in db.Roles.Where(x => x.RoleID > 0)
                        
                        select new
                        {
                            idRole = ro.RoleID,
                            
                            nameRole = ro.RoleDesc,

                            Permission= ro.Permissions.Select(c => c.PermissionID).ToList()
                        }
                        ).ToList();
            
            return this.Json(
                new
                {
                    status = "success",
                    data = role,
                    per = permis
                    
                }
                , JsonRequestBehavior.AllowGet
                );

        }
        [HttpPost]
        // GET: Roles
        public JsonResult SetPerbyRole(int roleID, int perID)
        {

            try
            {
                var per = db.Permissions.FirstOrDefault(p => p.PermissionID == perID);
                var role = db.Roles.FirstOrDefault(r => r.RoleID == roleID);
                if (per != null && role != null)
                {
                    var lstper = role.Permissions;
                    if (lstper.Any(l => l.PermissionID == perID))
                    {
                        lstper.Remove(per);
                    }
                    else
                    {
                        lstper.Add(per);

                    }
                    db.SaveChanges();


                    return this.Json(
                        new
                        {
                            status = "success",
                            message = "Thay đổi quyền thành công!"


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
                           message = "Nhóm hoặc quyền không tồn tại!"


                       }
                       , JsonRequestBehavior.AllowGet
                       );
                }
              
            }
            catch(Exception e)
            {

                return this.Json(
                    new
                    {
                        status = "error",
                        message = e.Message


                    }
                    , JsonRequestBehavior.AllowGet
                    ) ;
            }
         

        }
        // GET: Roles
        public ActionResult Index()
        {
            return View(db.Roles.ToList());
        }

        // GET: Roles/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Role role = db.Roles.Find(id);
            if (role == null)
            {
                return HttpNotFound();
            }
            return View(role);
        }

        // GET: Roles/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Roles/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "RoleID,RoleName,RoleDesc,CreateAt,UpdateAt")] Role role)
        {
            if (ModelState.IsValid)
            {
                db.Roles.Add(role);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(role);
        }

        // GET: Roles/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Role role = db.Roles.Find(id);
            if (role == null)
            {
                return HttpNotFound();
            }
            return View(role);
        }

        // POST: Roles/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "RoleID,RoleName,RoleDesc,CreateAt,UpdateAt")] Role role)
        {
            if (ModelState.IsValid)
            {
                db.Entry(role).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(role);
        }

        // GET: Roles/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Role role = db.Roles.Find(id);
            if (role == null)
            {
                return HttpNotFound();
            }
            return View(role);
        }

        // POST: Roles/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Role role = db.Roles.Find(id);
            db.Roles.Remove(role);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
