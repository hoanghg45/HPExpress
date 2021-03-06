using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace HPExpress
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                name: "data",
                url: "api/data/{id}/{date}/{search}",
                defaults: new { controller = "WayBill", action = "data", id = UrlParameter.Optional, date = UrlParameter.Optional, search = UrlParameter.Optional }
                
                );
            routes.MapRoute(
              name: "CreateAcc",
              url: "CreateAccount",
              defaults: new { controller = "Account", action = "CreateAcc" }

              );
            routes.MapRoute(
                 name: "BillList",
                 url: "Waybill/BillList",
                 defaults: new { controller = "WayBill", action = "Index" }

                 );


            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
