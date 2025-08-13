using Moq;
using TodoList.Application.UseCases;
using TodoList.Domain;
using TodoList.Domain.Interfaces;
using Xunit;

namespace TodoList.Tests.UseCases;

public class GetTaskByIdUseCaseTests
{
    private readonly Mock<ITaskRepository> _mockRepository;
    private readonly GetTaskByIdUseCase _useCase;

    public GetTaskByIdUseCaseTests()
    {
        _mockRepository = new Mock<ITaskRepository>();
        _useCase = new GetTaskByIdUseCase(_mockRepository.Object);
    }

    [Fact]
    public async Task ExecuteAsync_WithValidId_ShouldReturnTask()
    {
        // Arrange
        var taskId = 1;
        var expectedTask = new TaskEntity
        {
            Id = taskId,
            Title = "Test Task",
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };

        _mockRepository.Setup(r => r.GetTaskById(taskId))
                      .ReturnsAsync(expectedTask);

        // Act
        var result = await _useCase.ExecuteAsync(taskId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(expectedTask.Id, result.Id);
        Assert.Equal(expectedTask.Title, result.Title);
        Assert.Equal(expectedTask.IsCompleted, result.IsCompleted);
        Assert.Equal(expectedTask.CreatedAt, result.CreatedAt);

        _mockRepository.Verify(r => r.GetTaskById(taskId), Times.Once);
    }

    [Fact]
    public async Task ExecuteAsync_WithInvalidId_ShouldThrowArgumentException()
    {
        // Arrange
        var taskId = 0;

        // Act & Assert
        var exception = await Assert.ThrowsAsync<ArgumentException>(() => _useCase.ExecuteAsync(taskId));
        Assert.Equal("Id deve ser maior que zero. (Parameter 'id')", exception.Message);
        Assert.Equal("id", exception.ParamName);

        _mockRepository.Verify(r => r.GetTaskById(It.IsAny<int>()), Times.Never);
    }
}