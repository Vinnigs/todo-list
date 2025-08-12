using TodoList.Application.DTOs;
using TodoList.Domain;
using TodoList.Domain.Interfaces;

namespace TodoList.Application.UseCases;

public class GetTaskByIdUseCase
{
    private readonly ITaskRepository _taskRepository;

    public GetTaskByIdUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskResponseDto?> ExecuteAsync(int id)
    {
        if(id <= 0)
            throw new ArgumentException("Id deve ser maior que zero.", nameof(id));

        TaskEntity? task = await _taskRepository.GetTaskById(id);

        if (task == null)
            throw new Exception($"Tarefa com ID {id} não encontrada.");

        return new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt
        };
    }
}
