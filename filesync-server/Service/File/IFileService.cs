using filesync_server.Models;

namespace filesync_server.Services;

public interface IFileService
{
    public Stream DownloadFile(StoredFile path);

    public Task<long> UploadFile(IFormFile formFile);
}