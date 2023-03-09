using filesync_server.Models;
using filesync_server.Utils;

namespace filesync_server.Services;

public class LocalFileService : IFileService
{
    private const String folder = "storage";

    public Stream DownloadFile(StoredFile storedFile)
    {
        String path = Path.Combine(folder, storedFile.SystemName!);
        return new FileStream(path, FileMode.Open, FileAccess.Read);
    }

    public async Task<long> UploadFile(IFormFile formFile)
    {
        String path = Path.Combine(folder, MyHash.sha256_hash(formFile.FileName));
        using (var stream = File.Create(path))
        {
            await formFile.CopyToAsync(stream);
        }
        return formFile.Length;
    }
}