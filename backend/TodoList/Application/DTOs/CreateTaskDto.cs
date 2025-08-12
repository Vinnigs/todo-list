using System.ComponentModel.DataAnnotations;

namespace TodoList.Application.DTOs;

public class CreateTaskDto
{
    [Required(ErrorMessage = "O título é obrigatório.")]
    [StringLength(200, MinimumLength = 1, ErrorMessage = "O título deve ter entre 1 e 200 caracteres.")]
    public string Title { get; set; } = string.Empty;
}
