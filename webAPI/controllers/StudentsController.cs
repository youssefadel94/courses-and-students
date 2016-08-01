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
using DAL;
using webAPI.Models;
using System.Web.Http.Cors;

namespace webAPI.controllers
{
    [EnableCors(origins: "http://localhost:63396", headers: "*", methods: "*")]
    public class StudentsController : ApiController
    {
       private StudentEntities db = new StudentEntities();

        // GET: api/Students
        public IQueryable<Student> GetStudents()
        {
            
            return db.Students;
        }

        // GET: api/Students/5
        [ResponseType(typeof(Student))]
        public async Task<IHttpActionResult> GetStudent(int id)
        {
         
            Student student = await db.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }

        // PUT: api/Students/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutStudent(int id, Student student)
        {
            StudentEntities db = new StudentEntities();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student.Id)
            {
                return BadRequest();
            }

            var dbStudent = db.Students.FirstOrDefault(o => o.Id == student.Id);

            var once = true;
            foreach (var course in student.Courses)
            {
                var s = db.Courses.FirstOrDefault(o => o.Id == course.Id);
                if (once)
                {
                    dbStudent.Courses.Clear();
                    once = false;
                }
                dbStudent.Courses.Add(s);

            }


            dbStudent.Name = student.Name;
            dbStudent.Year = student.Year;
            dbStudent.Gender = student.Gender;
            dbStudent.Age = student.Age;


            db.Entry(dbStudent).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
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

        // POST: api/Students
        [ResponseType(typeof(Student))]
        public async Task<IHttpActionResult> PostStudent(Student student)
        {
            StudentEntities db = new StudentEntities();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Students.Add(student);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = student.Id }, student);
        }

        // DELETE: api/Students/5
        [ResponseType(typeof(Student))]
        public async Task<IHttpActionResult> DeleteStudent(int id)
        {
            StudentEntities db = new StudentEntities();
            Student student = await db.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            db.Students.Remove(student);
            await db.SaveChangesAsync();

            return Ok(student);
        }

        protected override void Dispose(bool disposing)
        {
            StudentEntities db = new StudentEntities();
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StudentExists(int id)
        {
            StudentEntities db = new StudentEntities();
            return db.Students.Count(e => e.Id == id) > 0;
        }
    }
}