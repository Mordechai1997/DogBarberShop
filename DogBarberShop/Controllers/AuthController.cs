using Microsoft.AspNetCore.Mvc;
using DogBarberShop.Models;
using System.Collections.Generic;
using DogBarberShop.DBContexts;
using System;
using NLog;
using DogBarberShop.Repositories;

namespace Barbershop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private AuthRepositories authRepositories;
        private static Logger logger;
        public AuthController(MyDBContext context)
        {
            logger = LogManager.GetCurrentClassLogger();
            this.authRepositories = new AuthRepositories(context);
        }

        [HttpPost("login")]
        public ActionResult Login(User user)
        {
            try
            {
                IList<User> users = authRepositories.GetUsersByPassAndUserName(user.Password, user.UserName);
                if (users.Count == 0)
                {
                    logger.Info($"User: {user.UserName} try login ");
                    return Ok(new { IsExists = false, ErrorMessage = "Login details are invalid" });
                }
                logger.Info($"User: {user.UserName} login ");
                return Ok(new { IsExists = true, userData = users });
            }
            catch (Exception m)
            {
                logger.Error($"Something went wrong: {m}");
                return StatusCode(500, m.Message);
            }
            
        }

        [HttpPost("register")]
        public ActionResult Register(User user)
        {
            try
            {
                List<User> users = authRepositories.GetUsersByUserName(user.UserName);
                if (users.Count > 0)
                {
                    logger.Info($"User: {user.UserName} try create ");
                    return Ok(new { IsCreated = false, ErrorMessage = "User name exists" });
                }
                authRepositories.InsertUser(user);
                authRepositories.Save();
                logger.Info($"User: {user.UserName} created ");
                return Ok(new { IsCreated = true, userData = authRepositories.GetUsersByUserName(user.UserName)[0] });
            }
            catch (Exception m)
            {
                logger.Error($"Something went wrong: {m}");
                return StatusCode(500, m.Message);
            }
           
        }

    }
}
