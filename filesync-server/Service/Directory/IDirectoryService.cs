using filesync_server.Models;

namespace filesync_server.Services;

public interface IDirectoryService
{
    public void UpdateEntry(StoredFile directory);

    public List<StoredFile> FetchAll();
}