using Microsoft.EntityFrameworkCore;
using TodoList.Domain;
using TodoList.Domain.Interfaces;
using TodoList.Infrastructure.Data;

namespace TodoList.Infrastructure.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly TodoContext _context;

    public TaskRepository(TodoContext context)
    {
        _context = context;
    }

    public async Task<TaskEntity> CreateTask(TaskEntity task)
    {
        await _context.Tasks.AddAsync(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task<IEnumerable<TaskEntity>> GetAllTasks()
    {
        return await _context.Tasks.ToListAsync();
    }

    public async Task<TaskEntity?> GetTaskById(int id)
    {
        return await _context.Tasks.FindAsync(id);
    }

    public async Task<TaskEntity> UpdateTask(TaskEntity task)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task != null)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }
}
