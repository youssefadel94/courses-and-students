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
    public class CoursController : ApiController
    {
      // private StudentEntities db = new StudentEntities();
        private CoursesManager manager = new CoursesManager();
           
        // GET: api/Cours
        public IQueryable<Cours> GetCours()
        {
            return manager.GetCourses();  
        }

        // GET: api/Cours/5
        [ResponseType(typeof(Cours))]
        public async Task<IHttpActionResult> GetCours(int id)
        {
            Cours cours = await manager.GetCours(id);
            if (cours == null)
            {
                return NotFound();
            }

            return Ok(cours);
        }

        // PUT: api/Cours/5
        [ResponseType(typeof(void))]
        [Route("api/InsertCourses/{id}/{cours}")]
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

           // int result = 0;

            try
            {
              await manager.PutCours( cours);
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

            manager.PostCours(cours);

            return CreatedAtRoute("DefaultApi", new { id = cours.Id }, cours);
        }

        // DELETE: api/Cours/5
        [ResponseType(typeof(Cours))]
        public async Task<IHttpActionResult> DeleteCours(int id)
        {
            Cours cours = await manager.DeleteCours(id);
            if (cours == null)
            {
                return NotFound();
            }

           

            return Ok(cours);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                manager.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CoursExists(int id)
        {
            return manager.CoursExists(id);
        }
    }
}