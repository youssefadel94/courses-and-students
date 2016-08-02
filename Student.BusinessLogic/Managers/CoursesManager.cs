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




namespace BusinessLogic
{
    class CoursesManager
    {

        private StudentEntities db = new StudentEntities();

        public IQueryable<Cours> GetCourses()
        {
            return db.Courses;
        }


        public async Task<Cours> GetCours(int id)
        {
            Cours cours = await db.Courses.FindAsync(id);


            return cours;
        }

        public async Task<int> PutCours(int id, Cours cours)
        {


            var dbCours = db.Courses.FirstOrDefault(o => o.Id == cours.Id);

            var once = true;
            foreach (var student in cours.Students)
            {

                var s = db.Students.FirstOrDefault(o => o.Id == student.Id);
                if (once)
                {
                    dbCours.Students.Clear();
                    once = false;
                }
                dbCours.Students.Add(s);

            }

            dbCours.Name = cours.Name;
            dbCours.Level = cours.Level;
            //dbCours.Students = cours.Students;

            db.Entry(dbCours).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoursExists(id))
                {
                    return 1;
                }
                else
                {
                    throw;
                }
            }
            return 1;
            
        }


       

        private bool CoursExists(int id)
        {
            return db.Courses.Count(e => e.Id == id) > 0;
        }

    }
}
