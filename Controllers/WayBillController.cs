using HPExpress.Context;
using HPExpress.Models;

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Globalization;
using System.Data.Entity.SqlServer;
using HPExpress.Extension;
using NinjaNye.SearchExtensions;

namespace HPExpress.Controllers
{
    public class WayBillController : Controller
    {
        BillManagerDBEntities _context = new BillManagerDBEntities();
        [HttpPost]
        [Route("data")]
        public JsonResult data(int id = 0, int? page = 0, string date = "", string search ="")
        {
            DateTime dateFrom = DateTime.Now;
            DateTime dateTo = DateTime.Now;

            //_context.Configuration.ProxyCreationEnabled = false;
            var table = from obj in _context.Bills
                        join se in _context.Transpots on obj.TransID equals se.TransID
                        join pro in _context.ShippingProviders on obj.ProviderID equals pro.ProviderID
                        
                        select new
                        {
                            Id = obj.BillID.Trim(),
                            Cusinf = obj.CustomerInf.Trim(),
                            Content = obj.BillContent,
                            ProviderID = pro.ProviderID,
                            ProviderName = pro.ProviderName,
                            Trans = se.TransName,
                            Billnum = obj.BillNumber,
                            Package = obj.ProductPakage,
                            Weight = obj.ProductWeight,
                            Dateship = obj.CreateAT,
                            Category =  obj.ProductCategorys.Select(c => c.CatName).ToList()
                        };

            if (date != "") {
                String[] dateSplit = date.Split('-');
                 dateFrom = DateTime.ParseExact(dateSplit[0].Trim(), "dd/MM/yyyy", CultureInfo.InvariantCulture);
                 dateTo = DateTime.ParseExact(dateSplit[1].Trim(), "dd/MM/yyyy", CultureInfo.InvariantCulture);
                dateTo = dateTo.AddHours(23).AddMinutes(59);
            }
            if (id != 0 || date != "")
            {
                
                table = table.WhereIf(id != 0, t => t.ProviderID == id)
                              .WhereIf(date != "", t => t.Dateship >= dateFrom && t.Dateship <= dateTo);
            }
            if(search != "")
            {
                
                search = search.Trim();
                table = table.Search(t => t.Id,
                 t => t.ProviderName,
                 t => t.Cusinf,
                 t => t.Content,
                   t => t.Trans,
                   t => t.Billnum.ToString(),
                   t => t.Weight.ToString(),
                   t => t.Category.FirstOrDefault(c => c.Contains(search))

                                    ).Containing(search);


            }
           
            int pageSize = 3;
            page = (page > 0) ? page : 1;
            int start = (int)(page - 1) * pageSize;

            ViewBag.pageCurrent = page;
            int totalBill = table.Count();
            float totalNumsize = (totalBill / (float)pageSize);
            int numSize = (int)Math.Ceiling(totalNumsize);
            ViewBag.numSize = numSize;
            table = table.OrderByDescending(x => x.Dateship).Skip(start).Take(pageSize);
            
            


            return this.Json(
         new
         {
             data = table,
             pageCurrent = page,
             numSize = numSize,
             total = totalBill,
             size = pageSize
        }
         , JsonRequestBehavior.AllowGet
         );
            
        }

        // GET: WayBill
        public ActionResult Index()
        { 
            List<Bill> lstbills = _context.Bills.ToList();
            List<ShippingProvider> catlst = new List<ShippingProvider>();
            catlst = _context.ShippingProviders.ToList();
            ViewBag.ProvList = catlst;
            
            return View(lstbills);
        }
       

        // GET: WayBill/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: WayBill/Create/{id}
        public ActionResult Create(int id)
        {
            //ShippingProvider sp = _context.ShippingProviders.Where(p => p.ProviderName == viewName).FirstOrDefault();

            switch (id)
            {
                case 1:
                    return View("NetpostView");
                    
                case 2:
                    return View("ViettelPostView");
                case 3:
                    return View("TasetcoView");
                    
                default:
                    // code block
                    break;
            }

          

            return View("Error");
        }

        // POST: WayBill/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here
                Bill bill = new Bill();
                string id = collection["barcode"].Trim();
                if (_context.Bills.Any(b => b.BillID == id ))
                {
                    return Json(new { message = "Mã trùng với 1 phiếu trước đó, vui lòng kiểm tra và thử lại!" });
                }
                else { bill.BillID = collection["barcode"].Trim(); }
                
                
                bill.ProviderID = Int32.Parse(collection["prov_id"]) ;
                string cus_inf = collection["customer_name"] + "|" + collection["customer_comp"] + "|" + collection["customer_add"] + "|" + collection["cus_phone"];
                bill.CustomerInf = cus_inf.Trim();
                List<ProductCategory> catlst = new List<ProductCategory>();
                if (collection["CatBox1"] != null)
                {
                    int cate1 = Int16.Parse(collection["CatBox1"]);
                    catlst.Add(_context.ProductCategorys.Where(a => a.CatID == cate1).FirstOrDefault());
                }
                if (collection["CatBox2"] != null)
                {
                    int cate2 = Int16.Parse(collection["CatBox2"]);
                    catlst.Add(_context.ProductCategorys.Where(a => a.CatID == cate2).FirstOrDefault());
                }
                if (collection["CatBox3"] != null)
                {
                    int cate3 = Int16.Parse(collection["CatBox3"]);
                    catlst.Add(_context.ProductCategorys.Where(a => a.CatID == cate3).FirstOrDefault());
                }
                bill.ProductCategorys = catlst;
                bill.ProductPakage = Int32.Parse(collection["package_numb"]);
                int billnum = Int32.Parse(collection["contract_numb"]);
                if (_context.Bills.Any(b => b.BillNumber == billnum))
                {
                    return Json(new { message = "Số HĐ đã trùng với 1 phiếu trước đó, vui lòng kiểm tra và thử lại" });
                }

