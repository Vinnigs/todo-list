using System.Net;
using System.Text.Json;

namespace TodoList.Api.Middleware;

public class GlobalExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;

    public GlobalExceptionHandlingMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ocorreu uma exceção não tratada: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        // Não interferir com requisições OPTIONS (CORS preflight)
        if (context.Response.HasStarted)
        {
            return;
        }

        context.Response.ContentType = "application/json";

        var response = exception switch
        {
            ArgumentException argumentEx => new ErrorResponse
            {
                Message = argumentEx.Message,
                StatusCode = (int)HttpStatusCode.BadRequest,
                Details = "Parâmetros inválidos fornecidos"
            },
            InvalidOperationException invalidOpEx => new ErrorResponse
            {
                Message = invalidOpEx.Message,
                StatusCode = (int)HttpStatusCode.NotFound,
                Details = "Recurso não encontrado"
            },
            UnauthorizedAccessException => new ErrorResponse
            {
                Message = "Acesso não autorizado",
                StatusCode = (int)HttpStatusCode.Unauthorized,
                Details = "Credenciais inválidas ou ausentes"
            },
            _ => new ErrorResponse
            {
                Message = "Erro interno do servidor",
                StatusCode = (int)HttpStatusCode.InternalServerError,
                Details = "Ocorreu um erro inesperado"
            }
        };

        context.Response.StatusCode = response.StatusCode;

        var jsonResponse = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        await context.Response.WriteAsync(jsonResponse);
    }
}

public class ErrorResponse
{
    public string Message { get; set; } = string.Empty;
    public int StatusCode { get; set; }
    public string Details { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}