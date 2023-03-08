namespace filesync_server.Models;

public class StoredFile
{
    public String? SystemName { get; set; }
    public String? UserName { get; set; }

    public Int64 Size { get; set; }

    // Defaults to en-US timezone
    public DateTime LastModified { get; set; }
}