using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HPExpress.Startup))]
namespace HPExpress
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
