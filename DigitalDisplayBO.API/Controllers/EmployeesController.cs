using DigitalDisplayBO.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace DigitalDisplayBO.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeesController : Controller
    {
        private readonly IConfiguration _configuration;

        public EmployeesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            string filePath = _configuration["Settings:EmployeesFilePath"];
            StreamReader r = new StreamReader(filePath);
            string json = r.ReadToEnd();
            List<EmployeeInfo> employees = JsonSerializer.Deserialize<List<EmployeeInfo>>(json, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
            employees = employees.OrderBy(emp => emp.LastName).ToList();
            return Ok(employees);
        }
    }
}
