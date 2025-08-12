using TodoList.Application.DTOs;
using TodoList.Domain;
using TodoList.Domain.Interfaces;

namespace TodoList.Application.UseCases;

public class UpdateTaskUseCase
{
    private readonly ITaskRepository _taskRepository;

    public UpdateTaskUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskResponseDto> ExecuteAsync(int id, UpdateTaskDto updateTaskDto)
    {
        if (id <= 0)
            throw new ArgumentException("ID deve ser maior que zero.", nameof(id));

        if (string.IsNullOrWhiteSpace(updateTaskDto.Title))
            throw new ArgumentException("Título é obrigatório.", nameof(updateTaskDto.Title));

        TaskEntity? existingTask = await _taskRepository.GetTaskById(id);
        if (existingTask == null)
            throw new InvalidOperationException($"Tarefa com ID {id} não encontrada.");

        existingTask.Title = updateTaskDto.Title;
        existingTask.IsCompleted = updateTaskDto.IsCompleted;

        var updatedTask = await _taskRepository.UpdateTask(existingTask);

        return new TaskResponseDto
        {
            Id = updatedTask.Id,
            Title = updatedTask.Title,
            IsCompleted = updatedTask.IsCompleted,
            CreatedAt = updatedTask.CreatedAt
        };
    }
}
