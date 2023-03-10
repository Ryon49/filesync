using filesync_server.Models;

namespace filesync_server.Services;

public interface IFileService
{
    public Task<Stream> DownloadFile(StoredFile metadata);
    public Task Init();
    public Task<long> UploadFile(StoredFile metadata, Stream inputStream);
}