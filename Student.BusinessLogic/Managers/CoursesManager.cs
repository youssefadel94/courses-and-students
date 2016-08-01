using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using System.Web.Http;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;



namespace BusinessLogic.Managers
{
    class CoursesManager
    {

        private StudentEntities db = new StudentEntities() ;
      
        public IQueryable<Cours> GetCourses()
        {
            return db.Courses ;
        }


        public async Task<Cours> GetCours(int id)
        {
            Cours cours = await db.Courses.FindAsync(id);
            

            return cours;
        }


    }
}
