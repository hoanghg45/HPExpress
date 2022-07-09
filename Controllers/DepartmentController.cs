using HPExpress.Context;
using HPExpress.Extension;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HPExpress.Controllers
{
    public class DepartmentController : Controller
    {
        private BillManagerDBEntities db = new BillManagerDBEntities();
        // GET: Department
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Departments(int page = 0)
        {

            var dep = db.Departments.Select(x => new { x.DepartmentID, x.DepartmentName, x.Description, x.Users.Count });
           
            
            int pageSize = 10;
            page = (page > 0) ? page : 1;
            int start = (int)(page - 1) * pageSize;

            ViewBag.pageCurrent = page;
            int totalBill = dep.Count();
            float totalNumsize = (totalBill / (float)pageSize);
            //int numSize = (int)Math.Ceiling(totalNumsize);
            int numSize = (int)Math.Ceiling(totalNumsize);
            ViewBag.numSize = numSize;
            dep = dep.OrderBy(d => d.DepartmentID).Skip(start).Take(pageSize);
            
            var fromto = PaginationExtension.FromTo(totalBill, (int)page, pageSize);

            int from = fromto.Item1;
            int to = fromto.Item2;



            return this.Json(
                    new
                    {
                       
                        data =dep,
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

        // GET: Department/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Department/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Department/Create
        [HttpPost]
        public JsonResult Create(string nameDep)
        {
            try
            {
                // TODO: Add insert logic here
                
                if(!db.Departments.Any(d => d.DepartmentName == nameDep))
                {
                    Department newDep = new Department();
                    newDep.DepartmentName = nameDep;
                    db.Departments.Add(newDep);
                    db.SaveChanges();
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
                        message = "Tên phòng đã tồn tại"
                    }, JsonRequestBehavior.AllowGet);
                }

                
              
            }
            catch
            {
                return this.Json(new
                {
                    status = "error",
                    message = "Tên phòng không hợp lệ"
                }, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Department/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Department/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

       

        // POST: Department/Delete/5
        [HttpPost]
        public JsonResult Delete(int id, bool check = false)
        {
            if (ModelState.IsValid && id != 0)
            {

                Department dep = db.Departments.FirstOrDefault(u => u.DepartmentID == id);

                if (dep != null)
                {
                    bool isvalid = db.Users.Any(u => u.DepartmentID == dep.DepartmentID);
                   

                    if (check == true)
                    {
                        foreach (var bill in db.Bills.Where(b => b.UserID == id).ToList())
                        {
                            db.Bills.Remove(bill);
                        }
                        db.Departments.Remove(dep);
                        db.SaveChanges();
                        return this.Json(new
                        {
                            status = "success",
                            message = "Xóa thành công!"
                        }, JsonRequestBehavior.AllowGet);
                    }
                    if (!isvalid)
                    {
                        db.Departments.Remove(dep);
                        db.SaveChanges();
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
                            message = "Phòng ban này còn có tài khoản trực thuộc, bạn có muốn xóa cùng với các tài khoản liên quan?"

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
    }
}
