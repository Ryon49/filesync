
using filesync_server.Models;

namespace filesync_server.Services;

public class FileManager
{

    private IFileService _fileService;

    public FileManager(IFileService fileService)
    {
        _fileService = fileService;
    }

    public Task<long> UploadFile(StoredFile file, Stream inputStream)
    {
        return _fileService.UploadFile(file, inputStream);
    }

    public async Task<Stream> DownloadFile(StoredFile storedFile)
    {
        return await _fileService.DownloadFile(storedFile);
    }
}