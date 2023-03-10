using Amazon.S3;
using Amazon.S3.Model;
using filesync_server.Models;

namespace filesync_server.Services;

public class S3FileService : IFileService
{
    private const String BucketName = "filesync-server";

    private AmazonS3Client _s3Client;

    public S3FileService(AmazonS3Client s3Client)
    {
        _s3Client = s3Client;
        // Create a new bucket if not exists.
        Task.Run(async () => await Init());
    }

    public async Task<Stream> DownloadFile(StoredFile metadata)
    {
        var request = new GetObjectRequest
        {
            BucketName = BucketName,
            Key = metadata.SystemName,
        };
        using GetObjectResponse response = await _s3Client.GetObjectAsync(request);

        // move response stream in memory and reset memory stream's position to 0
        MemoryStream memoryStream = new MemoryStream();
        await response.ResponseStream.CopyToAsync(memoryStream);
        memoryStream.Seek(0, SeekOrigin.Begin);
        return memoryStream;
    }

    public async Task Init()
    {
        bool exists = await CheckBucketExists();
        if (!exists)
        {
            var request = new PutBucketRequest
            {
                BucketName = BucketName,
                UseClientRegion = true,
            };
            var response = await _s3Client.PutBucketAsync(request);
            if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
            {
                // TODO: handle create bucket failure
                throw new AmazonS3Exception($"failed to create bucket '{BucketName}'");
            }
        }
    }

    public async Task<long> UploadFile(StoredFile metadata, Stream inputStream)
    {
        var request = new PutObjectRequest
        {
            BucketName = BucketName,
            InputStream = inputStream,
            Key = metadata.SystemName,
        };

        var response = await _s3Client.PutObjectAsync(request);
        if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
        {
            Console.WriteLine($"Successfully uploaded {metadata.UserName} to {BucketName}.");
            return metadata.Size;
        }
        else
        {
            Console.WriteLine($"Could not upload {metadata.UserName} to {BucketName}.");
            return 0;
        }
    }

    private async Task<bool> CheckBucketExists()
    {
        var response = await _s3Client.ListBucketsAsync();
        return response.Buckets.Exists(b => b.BucketName == BucketName);
    }
}