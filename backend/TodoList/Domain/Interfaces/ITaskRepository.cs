namespace TodoList.Domain.Interfaces;

public interface ITaskRepository
{
    Task<TaskEntity> CreateTask(TaskEntity task);
    Task<IEnumerable<TaskEntity>> GetAllTasks();
    Task<TaskEntity?> GetTaskById(int id);
    Task<TaskEntity> UpdateTask(TaskEntity task);
    Task DeleteTask(int id);
}
