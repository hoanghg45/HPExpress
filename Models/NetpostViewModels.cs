using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HPExpress.Models
{
    public class NetpostViewModels
    {
        

        public string customer_comp { get; set; }
        public string customer_name { get; set; }
        public string customer_address { get; set; }
        public string customer_phone { get; set; }  
        public string date { get; set; }
       
        public string package_numb { get; set; }
        public string cate1 { get; set; }
        public string cate2 { get; set; }
        public string pro_wei { get; set; }
        public string pro_leng { get; set; }
        public string pro_wid { get; set; }
        public string pro_hei { get; set; }
        public string trans { get; set; }
        public string payment { get; set; }
        public string provider_id { get; set; }
        public string service { get; set; }
        
        public string bill_content { get; set; }

        public NetpostViewModels(string customer_comp, string customer_name, string customer_address, string customer_phone, string date, string package_numb, string cate1, string cate2, string pro_wei, string pro_leng, string pro_wid, string pro_hei, string trans, string payment, string provider_id, string service, string bill_content)
        {
            this.customer_comp = customer_comp;
            this.customer_name = customer_name;
            this.customer_address = customer_address;
            this.customer_phone = customer_phone;
            this.date = date;
            this.package_numb = package_numb;
            this.cate1 = cate1;
            this.cate2 = cate2;
            this.pro_wei = pro_wei;
            this.pro_leng = pro_leng;
            this.pro_wid = pro_wid;
            this.pro_hei = pro_hei;
            this.trans = trans;
            this.payment = payment;
            this.provider_id = provider_id;
            this.service = service;
            this.bill_content = bill_content;
        }
    }
}