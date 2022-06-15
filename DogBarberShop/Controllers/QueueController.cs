using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using DogBarberShop.DBContexts;
using System.Linq;
using System;
using DogBarberShop.Models;
using System.Collections.Generic;
using NLog;
using DogBarberShop.Repositories;

namespace DogBarberShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QueueController : ControllerBase
    {
        private MyDBContext myDbContext;
        private static Logger logger;
        private QueueRepositories queueRepositories;

        public QueueController(MyDBContext context)
        {
            myDbContext = context;
            logger = LogManager.GetCurrentClassLogger();
            queueRepositories = new QueueRepositories(context);

        }

        [HttpGet("get-all-queues")]
        public ActionResult GetAllQueues()
        {
            try
            {
                var result = queueRepositories.GetAllQueues();
                logger.Info("Fetching all the Queues from the storage");
                return Ok(result);
            }
            catch (Exception m)
            {
                logger.Error($"Something went wrong: {m}");
                return StatusCode(500, m.Message);
            }
        }
        [HttpPost("update-queue")]
        public ActionResult UpdateQueue(QueueData queue)
        {
            try
            {
                var entity = queueRepositories.GetQueueById( queue.Id);
                if (entity != null)
                {
                    entity.TimeOfTheQueue = queue.TimeOfTheQueue;
                    queueRepositories.UpdateQueue(entity);
                    queueRepositories.Save();
                    logger.Info($"Update queue to {queue.TimeOfTheQueue}");
                    return Ok(new { IsUpdate = true, data = entity });

                }
                logger.Info($"Try update queue to {queue.TimeOfTheQueue}");
                return Ok(new { IsUpdate = false, ErrorMessage = "No existing queue found" });
            }
            catch (Exception m)
            {
                
                logger.Error($"Something went wrong: {m}");
                return StatusCode(500, m.Message);
            }
        }
        [HttpPost("delete-queue")]
        public ActionResult DeleteQueue(QueueData queue)
        {
            try
            {
                queueRepositories.DeleteQueue(queue);
                queueRepositories.Save();
                logger.Info($"Delete queue {queue.Id}");
                return Ok(new { IsDelete = true, data = queue });
            }
            catch (Exception m)
            {
                if (!myDbContext.Queue.Any(i => i.Id == queue.Id))
                {
                    logger.Info($"Try delete queue {queue.Id}");
                    return Ok(new { IsDelete = true, ErrorMessage = "No existing queue found" });
                }
                else
                {
                    logger.Error($"Something went wrong: {m}");
                    return StatusCode(500, m.Message);
                }
            }
        }
        [HttpPost("add-queue")]
        public ActionResult AddQueue(QueueData queue)
        {
            try
            {
                QueueData queueT = queueRepositories.GetQueueByUserId(queue.UserId);

                if (queueT != null)
                {
                    logger.Info($"Try to add queue, userId:{queue.UserId}");
                    return Ok(new { IsCreated = false, ErrorMessage = "This user queue already exists" });
                }
                queueRepositories.AddQueue(queue);
                queueRepositories.Save();
                logger.Info($"Add queue, userId:{queue.UserId}");
                return Ok(new { IsCreated = true, userData = queue });
            }
            catch (Exception m)
            {
                logger.Error($"Something went wrong: {m}");
                return StatusCode(500, m.Message);
            }
        }
    }
}
