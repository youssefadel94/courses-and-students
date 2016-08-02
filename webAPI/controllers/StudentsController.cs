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
using BusinessLogic.Managers;
using BusinessLogic;

namespace webAPI.controllers
{
    [EnableCors(origins: "http://localhost:63396", headers: "*", methods: "*")]
    public class StudentsController : ApiController
    {
        //private StudentEntities db = new StudentEntities();

        private StudentsManager manager = new StudentsManager();

        // GET: api/Students
        public IQueryable<Student> GetStudents()
        {

            return manager.GetStudents();
        }

        // GET: api/Students/5
        [ResponseType(typeof(Student))]
        public async Task<IHttpActionResult> GetStudent(int id)
        {

            Student student = await manager.GetStudent(id);
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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student.Id)
            {
                return BadRequest();
            }


            try
            {
                await manager.PutStudent(student);
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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            manager.PostStudent(student);

            return CreatedAtRoute("DefaultApi", new { id = student.Id }, student);
        }

        // DELETE: api/Students/5
        [ResponseType(typeof(Student))]
        public async Task<IHttpActionResult> DeleteStudent(int id)
        {

            Student student = await manager.DeleteStudent(id);
            if (student == null)
            {
                return NotFound();
            }



            return Ok(student);
        }

        protected override void Dispose(bool disposing)
        {

            if (disposing)
            {
                manager.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StudentExists(int id)
        {
            return manager.StudentExists(id);
        }
    }
}