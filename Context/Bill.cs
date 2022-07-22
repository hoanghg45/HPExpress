//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HPExpress.Context
{
    using System;
    using System.Collections.Generic;
    
    public partial class Bill
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Bill()
        {
            this.ProductCategorys = new HashSet<ProductCategory>();
        }
    
        public string BillID { get; set; }
        public Nullable<int> UserID { get; set; }
        public Nullable<int> ServiceID { get; set; }
        public Nullable<int> PaymentID { get; set; }
        public Nullable<int> ProviderID { get; set; }
        public Nullable<int> TransID { get; set; }
        public string BillContent { get; set; }
        public Nullable<int> ProductPakage { get; set; }
        public Nullable<double> ProductWeight { get; set; }
        public string CustomerInf { get; set; }
        public string Note { get; set; }
        public Nullable<System.DateTime> CreateAT { get; set; }
        public Nullable<int> Heigh { get; set; }
        public Nullable<int> Lenght { get; set; }
        public Nullable<int> Width { get; set; }
        public Nullable<bool> IsReturn { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<System.DateTime> ShipAt { get; set; }
        public Nullable<System.DateTime> PrintAt { get; set; }
        public Nullable<int> OwnerID { get; set; }
        public Nullable<int> ShipBy { get; set; }
        public string Phone { get; set; }
    
        public virtual Payment Payment { get; set; }
        public virtual Service Service { get; set; }
        public virtual ShippingProvider ShippingProvider { get; set; }
        public virtual Transpot Transpot { get; set; }
        public virtual User User { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductCategory> ProductCategorys { get; set; }
        public virtual BillStatus BillStatus { get; set; }
        public virtual User User1 { get; set; }
        public virtual User User2 { get; set; }
    }
}
