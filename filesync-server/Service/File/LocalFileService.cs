using filesync_server.Models;
using filesync_server.Utils;

namespace filesync_server.Services;

public class LocalFileService : IFileService
{
    private const String folder = "storage";

    public async Task<Stream> DownloadFile(StoredFile storedFile)
    {
        String path = Path.Combine(folder, storedFile.SystemName!);
        return await Task.Run(() => new FileStream(path, FileMode.Open, FileAccess.Read));
    }

    public Task Init() {
        // TODO: We can create the folder if not exists.
        throw new NotImplementedException();
    }

    public async Task<long> UploadFile(StoredFile metadata, Stream inputStream)
    {
        String path = Path.Combine(folder, metadata.SystemName!);
        using (var stream = File.Create(path))
        {
            await inputStream.CopyToAsync(stream);
        }
        return metadata.Size;
    }
}