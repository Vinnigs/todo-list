using Moq;
using TodoList.Application.DTOs;
using TodoList.Application.UseCases;
using TodoList.Domain;
using TodoList.Domain.Interfaces;
using Xunit;

namespace TodoList.Tests.UseCases;

public class UpdateTaskUseCaseTests
{
    private readonly Mock<ITaskRepository> _mockRepository;
    private readonly UpdateTaskUseCase _useCase;

    public UpdateTaskUseCaseTests()
    {
        _mockRepository = new Mock<ITaskRepository>();
        _useCase = new UpdateTaskUseCase(_mockRepository.Object);
    }

    [Fact]
    public async Task ExecuteAsync_WithValidData_ShouldUpdateTask()
    {
        // Arrange
        var taskId = 1;
        var updateTaskDto = new UpdateTaskDto { Title = "Updated Task", IsCompleted = true };
        var existingTask = new TaskEntity
        {
            Id = taskId,
            Title = "Original Task",
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow.AddHours(-1)
        };
        var updatedTask = new TaskEntity
        {
            Id = taskId,
            Title = "Updated Task",
            IsCompleted = true,
            CreatedAt = existingTask.CreatedAt
        };

        _mockRepository.Setup(r => r.GetTaskById(taskId))
                      .ReturnsAsync(existingTask);
        _mockRepository.Setup(r => r.UpdateTask(It.IsAny<TaskEntity>()))
                      .ReturnsAsync(updatedTask);

        // Act
        var result = await _useCase.ExecuteAsync(taskId, updateTaskDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(updatedTask.Id, result.Id);
        Assert.Equal(updatedTask.Title, result.Title);
        Assert.Equal(updatedTask.IsCompleted, result.IsCompleted);
        Assert.Equal(updatedTask.CreatedAt, result.CreatedAt);

        _mockRepository.Verify(r => r.GetTaskById(taskId), Times.Once);
        _mockRepository.Verify(r => r.UpdateTask(It.Is<TaskEntity>(t => 
            t.Title == updateTaskDto.Title && 
            t.IsCompleted == updateTaskDto.IsCompleted)), Times.Once);
    }

    [Fact]
    public async Task ExecuteAsync_WithNonExistentId_ShouldThrowInvalidOperationException()
    {
        // Arrange
        var taskId = 999;
        var updateTaskDto = new UpdateTaskDto { Title = "Updated Task", IsCompleted = true };

        _mockRepository.Setup(r => r.GetTaskById(taskId))
                      .ReturnsAsync((TaskEntity?)null);

        // Act & Assert
        var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => _useCase.ExecuteAsync(taskId, updateTaskDto));
        Assert.Equal($"Tarefa com ID {taskId} não encontrada.", exception.Message);

        _mockRepository.Verify(r => r.GetTaskById(taskId), Times.Once);
        _mockRepository.Verify(r => r.UpdateTask(It.IsAny<TaskEntity>()), Times.Never);
    }
}