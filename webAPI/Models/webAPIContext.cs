using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace webAPI.Models
{
    public class webAPIContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public webAPIContext() : base("name=webAPIContext")
        {
        }

        public System.Data.Entity.DbSet<DAL.Student> Students { get; set; }

        public System.Data.Entity.DbSet<DAL.Cours> Cours { get; set; }
    }
}
