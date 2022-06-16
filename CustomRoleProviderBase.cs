namespace HPExpress.Models
{
    public class CustomRoleProviderBase
    {
        public override string[] GetRolesForUser(string name)
        {
            // tạo biến getrole, so sánh xem UserID đang đăng nhập có giống với tên trong db ko
            User account = db.Users.Single(x => x.UserID.Equals(name));
            if (account != null) // Nếu giống
            {
                return new String[] { account.Role.RoleName };
            }
            else
                return new String[] { };
        }
    }
}