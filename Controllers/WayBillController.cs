using HPExpress.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HPExpress.Controllers
{
    public class WayBillController : Controller
    {
        BillManagerDBEntities _context;
       
        // GET: WayBill
        public ActionResult Index()
        {
            return View();
        }

        // GET: WayBill/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: WayBill/Create/{id}
        public ActionResult Create(int ?id)
        {
            if(id == 1)
            {
                return View("NetpostView");
            }

            return View("Error");
        }

        // POST: WayBill/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here
                

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: WayBill/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: WayBill/Edit/5
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

        // GET: WayBill/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: WayBill/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
