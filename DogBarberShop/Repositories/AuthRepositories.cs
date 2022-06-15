using DogBarberShop.DBContexts;
using DogBarberShop.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShop.Repositories
{
    public class AuthRepositories
    {
        private MyDBContext myDbContext;
        public AuthRepositories(MyDBContext context)
        {
            myDbContext = context;
        }
        public User GetUserByID(int id)
        {
            return myDbContext.Users.Find(id);
        }
        public List<User> GetUsersByPassAndUserName(string password, string userName)
        {
            return myDbContext.Users.Where(t => t.UserName == userName && t.Password == password).ToList();
        }
        public List<User> GetUsersByUserName( string userName)
        {
            return myDbContext.Users.Where(t => t.UserName == userName).ToList();
        }
        public void InsertUser(User student)
        {
            myDbContext.Users.Add(student);
        }
        public IEnumerable<User> GetUsers()
        {
            return myDbContext.Users.ToList();
        }
        public void DeleteSUser(int UserId)
        {
            User student = myDbContext.Users.Find(UserId);
            myDbContext.Users.Remove(student);
        }

        public void UpdateStudent(User user)
        {
            myDbContext.Entry(user).State = EntityState.Modified;
        }

        public void Save()
        {
            myDbContext.SaveChanges();
        }
       
        
    }
}
