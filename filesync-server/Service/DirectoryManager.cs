namespace filesync_server.Services;

public class DirectoryManager {
    private IDirectoryService _service;

    public DirectoryManager(IDirectoryService service) {
        _service = service;
    }
}