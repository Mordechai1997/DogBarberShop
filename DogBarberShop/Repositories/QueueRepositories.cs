using Consul;
using DogBarberShop.DBContexts;
using DogBarberShop.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShop.Repositories
{
    public class QueueRepositories
    {
        private MyDBContext myDbContext;
        public QueueRepositories(MyDBContext context)
        {
            myDbContext = context;
        }

        public Object GetAllQueues()
        {
            return (from queue in myDbContext.Queue
                       from user in myDbContext.Users
                       where queue.UserId == user.UserId
                       select new
                         {
                            queueId = queue.Id,
                            name = user.Name,
                            userName = user.UserName,
                            createAt = queue.CreateAt,
                            timeOfTheQueue = queue.TimeOfTheQueue
                         });

        }
        public void UpdateQueue(QueueData queue)
        {
            myDbContext.Entry(queue).State = EntityState.Modified;
        }
        public void DeleteQueue(QueueData queue)
        {
            QueueData removeQueue = new QueueData() { Id = queue.Id };
            myDbContext.Queue.Attach(removeQueue);
            myDbContext.Queue.Remove(removeQueue);
        }
       
        public void AddQueue(QueueData queue)
        {
                myDbContext.Queue.Add(queue);
                myDbContext.SaveChanges();
        
        }
        public QueueData GetQueueByUserId(int id)
        {
            return myDbContext.Queue.FirstOrDefault(t => t.UserId == id);
        }
        public QueueData GetQueueById(int id)
        {
            return myDbContext.Queue.FirstOrDefault(item => item.Id == id);
        }
        public void Save()
        {
            myDbContext.SaveChanges();
        }
    }
}
