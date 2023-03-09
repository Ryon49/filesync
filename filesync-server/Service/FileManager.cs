
using filesync_server.Models;

namespace filesync_server.Services;

public class FileManager
{

    private IFileService _fileService;

    public FileManager(IFileService fileService)
    {
        _fileService = fileService;
    }

    public Task<long> UploadFile(IFormFile formFile)
    {
        return _fileService.UploadFile(formFile);
    }

    public Stream DownloadFile(StoredFile storedFile)
    {
        return _fileService.DownloadFile(storedFile);
    }
}