using filesync_server.Models;

namespace filesync_server.Services;

public class DirectoryManager
{
    private IDirectoryService _service;

    public DirectoryManager(IDirectoryService service)
    {
        _service = service;
    }

    public void UpdateEntry(StoredFile directory)
    {
        _service.UpdateEntry(directory);
    }

    public List<StoredFile> FetchAll()
    {
        return _service.FetchAll();
    }

    public StoredFile Get(String path) {
        return _service.Get(path);
    }
}