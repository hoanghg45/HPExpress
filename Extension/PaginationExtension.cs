using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HPExpress.Extension
{
    public class PaginationExtension
    {
        public static (int from, int to) FromTo(int product_count, int page_num)
        {

            int page_from = (page_num - 1) * 10 + 1;
            int page_to = 0;
            if (product_count - page_num * 10 > 0)
            {
                page_to = page_num * 10;
            }
            else
                page_to = product_count;



            return (page_from, page_to);
        }
    }
}
