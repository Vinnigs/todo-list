using TodoList.Application.DTOs;
using TodoList.Domain.Interfaces;

namespace TodoList.Application.UseCases;

public class GetAllTasksUseCase
{
    private readonly ITaskRepository _taskRepository;

    public GetAllTasksUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<IEnumerable<TaskResponseDto>> ExecuteAsync()
    {
        var tasks = await _taskRepository.GetAllTasks();

        return tasks.Select(task => new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt
        });
    }
}
