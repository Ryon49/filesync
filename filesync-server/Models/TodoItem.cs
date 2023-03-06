namespace filesync_server.Models;

public class TodoItem
{
    public String Id { get; set; } = String.Empty;
    public String Title { get; set; } = String.Empty;
    public String? Description { get; set; }
    public bool Completed { get; set; }
    public bool Archived { get; set; }
}