using DogBarberShop.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;


namespace DogBarberShop.DBContexts
{
    public class MyDBContext : DbContext
    {
        public DbSet<QueueData> Queue { get; set; }
        public DbSet<User> Users { get; set; }

        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>().HasData(new User[] {
                new User{UserId=1, Name="iman", UserName="shuk", Password="1234"},
                new User{UserId=2, Name="Alex", UserName="csc", Password="1234"},
                new User{UserId=3, Name="gabi", UserName="asww", Password="1234"},
                new User{UserId=4, Name="mishel", UserName="wer", Password="1234"},
            });
            modelBuilder.Entity<QueueData>().HasData(new QueueData[] {
                new QueueData{
                    Id=1,
                    UserId=1,
                    TimeOfTheQueue="2021-07-26T22:08",
                    CreateAt="2021-07-26T22:08"
                },
                new QueueData{
                    Id=2,
                    UserId=2,
                    TimeOfTheQueue="2021-07-26T22:08",
                    CreateAt="2021-07-26T22:08"
                },
                new QueueData{
                    Id=3,
                    UserId=3,
                    TimeOfTheQueue="2021-07-26T22:08",
                    CreateAt="2021-07-26T22:08"
                },
                new QueueData{
                    Id=4,
                    UserId=4,
                    TimeOfTheQueue="2021-07-26T22:08",
                    CreateAt="2021-07-26T22:08"
                },

            }) ;
        }
    }
}