                else { bill.BillNumber = billnum ; }
                String date = collection["date"].Replace('.', '/');
                
                DateTime tempDate = DateTime.ParseExact(date,"dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);

                bill.CreateAT = tempDate;
                bill.PaymentID = Int32.Parse(collection["paymentRadios"]);
                
                bill.TransID = Int32.Parse(collection["transRadios"]);
                bill.BillContent = collection["content"];
                bill.ProductWeight = Int32.Parse(collection["pro_wei"]);
                if(collection["serviceRadios"] != null)
                {
                    bill.ServiceID = Int32.Parse(collection["serviceRadios"]);
                }
                if(collection["note"] != null)
                {
                    bill.Note = collection["note"];
                }

                _context.Bills.Add(bill);
                _context.SaveChanges();
                return Json(new { message = "Success" });
            }
            catch(Exception e)
            {
                
                return Json(new { message = e.ToString() });
            }
        }
        //Print
        [HttpPost]
        public JsonResult Print(FormCollection collection)
        {
            try
            {
                
                // TODO: Add insert logic here
                NetpostViewModels models = new NetpostViewModels(
                collection["customer_comp"],
                collection["customer_name"],
                collection["customer_add"],
                collection["customer_phone"],
                collection["date"],
                collection["contract_numb"],
                collection["package_numb"],
                collection["CatBox1"],
                collection["CatBox2"],
                collection["pro_wei"],
                collection["pro_leng"],
                collection["pro_wid"],
                collection["pro_hei"],
                collection["transRadios"],
                collection["paymentRadios"],
                collection["cantshipRadios"],
                collection["serviceRadios"],
                
                collection["content"]


                    );
                return Json(models, JsonRequestBehavior.AllowGet);


            }
            catch
            {
                return Json(collection, JsonRequestBehavior.AllowGet);
            }
        }
        //printByID
        [HttpPost]
        public JsonResult PrintByID(string id)
        {
            try
            {
                
                var bill = _context.Bills.Where(b => b.BillID.Trim().Equals(id)).FirstOrDefault();

                
                
                
                var cus_inf = bill.CustomerInf.Split('|');
                string cat1 = bill.ProductCategorys.Any(b => b.CatID == 1)?"1":null;
                string cat2 = bill.ProductCategorys.Any(b => b.CatID == 2) ? "2" : null;
                var catlst = bill.ProductCategorys.Select(c => c.CatName).ToList();
                string cat = String.Join(", ", catlst);

                switch (bill.ProviderID)
                {
                    case 1:
                  var modelNetpost = new NetpostViewModels(
                  cus_inf[1],
                  cus_inf[0],
                  cus_inf[2],
                  cus_inf[3],
                  bill.CreateAT.ToString("dd/MM/yyyy HH:mm"),
                  bill.BillNumber.ToString(),
                  bill.ProductPakage.ToString(),
                  cat1,
                  cat2,
                  bill.ProductWeight.ToString(),
                  bill.Lenght is null ? null : bill.Lenght.ToString(),
                  bill.Width is null ? null : bill.Width.ToString(),
                  bill.Heigh is null ? null : bill.Heigh.ToString(),
                  bill.TransID.ToString(),
                  bill.PaymentID.ToString(),
                  bill.ProviderID.ToString(),
                  bill.ServiceID is null ? null : bill.ServiceID.ToString(),
                  bill.BillContent);
                        return Json(modelNetpost, JsonRequestBehavior.AllowGet);
                        
                    case 2:
                    var modelVietel = new ViettelPostViewModels(
                    cus_inf[1],
                    cus_inf[0],
                    cus_inf[2],
                    cus_inf[3],
                    bill.CreateAT.ToString("dd/MM/yyyy HH:mm"),
                    bill.BillNumber.ToString(),
                    bill.ProductPakage.ToString(),
                    cat,
                    bill.ProductWeight.ToString(),
                    bill.Lenght is null ? null : bill.Lenght.ToString(),
                    bill.Width is null ? null : bill.Width.ToString(),
                    bill.Heigh is null ? null : bill.Heigh.ToString(),
                    bill.Payment.PaymentName.ToString(),
                    bill.Service.ServiceName is null ? null : bill.Service.ServiceName,
                    bill.BillContent);
                        return Json(modelVietel, JsonRequestBehavior.AllowGet);
                }





                // TODO: Add insert logic here



                return Json(new { message = "Kiểm tra đơn vị vận chuyển!!!" ,status =0 }, JsonRequestBehavior.AllowGet);





            }
            catch(Exception e)
            {
                return Json(new  { message= e.Message }, JsonRequestBehavior.AllowGet);
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
