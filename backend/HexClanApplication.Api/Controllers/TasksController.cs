using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using HexClanApplication.Api.Contracts.Models;
using System.Threading.Tasks;

namespace HexClanApplication.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly IMongoCollection<Task_> _taskModelsCollection;
        public TasksController(IMongoClient client)
        {
            var database = client.GetDatabase("HexClanDatabase");
            _taskModelsCollection = database.GetCollection<Task_>("Tasks");
        }

        [HttpGet]
        public JsonResult Get()
        {
            var dblist = _taskModelsCollection.AsQueryable();
            return new JsonResult(dblist);
        }
        [HttpPost]
        public async Task<ActionResult> AddTask(Task_ tsk)
        {
            if (tsk == null)
                return BadRequest();

            await _taskModelsCollection.InsertOneAsync(tsk);

            return Ok(new ResponseState
            {
                Content = null,
                Success = true,
                Message = "Task added successfully"
            });  
        }
        
        // Delete metode tiesiog prie viso api pridėkite id skaičiuką ir ištrins jį.
        [HttpDelete("{Id}")]
        public JsonResult Delete(String Id)
        {
            Task_ task;
            task = _taskModelsCollection.Find<Task_>(ts => ts.TaskId == Id).FirstOrDefault();
            if(task != null)
            {
                _taskModelsCollection.DeleteOne(a => a.TaskId == Id);
                return new JsonResult("Užduotis ištrinta");
            }
            else
            {
                return new JsonResult("Užduotis neištrinta");
            }

        }
    }
}

