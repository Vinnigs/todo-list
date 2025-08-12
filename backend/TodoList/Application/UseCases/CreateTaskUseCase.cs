using TodoList.Application.DTOs;
using TodoList.Domain;
using TodoList.Domain.Interfaces;

namespace TodoList.Application.UseCases;

public class CreateTaskUseCase
{
    private readonly ITaskRepository _taskRepository;

    public CreateTaskUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskResponseDto> ExecuteAsync(CreateTaskDto createTaskDto)
    {
        if (string.IsNullOrWhiteSpace(createTaskDto.Title))
        {
            throw new ArgumentException("Título é obrigatório.", nameof(createTaskDto.Title));
        }

        var taskEntity = new TaskEntity
        {
            Title = createTaskDto.Title,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };

        var createdTask = await _taskRepository.CreateTask(taskEntity);

        return new TaskResponseDto
        {
            Id = createdTask.Id,
            Title = createdTask.Title,
            IsCompleted = createdTask.IsCompleted,
            CreatedAt = createdTask.CreatedAt
        };
    }
}
