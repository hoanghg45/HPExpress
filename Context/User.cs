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
    
    public partial class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            this.Bills = new HashSet<Bill>();
            this.Bills1 = new HashSet<Bill>();
        }
    
        public int UserID { get; set; }
        public Nullable<int> RoleID { get; set; }
        public string UserName { get; set; }
        public string UserPass { get; set; }
        public string UserEmail { get; set; }
        public string UserPhone { get; set; }
        public Nullable<System.DateTime> CreateAt { get; set; }
        public Nullable<int> DepartmentID { get; set; }
        public string FullName { get; set; }
        public Nullable<int> Gender { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<System.DateTime> LastLogin { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Bill> Bills { get; set; }
        public virtual Role Role { get; set; }
        public virtual Department Department { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Bill> Bills1 { get; set; }
    }
}
