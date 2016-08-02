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
    public class StudentsManager
    {
        private StudentEntities db = new StudentEntities();
        public IQueryable<Student> GetStudents()
        {
            return db.Students;
        }

        public async Task<Student> GetStudent(int id)
        {
            Student student = await db.Students.FindAsync(id);
            return student;
        }

        public async Task<int> PutStudent(Student student)
        {
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

                throw;

            }
            return 1;

        }

        public async void PostStudent(Student student)
        {
            db.Students.Add(student);
            await db.SaveChangesAsync();
        }

        public async Task<Student> DeleteStudent(int id)
        {
            Student student = await db.Students.FindAsync(id);
            if (student == null)
            {
                return student;
            }

            db.Students.Remove(student);
            await db.SaveChangesAsync();

            return student;
        }



        public void Dispose()
        {
            db.Dispose();
        }

        public bool StudentExists(int id)
        {
           
            return db.Students.Count(e => e.Id == id) > 0;
        }
    }
}
