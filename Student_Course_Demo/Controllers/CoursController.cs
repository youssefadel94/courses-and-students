using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Student_Course_Demo;

namespace Student_Course_Demo.Controllers
{
    public class CoursController : ApiController
    {
        private StudentEntities db = new StudentEntities();

        // GET: api/Cours
        public IQueryable<Cours> GetCourses()
        {
            return db.Courses;
        }

        // GET: api/Cours/5
        [ResponseType(typeof(Cours))]
        public async Task<IHttpActionResult> GetCours(int id)
        {
            Cours cours = await db.Courses.FindAsync(id);
            if (cours == null)
            {
                return NotFound();
            }

            return Ok(cours);
        }

        // PUT: api/Cours/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCours(int id, Cours cours)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cours.Id)
            {
                return BadRequest();
            }
            var dbCours = db.Courses.FirstOrDefault(o => o.Id == cours.Id);

            var once = true;
            foreach(var student in cours.Students)
            {

                var s = db.Students.FirstOrDefault(o => o.Id == student.Id);
                if (once) { 
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
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Cours
        [ResponseType(typeof(Cours))]
        public async Task<IHttpActionResult> PostCours(Cours cours)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Courses.Add(cours);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = cours.Id }, cours);
        }

        // DELETE: api/Cours/5
        [ResponseType(typeof(Cours))]
        public async Task<IHttpActionResult> DeleteCours(int id)
        {
            Cours cours = await db.Courses.FindAsync(id);
            if (cours == null)
            {
                return NotFound();
            }

            db.Courses.Remove(cours);
            await db.SaveChangesAsync();

            return Ok(cours);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CoursExists(int id)
        {
            return db.Courses.Count(e => e.Id == id) > 0;
        }
    }
}