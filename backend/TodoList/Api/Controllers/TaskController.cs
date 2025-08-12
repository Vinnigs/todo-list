using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TodoList.Application.DTOs;
using TodoList.Application.UseCases;

namespace TodoList.Api.Controllers;

[ApiController]
[Route("api/task")]
public class TaskController : ControllerBase
{
    private readonly CreateTaskUseCase _createTaskUseCase;
    private readonly GetAllTasksUseCase _getAllTasksUseCase;
    private readonly GetTaskByIdUseCase _getTaskByIdUseCase;
    private readonly UpdateTaskUseCase _updateTaskUseCase;
    private readonly DeleteTaskUseCase _deleteTaskUseCase;

    public TaskController(
        CreateTaskUseCase createTaskUseCase,
        GetAllTasksUseCase getAllTasksUseCase,
        GetTaskByIdUseCase getTaskByIdUseCase,
        UpdateTaskUseCase updateTaskUseCase,
        DeleteTaskUseCase deleteTaskUseCase)
    {
        _createTaskUseCase = createTaskUseCase;
        _getAllTasksUseCase = getAllTasksUseCase;
        _getTaskByIdUseCase = getTaskByIdUseCase;
        _updateTaskUseCase = updateTaskUseCase;
        _deleteTaskUseCase = deleteTaskUseCase;
    }

    [HttpPost]
    [SwaggerOperation(Summary = "Cria uma nova tarefa.")]
    [SwaggerResponse(StatusCodes.Status201Created, "Tarefa criada com sucesso", typeof(TaskResponseDto), contentTypes: new[] { "application/json" })]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Dados inválidos")]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        TaskResponseDto result = await _createTaskUseCase.ExecuteAsync(dto);

        return CreatedAtAction(nameof(GetTaskById), new { id = result.Id }, result);
    }


    [HttpGet]
    [SwaggerOperation(Summary = "Lista todas as tarefas.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Lista de tarefas", typeof(IEnumerable<TaskResponseDto>), contentTypes: new[] { "application/json" })]
    public async Task<IActionResult> GetAllTasks()
    {
        IEnumerable<TaskResponseDto> result = await _getAllTasksUseCase.ExecuteAsync();
        return Ok(result);
    }


    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Obtém uma tarefa pelo ID.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Tarefa encontrada", typeof(TaskResponseDto), contentTypes: new[] { "application/json" })]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Tarefa não encontrada")]
    public async Task<IActionResult> GetTaskById([FromRoute] int id)
    {
        TaskResponseDto? result = await _getTaskByIdUseCase.ExecuteAsync(id);

        if (result == null)
            return NotFound(new { message = $"Tarefa com ID {id} não encontrada" });

        return Ok(result);
    }


    [HttpPut("{id}")]
    [SwaggerOperation(Summary = "Atualiza uma tarefa existente.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Tarefa atualizada", typeof(TaskResponseDto), contentTypes: new[] { "application/json" })]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Dados inválidos")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Tarefa não encontrada")]
    public async Task<IActionResult> UpdateTask([FromRoute] int id, [FromBody] UpdateTaskDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _updateTaskUseCase.ExecuteAsync(id, dto);

        if (result == null)
            return NotFound(new { message = $"Tarefa com ID {id} não encontrada" });

        return Ok(result);
    }


    [HttpDelete("{id}")]
    [SwaggerOperation(Summary = "Exclui uma tarefa.")]
    [SwaggerResponse(StatusCodes.Status204NoContent, "Tarefa excluída com sucesso")]
    public async Task<IActionResult> DeleteTask([FromRoute] int id) 
    {
        await _deleteTaskUseCase.ExecuteAsync(id);
        return NoContent();
    }
}
