using System.Text;
using System.Text.Json;

using filesync_server.Models;

namespace filesync_server.Services;

public class TodoManager
{
    private String todoPath = Path.Combine(".", "storage/system/todo.json");
    private Dictionary<String, TodoItem> _items { get; set; }
    public TodoManager()
    {
        Console.WriteLine("TodoServiceManager.constructor");
        _items = new Dictionary<string, TodoItem>();
        if (!File.Exists(todoPath))
        {
            Flush();
        }
        else
        {
            Load();
        }
    }

    public void Flush()
    {
        var source = JsonSerializer.Serialize<List<TodoItem>>(_items.Values.ToList());
        using (var destination = File.Open(todoPath, FileMode.OpenOrCreate, FileAccess.Write, FileShare.None))
        {
            destination.Write(Encoding.UTF8.GetBytes(source));
            destination.Flush();
        }
    }

    private void Load()
    {
        using (var source = File.Open(todoPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
        {
            var items = JsonSerializer.Deserialize<List<TodoItem>>(source)!;
            if (items != null)
            {
                foreach (TodoItem item in items)
                {
                    _items[item.Id] = item;
                }
            }
        }
    }

    public TodoItem Get(String id)
    {
        return _items[id];
    }

    public List<TodoItem> GetAll()
    {
        return _items.Values.ToList();
    }

    public void UpdateEntry(TodoItem item)
    {
        _items[item.Id] = item;
        Flush();
    }

    public TodoItem NewItem()
    {
        TodoItem newItem = new TodoItem()
        {
            Id = Guid.NewGuid().ToString(),
            Title = "New Title",
            Description = "New Description",
            Completed = false,
            Archived = false,
            // TODO: possible implementation of tags
        };
        UpdateEntry(newItem);
        return newItem;
    }

    public void Remove(string id)
    {
        _items.Remove(id);
        Flush();
    }
}