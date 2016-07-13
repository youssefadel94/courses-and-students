using System.Web;
using System.Web.Optimization;

namespace Student_Course_Demo
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modern/modernizr-*"));

          
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap/bootstrap.js"));
            bundles.Add(new ScriptBundle("~/bundles/controller").Include(
                     "~/Scripts/controller/MainControllers.js"));
            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                    "~/Scripts/app.js"));
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                   "~/Scripts/angular/angular.min.js",
                   "~/Scripts/angular/angular - route.min.js"));
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap/bootstrap.css",
                      "~/Content/site.css"));
            bundles.Add(new StyleBundle("~/Content/fa").Include(
                      "~/Content/fa/font-awesome.css"));
            
        }
    }
}
