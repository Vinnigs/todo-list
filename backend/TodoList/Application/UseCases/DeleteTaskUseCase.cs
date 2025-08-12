using TodoList.Domain.Interfaces;

namespace TodoList.Application.UseCases;

public class DeleteTaskUseCase
{
    private readonly ITaskRepository _taskRepository;

    public DeleteTaskUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task ExecuteAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID deve ser maior que zero");

        var existingTask = await _taskRepository.GetTaskById(id);
        if (existingTask == null)
            throw new InvalidOperationException($"Tarefa com ID {id} não encontrada.");

        await _taskRepository.DeleteTask(id);
    }
}
