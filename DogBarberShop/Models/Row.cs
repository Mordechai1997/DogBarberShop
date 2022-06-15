using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShop.Repositories
{
    public class Row
    {
      
        public int queueId { get; set; }
        public string name { get; set; }
        public string userName { get; set; }
        public string TimeOfTheQueue { get; set; }
        public string CreateAt { get; set; }
    }
}
