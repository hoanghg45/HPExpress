using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HPExpress.Models
{
    public class NetpostViewModels
    {
        public NetpostViewModels(string cusomer_comp, string cusomer_name, string cusomer_address, string cusomer_phone, string date, string contract_numb, string package_numb, string cate1, string cate2, string pro_wei, string pro_leng, string pro_wid, string pro_hei, string trans, string payment, string cantship, string service1, string service2)
        {
            this.cusomer_comp = cusomer_comp;
            this.cusomer_name = cusomer_name;
            this.cusomer_address = cusomer_address;
            this.cusomer_phone = cusomer_phone;
            this.date = date;
            this.contract_numb = contract_numb;
            this.package_numb = package_numb;
            this.cate1 = cate1;
            this.cate2 = cate2;
            this.pro_wei = pro_wei;
            this.pro_leng = pro_leng;
            this.pro_wid = pro_wid;
            this.pro_hei = pro_hei;
            this.trans = trans;
            this.payment = payment;
            this.cantship = cantship;
            this.service1 = service1;
            this.service2 = service2;
        }

        public string cusomer_comp { get; set; }
        public string cusomer_name { get; set; }
        public string cusomer_address { get; set; }
        public string cusomer_phone { get; set; }  
        public string date { get; set; }
        public string contract_numb { get; set; }
        public string package_numb { get; set; }
        public string cate1 { get; set; }
        public string cate2 { get; set; }
        public string pro_wei { get; set; }
        public string pro_leng { get; set; }
        public string pro_wid { get; set; }
        public string pro_hei { get; set; }
        public string trans { get; set; }
        public string payment { get; set; }
        public string cantship { get; set; }
        public string service1 { get; set; }
        public string service2 { get; set; }

       
    }
}