using Microsoft.AspNetCore.Mvc;

using filesync_server.Models;
using filesync_server.Services;

namespace filesync_server.Controllers;

[ApiController]
[Route("api/todo")]
public class TodoController : ControllerBase
{

    private TodoServiceManager _todoManager;

    public TodoController(TodoServiceManager todoManager)
    {
        _todoManager = todoManager;
    }

    // [HttpGet]
    // public String Index()
    // {
    //     return "Todo OK";
    // }

    [HttpGet]
    public IActionResult List() {
        var converter = new Converter<TodoItem, TodoItemDto>(TodoItemDto.From);
        List<TodoItemDto> result = _todoManager.GetAll().ConvertAll(converter);
        return Ok(result);
    }


    [HttpPut()]
    public IActionResult NewTodo()
    {
        TodoItem newItem = _todoManager.NewItem();
        TodoItemDto dto = TodoItemDto.From(newItem);
        return Ok(dto);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTodo(String id, [FromForm]TodoItemDto itemDto) {
        // TODO: Right now, we assume "id" always exists
        TodoItem item = _todoManager.Get(id);
        item.Title = itemDto.Title;
        item.Description = itemDto.Description;
        item.Completed = itemDto.Completed;
        item.Archived = itemDto.Archived;
        _todoManager.UpdateEntry(item);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult RemoveTodo(String id) {
        Console.WriteLine(id);
        _todoManager.Remove(id);
        return Ok();
    }
}