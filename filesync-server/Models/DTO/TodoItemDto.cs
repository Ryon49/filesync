using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace filesync_server.Models;

public class TodoItemDto
{
    [FromForm(Name = "id")]
    public String? Id { get; set; }

    [FromForm(Name = "title")]
    public String? Title { get; set; }

    [FromForm(Name = "description")]
    public String Description { get; set; } = String.Empty;

    [FromForm(Name = "completed")]
    public bool Completed { get; set; }

    [FromForm(Name = "archived")]
    public bool Archived { get; set; }

    public static TodoItemDto From(TodoItem item)
    {
        return new TodoItemDto()
        {
            Id = item.Id,
            Title = item.Title,
            Description = item.Description!,
            Completed = item.Completed,
            Archived = item.Archived,
        };
    }
}