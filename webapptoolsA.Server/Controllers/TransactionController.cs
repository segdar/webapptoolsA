using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapptoolsA.Server.Entities;
using webapptoolsA.Server.Models;
using webapptoolsA.Server.Services;

namespace webapptoolsA.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTransactions()
        {
            var result = await _transactionService.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionById(int id)
        {
            var result = await _transactionService.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] TransactionHeader transaction)
        {
            var created = await _transactionService.CreateAsync(transaction);
            return CreatedAtAction(nameof(GetTransactionById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, [FromBody] TransactionHeader transaction)
        {
            if (id != transaction.Id) return BadRequest("ID mismatch");

            var updated = await _transactionService.UpdateAsync(transaction);
            if (updated == null) return NotFound();

            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var deleted = await _transactionService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        // ---------------- PROJECT ----------------
        [HttpGet("projects")]
        public async Task<IActionResult> GetAllProjects()
        {
            var result = await _transactionService.GetAllAsyncProject();
            return Ok(result);
        }

        [HttpGet("projects/{id}")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            var result = await _transactionService.GetByIdAsyncProject(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost("projects")]
        public async Task<IActionResult> CreateProject([FromBody] RequestProjectDto project)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var created = await _transactionService.CreateAsyncProject(project);
            return CreatedAtAction(nameof(GetProjectById), new { id = created.Id }, created);
        }

        [HttpPut("projects/{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] RequestProjectDto project)
        {
            if (id != project.Id) return BadRequest("ID mismatch");

            var updated = await _transactionService.UpdateAsyncProject(project);
            if (updated == null) return NotFound();

            return Ok(updated);
        }

        // ---------------- TYPE TRANSACTION ----------------
        [HttpGet("types")]
        public async Task<IActionResult> GetAllTypes()
        {
            var result = await _transactionService.GetAllAsyncType();
            return Ok(result);
        }

        [HttpGet("types/{id}")]
        public async Task<IActionResult> GetTypeTransactionById(int id)
        {
            var result = await _transactionService.GetByIdAsyncType(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost("types")]
        public async Task<IActionResult> CreateTypeTransaction([FromBody] RequestTypeTransactionDto typeTransaction)
        {
            var created = await _transactionService.CreateAsyncType(typeTransaction);
            return CreatedAtAction(nameof(GetTypeTransactionById), new { id = created.Id }, created);
        }

        [HttpPut("types/{id}")]
        public async Task<IActionResult> UpdateTypeTransaction(int id, [FromBody] RequestTypeTransactionDto typeTransaction)
        {
            if (id != typeTransaction.Id) return BadRequest("ID mismatch");

            var updated = await _transactionService.UpdateAsyncType(typeTransaction);
            if (updated == null) return NotFound();

            return Ok(updated);
        }

        [HttpDelete("type/{id}")]
        public async Task<IActionResult> DeleteTypeTransaction(int id)
        {
            var deleted = await _transactionService.DeleteAsyncType(id);
            if (!deleted) return NotFound();
            return NoContent();
        }





    }
}
