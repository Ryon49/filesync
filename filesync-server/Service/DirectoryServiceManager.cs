namespace filesync_server.Services;

public class DirectoryServiceManager {
    private IDirectoryService _service;

    public DirectoryServiceManager(IDirectoryService service) {
        _service = service;
    }
}