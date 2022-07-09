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
using HPExpress.Security;
using OfficeOpenXml;
using System.IO;
using System.Drawing;
using OfficeOpenXml.Style;

namespace HPExpress.Controllers
{
    [SessionCheck]
    public class WayBillController : Controller
    {
        
        BillManagerDBEntities _context = new BillManagerDBEntities();
      
        [HttpGet]
        [Route("data")]
        public JsonResult data(int id = 0, int? page = 0, string date = "", string search ="",int dep = 0, int usid =0,int stt =0)
        {

            //int co = _context.Bills.Count();
            DateTime dateFrom = DateTime.Now;
            DateTime dateTo = DateTime.Now;
            var count = _context.Bills.Count();
            //_context.Configuration.ProxyCreationEnabled = false;
            var table = from obj in _context.Bills
                        join se in _context.Transpots on obj.TransID equals se.TransID
                        join pro in _context.ShippingProviders on obj.ProviderID equals pro.ProviderID
                        join us in _context.Users on obj.UserID equals us.UserID
                        join de in _context.Departments on us.DepartmentID equals de.DepartmentID
                        join s in _context.BillStatuses on obj.Status equals s.StatusID
                        select new
                        {
                            Id = obj.BillID.Trim(),
                            Cusinf = obj.CustomerInf.Trim(),
                            UserID = us.UserID,
                            Content = obj.BillContent,
                            ProviderID = pro.ProviderID,
                            ProviderName = pro.ProviderName,
                            DepartmentID = de.DepartmentID,
                            Trans = se.TransName,
                             StatusID = s.StatusID,
                            Package = obj.ProductPakage,
                            Weight = obj.ProductWeight,
                            Dateship = obj.ShipAt,
                            Category =  obj.ProductCategorys.Select(c => c.CatName).ToList()
                        };

            if (date != "") {
                String[] dateSplit = date.Split('-');
                 dateFrom = DateTime.ParseExact(dateSplit[0].Trim(), "dd/MM/yyyy", CultureInfo.InvariantCulture);
                 dateTo = DateTime.ParseExact(dateSplit[1].Trim(), "dd/MM/yyyy", CultureInfo.InvariantCulture);
                dateTo = dateTo.AddHours(23).AddMinutes(59);
            }
            if (id != 0 || date != "" || usid != 0 || dep != 0 ||stt != 0)
            {
                
                table = table.WhereIf(id != 0, t => t.ProviderID == id)
                              .WhereIf(date != "", t => t.Dateship >= dateFrom && t.Dateship <= dateTo)
                              .WhereIf(usid != 0,t => t.UserID == usid)
                              .WhereIf(dep != 0, t => t.DepartmentID == dep)
                              .WhereIf(stt != 0, t => t.StatusID == stt);
            }
            if(search != "")
            {
                
                search = search.Trim();
                table = table.Search(t => t.Id,
                 t => t.ProviderName,
                 t => t.Cusinf,
                 t => t.Content,
                   t => t.Trans,
                   
                   t => t.Weight.ToString(),
                   t => t.Category.FirstOrDefault(c => c.Contains(search))

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
            table = table.OrderByDescending(x => x.Dateship).Skip(start).Take(pageSize);
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
        [HttpPost]
        [AllowAnonymous]

        public JsonResult updateStatus(string id = "")
        {
            try
            {
                if (ModelState.IsValid && id != "")
                {
                    Bill bill = _context.Bills.FirstOrDefault(u => u.BillID == id);
                    if(bill != null)
                    {
                        if (bill.Status == 1)
                        {
                            int stt = _context.BillStatuses.Where(s => s.StatusName.Equals("Đã gửi")).Select(u => u.StatusID).Single();
                            bill.Status = stt;
                            
                            bill.ShipAt = DateTime.Now;
                            _context.SaveChanges();
                            return this.Json(new
                            {
                                status = "success",
                                message = "Thanh đổi trạng thái phiếu " + id + "  thành công!"

                            }, JsonRequestBehavior.AllowGet);
                        }
                        else if(bill.Status == 2)
                        {
                            return this.Json(new
                            {
                                status = "error",
                                message = "Phiếu " + id + " đã được gửi!"
                            }, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            return this.Json(new
                            {
                                status = "error",
                                message = "Phiếu " + id + " chưa được in!"
                            }, JsonRequestBehavior.AllowGet);
                        }
                    }
                    else
                    {
                        // If we got this far, something failed, redisplay form  return this.Json(new
                        return this.Json(new
                        {
                            status = "error",
                            message = "Phiếu " + id + " chưa được lập!"
                        }, JsonRequestBehavior.AllowGet);
                    }



                }
                else
                {
                    // If we got this far, something failed, redisplay form  return this.Json(new
                    return this.Json(new
                    {
                        status = "error",
                        message = "Mã phiếu không hợp lệ"
                    }, JsonRequestBehavior.AllowGet);
                }

            }
            catch(Exception e)
            {
                return this.Json(new
                {
                    status = "error",
                    message = e.Message
                }, JsonRequestBehavior.AllowGet) ;

            }

         
        }
        [HttpPost]

        public JsonResult changeBillID(string oldId, string newID)
        {
            Bill oldbill = _context.Bills.FirstOrDefault(b => b.BillID == oldId);
            if(oldbill != null)
            {

                bool isvalid = _context.Bills.Any(b => b.BillID == newID);
                if (!isvalid)
                {
                    Bill newbill = new Bill()
                        { BillID = newID,
                           BillContent = oldbill.BillContent,
                           
                           CreateAT = oldbill.CreateAT,
                           CustomerInf = oldbill.CustomerInf,
                           PrintAt = oldbill.PrintAt,
                           ShipAt = oldbill.ShipAt,
                           Heigh = oldbill.Heigh,
                           Lenght = oldbill.Lenght,
                           Width = oldbill.Lenght,
                           PaymentID = oldbill.PaymentID,
                           UserID = oldbill.UserID,
                           Note = oldbill.Note,
                           ServiceID = oldbill.ServiceID,
                           ProductPakage = oldbill.ProductPakage,
                           ProviderID = oldbill.ProviderID,
                           TransID = oldbill.TransID,
                           ProductWeight = oldbill.ProductWeight,
                           Status = oldbill.Status
                    };

                    newbill.ProductCategorys = oldbill.ProductCategorys;
                    var temp = newbill.ProductCategorys.ToList();
                    newbill.ProductCategorys = temp;
                    _context.Bills.Add(newbill);
                    _context.Bills.Remove(oldbill);
                    _context.SaveChanges();
                    return this.Json(
                new
                {
                    status = "success",
                    message = "Đổi mã đơn thành công!"
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
                    message = "Mã đơn đã bị trùng vui lòng nhập lại!"
                }
                , JsonRequestBehavior.AllowGet
                );
                }






               
            }
            else
            {
                return this.Json(
         new
         {
             status = "error",
             message = "Phiếu không tồn tại vui lòng kiểm tra lại!!"
         }
         , JsonRequestBehavior.AllowGet
         );
            }



            

        }
        [HttpGet]
       
        public JsonResult filterUser(int id = 0)
        {
            var users = from obj in _context.Users
                      

                       select new
                       {
                          UserID = obj.UserID,
                          UserName = obj.FullName
                       };

            //_context.Configuration.ProxyCreationEnabled = false;
            if (id != 0)
            {
                 users = from obj in _context.Users
                        where obj.DepartmentID == id

                        select new
                        {
                            UserID = obj.UserID,
                            UserName = obj.FullName
                        };
            }
                        
            return this.Json(
         new
         {
             data = users,
         }
         , JsonRequestBehavior.AllowGet
         );

        }

        // GET: WayBill
        [Route("BillList")]
        public ActionResult Index()
        { 
            //List<Bill> lstbills = _context.Bills.ToList();
            List<ShippingProvider> catlst = new List<ShippingProvider>();
            catlst = _context.ShippingProviders.ToList();
            ViewBag.ProvList = catlst;
            List<Department> departlst = new List<Department>();
            departlst = _context.Departments.ToList();
            ViewBag.DepartList = departlst;
            List<User> userlst = new List<User>();
            int currentUserID = (int)Session["UserID"];
            User currUser = _context.Users.FirstOrDefault(u => u.UserID == currentUserID);
            if(currUser.RoleID == 2)
            {
                userlst = _context.Users.Where(u => u.DepartmentID == currUser.DepartmentID).ToList();
            }
            else
            {
                userlst = _context.Users.ToList();
            }
            
            
            ViewBag.UserList = userlst;
            List<BillStatus> statuslst = new List<BillStatus>();
            statuslst = _context.BillStatuses.ToList();
            ViewBag.statuslst = statuslst;

            return View(currUser);
        }
       

        // GET: WayBill/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: WayBill/Create/{id}
        public ActionResult Create(string id)
        {
            //ShippingProvider sp = _context.ShippingProviders.Where(p => p.ProviderName == viewName).FirstOrDefault();
            var idUser = Session["UserID"];
            User user = _context.Users.Find(idUser);
            switch (id)
            {
                case "NetpostView":
                    return View("NetpostView", user);
                case "ViettelPostView":
                    return View("ViettelPostView", user);
                    //case "TasetcoView":
                    //    return View("TasetcoView", user);

                default:
                    // code block
                    break;
            }



            return View("Error");
        }

        // POST: WayBill/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Create(FormCollection collection, string returnUrl)
        {
            try
            {
                // TODO: Add insert logic here
                Bill bill = new Bill();
                Random ran = new Random();
                string id = "bill" + ran.Next();
                if (_context.Bills.Any(b => b.BillID == id ))
                {
                    while (_context.Bills.Any(b => b.BillID == id))
                    {
                        id = "bill" + ran.Next();
                    }
                    bill.BillID = id;
                }
                else { bill.BillID = id; }
                
                
                bill.UserID = Int32.Parse(collection["user_id"]);
                bill.ProviderID = Int32.Parse(collection["prov_id"]) ;
                string cus_inf = collection["customer_name"] + "|" + collection["customer_comp"] + "|" + collection["customer_add"] + "|" + collection["cus_phone"];
                bill.CustomerInf = cus_inf.Trim();
                string cates = collection["CatBox"];
                string[] cate = cates.Split(',');
                List<ProductCategory> catlst = new List<ProductCategory>();
                foreach(var a in cate)
                {
                    int cat = Int16.Parse(a);
                    if (cat == 1)
                    {
                       
                        catlst.Add(_context.ProductCategorys.Where(c => c.CatID == cat).FirstOrDefault());
                    }
                   if (cat == 2)
                    {
                       
                        catlst.Add(_context.ProductCategorys.Where(c => c.CatID == cat).FirstOrDefault());
                    }
                   if (cat == 3)
                    {
                       
                        catlst.Add(_context.ProductCategorys.Where(c => c.CatID == cat).FirstOrDefault());
                    }
                  
                }
             
                bill.ProductCategorys = catlst;
                bill.ProductPakage = Int32.Parse(collection["package_numb"]);

                int stt = _context.BillStatuses.Where(s => s.StatusName.Equals("Chờ In")).Select(u => u.StatusID).Single();
                bill.Status = stt;



                //String date = collection["date"];

                //DateTime tempDate = DateTime.ParseExact(date,"dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);
                DateTime tempDate = DateTime.Now;

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
                return Json(new { status = "success",
                    returnURL = returnUrl
                });
            }
            catch(Exception e)
            {
                
                return Json(new { message = e.ToString() });
            }
        }
        [HttpPost]
        public JsonResult ReadExcelData()
         {
            var bugIndex = 0;
            var excel_data = new List<Bill>();
            var currUser = Session["UserID"].ToString();
            int status = _context.BillStatuses.Single(s => s.StatusName == "Đã gửi").StatusID;
            try
            {
                List<string> dupLst = new List<string>();
                HttpPostedFileBase excelFile = Request.Files["UploadedFile"];
                var package = new ExcelPackage(excelFile.InputStream);

                ExcelWorksheet ws = package.Workbook.Worksheets[0];
                var listInfo = string.Empty;
                for (int rw = 2; rw <= ws.Dimension.End.Row; rw++)
                {
                    bugIndex = rw;
                    var date = ws.Cells[rw, 1].Value;
                    var id = ws.Cells[rw, 2].Value;
                    var weight = ws.Cells[rw, 3].Value;
                    string provider = ws.Cells[rw, 4].Value.ToString();
                    var customer = ws.Cells[rw, 5].Value;
                    string trans = (ws.Cells[rw, 6].Value).ToString();
                    
                    var transpot = _context.Transpots.SingleOrDefault(s => s.Description == trans);
                    var pro = _context.ShippingProviders.SingleOrDefault(s => s.ProviderName == provider);
                    
                    bool check = _context.Bills.Any(b => b.BillID == id.ToString());
                    if (!check)
                    {
                        Bill bill = new Bill
                        {
                            BillID = id.ToString(),
                            CreateAT = DateTime.Parse(date.ToString()),
                            ShipAt = DateTime.Parse(date.ToString()),
                            PrintAt = DateTime.Parse(date.ToString()),
                            ProductWeight = Double.Parse(weight.ToString()),
                            CustomerInf = customer.ToString(),
                            ProviderID = pro.ProviderID,
                            TransID = transpot.TransID,
                            UserID = Int16.Parse(currUser),
                            Status = status

                        };
                        excel_data.Add(bill);
                        _context.Bills.Add(bill);

                    }
                    else
                    {
                        dupLst.Add(id.ToString());
                        return Json(new { status = "error", message = "Dữ liệu ở dòng <b>" + bugIndex + ",</b> có Mã phiếu: <b>" + id.ToString() + "</b> đã tồn tại vui lòng kiểm tra lại" }, JsonRequestBehavior.AllowGet);
                    }


                }

                _context.SaveChanges();

                var returndata = from obj in excel_data
                                 join se in _context.Transpots on obj.TransID equals se.TransID
                                 join pro in _context.ShippingProviders on obj.ProviderID equals pro.ProviderID

                                 select new
                                 {
                                     Id = obj.BillID.Trim(),
                                     Cusinf = obj.CustomerInf.Trim(),
                                     ProviderID = pro.ProviderID,
                                     ProviderName = pro.ProviderName,
                                     Transpot = se.TransName,
                                     Weight = obj.ProductWeight,
                                     Dateship = obj.ShipAt,

                                 };
                int count = returndata.Count();
                return Json(new { status = "success", data = returndata, count = count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = "error", message = "Đã có lỗi khi thêm dữ liệu ở dòng <b>"+bugIndex+",</b> vui lòng kiểm tra lại", des = e.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        
        public void ExportExcel(int id = 0, string date = "", string search = "", int dep = 0, int usid = 0, int stt = 0)
        {
            DateTime dateFrom = DateTime.Now;
            DateTime dateTo = DateTime.Now;
            var count = _context.Bills.Count();
            //_context.Configuration.ProxyCreationEnabled = false;
            var table = from obj in _context.Bills
                        join se in _context.Transpots on obj.TransID equals se.TransID
                        join pro in _context.ShippingProviders on obj.ProviderID equals pro.ProviderID
                        join us in _context.Users on obj.UserID equals us.UserID
                        join de in _context.Departments on us.DepartmentID equals de.DepartmentID
                        join s in _context.BillStatuses on obj.Status equals s.StatusID
                        select new
                        {
                            Id = obj.BillID.Trim(),
                            Cusinf = obj.CustomerInf.Trim(),
                            UserID = us.UserID,
                            UserName = us.UserName,
                            Content = obj.BillContent,
                            ProviderID = pro.ProviderID,
                            ProviderName = pro.ProviderName,
                            DepartmentID = de.DepartmentID,
                            DepartmentName = de.DepartmentName,
                            Trans = se.TransName,
                            StatusID = s.StatusID,
                            Package = obj.ProductPakage,
                            Weight = obj.ProductWeight,
                            Dateship = obj.ShipAt,
                            Category = obj.ProductCategorys.Select(c => c.CatName).ToList()
                        };

            if (date != "")
            {
                String[] dateSplit = date.Split('-');
                dateFrom = DateTime.ParseExact(dateSplit[0].Trim(), "dd/MM/yyyy", CultureInfo.InvariantCulture);
                dateTo = DateTime.ParseExact(dateSplit[1].Trim(), "dd/MM/yyyy", CultureInfo.InvariantCulture);
                dateTo = dateTo.AddHours(23).AddMinutes(59);
            }
            if (id != 0 || date != "" || usid != 0 || dep != 0 || stt != 0)
            {

                table = table.WhereIf(id != 0, t => t.ProviderID == id)
                              .WhereIf(date != "", t => t.Dateship >= dateFrom && t.Dateship <= dateTo)
                              .WhereIf(usid != 0, t => t.UserID == usid)
                              .WhereIf(dep != 0, t => t.DepartmentID == dep);

            }
            if (search != "")
            {

                search = search.Trim();
                table = table.Search(t => t.Id,
                 t => t.ProviderName,
                 t => t.Cusinf,
                 t => t.Content,
                   t => t.Trans,

                   t => t.Weight.ToString(),
                   t => t.Category.FirstOrDefault(c => c.Contains(search))

                                    ).Containing(search);


            }



            table = table.Where(t => t.StatusID == 2).OrderByDescending(x => x.Dateship);
            if (table.Count() > 0)
            {
                ExcelPackage ep = new ExcelPackage();
                ExcelWorksheet Sheet = ep.Workbook.Worksheets.Add("Report");
                Sheet.Cells["A1"].Value = "Ngày gửi";
                Sheet.Cells["B1"].Value = "Mã phiếu";
                Sheet.Cells["C1"].Value = "Người tạo";
                Sheet.Cells["D1"].Value = "Trọng lượng (Kg)";
                Sheet.Cells["E1"].Value = "Đơn vị vận chuyển";
                Sheet.Cells["F1"].Value = "Hình thức vận chuyển";
                Sheet.Cells["G1"].Value = "Khách hàng";
                int row = 2;// dòng bắt đầu ghi dữ liệu
                foreach (var item in table)
                {

                    Sheet.Cells[string.Format("A{0}", row)].Value = item.Dateship.Value.ToString("dd/MM/yyyy");
                    Sheet.Cells[string.Format("B{0}", row)].Value = item.Id;
                    Sheet.Cells[string.Format("C{0}", row)].Value = item.UserName.Trim() + "-" + item.DepartmentName;
                    Sheet.Cells[string.Format("D{0}", row)].Value = item.Weight;
                    Sheet.Cells[string.Format("E{0}", row)].Value = item.ProviderName;
                    Sheet.Cells[string.Format("F{0}", row)].Value = item.Trans;
                    Sheet.Cells[string.Format("G{0}", row)].Value = item.Cusinf;
                    row++;
                }
                Sheet.Cells["A:AZ"].AutoFitColumns();
                // Select only the header cells
                var headerCells = Sheet.Cells[1, 1, 1, Sheet.Dimension.Columns];
                Sheet.View.FreezePanes(2, 1);
                // Set their text to bold, italic and underline.
                headerCells.Style.Font.Bold = true;
                headerCells.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                headerCells.Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.Yellow);

                Response.Clear();
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.AddHeader("content-disposition", "attachment; filename=" + "Report.xlsx");
                Response.BinaryWrite(ep.GetAsByteArray());
                Response.End();

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
                if (bill != null)
                {
                    bill.PrintAt = DateTime.Now;
                    int stt = _context.BillStatuses.Where(s => s.StatusName.Equals("Chờ gửi")).Select(u => u.StatusID).Single();
                    bill.Status = stt;
                    _context.SaveChanges();

                    var cus_inf = bill.CustomerInf.Split('|');
                    string cat1 = bill.ProductCategorys.Any(b => b.CatID == 1) ? "1" : null;
                    string cat2 = bill.ProductCategorys.Any(b => b.CatID == 2) ? "2" : null;
                    var catlst = bill.ProductCategorys.Select(c => c.CatName).ToList();
                    string cat = String.Join(", ", catlst);
                    DateTime? myDate = bill.PrintAt;
                    string printdate = myDate.HasValue ? myDate.Value.ToString("dd/MM/yyyy HH:mm") : "<not available>";
                    switch (bill.ProviderID)
                    {
                        case 1:
                            var modelNetpost = new NetpostViewModels(
                            cus_inf[1],
                            cus_inf[0],
                            cus_inf[2],
                            cus_inf[3],
                             printdate,

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
                            printdate,
                            bill.ProductPakage.ToString(),
                            cat,
                            bill.ProductWeight.ToString(),
                            bill.Lenght is null ? null : bill.Lenght.ToString(),
                            bill.Width is null ? null : bill.Width.ToString(),
                            bill.Heigh is null ? null : bill.Heigh.ToString(),
                            bill.Payment.PaymentName.ToString(),
                            bill.Service is null ? null : bill.Service.ServiceName,
                            bill.BillContent);
                            return Json(modelVietel, JsonRequestBehavior.AllowGet);
                    }

                }
               




                // TODO: Add insert logic here



                return Json(new { message = "Phiếu không tồn tại vui lòng kiểm tra lại!!!", status = 0 }, JsonRequestBehavior.AllowGet); 





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
