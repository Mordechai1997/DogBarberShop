using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShop.Models
{
    public class QueueData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int  UserId { get; set; }
        public string TimeOfTheQueue { get; set; }
        public string CreateAt { get; set; }
    }
}
