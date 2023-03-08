using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Mvc;

using filesync_server.Services;
using filesync_server.Models;
using filesync_server.Utils;

namespace filesync_server.Controllers;

[ApiController]
[Route("api/file")]
public class FileController : ControllerBase
{
    // private ILogger<FileController> _looger;
    private DirectoryManager _directoryManager;

    public FileController(DirectoryManager directoryManager) {
        _directoryManager = directoryManager;
    }

    [HttpGet]
    public IActionResult Index() {
        return Ok(_directoryManager.FetchAll());
    }

    [HttpPost]
    public async Task<IActionResult> UploadFiles([FromForm] FileUploadDto request) {
        // check fileName duplication in storage
        foreach (IFormFile formFile in request.Files) {
            FileInfo file = new FileInfo(Path.Combine("storage", MyHash.sha256_hash(formFile.FileName)));
            if (file.Exists) {
                Console.WriteLine($"File {formFile.FileName} has already existed");
                return Ok($"File {formFile.FileName} has already existed");
            }
        }

        long byteUpload = 0;
        foreach (IFormFile formFile in request.Files) {
            String systemName = MyHash.sha256_hash(formFile.FileName);
            string relativePath = Path.Combine("storage", systemName);

            Console.WriteLine(relativePath);
            _directoryManager.UpdateEntry(new StoredFile(){
                SystemName = systemName,
                UserName = formFile.FileName,
                Size = formFile.Length,
                LastModified = DateTime.Now,
            });

            using (var stream = new FileInfo(relativePath).Create()) {
                await formFile.CopyToAsync(stream);
            }
            byteUpload += formFile.Length;
        }
        return Ok(byteUpload);
    }

    [HttpGet("{path}")]
    public FileResult DownloadFile(String path) {
        StoredFile file = _directoryManager.Get(path);
        String filePath = Path.Combine("storage", file.SystemName!);
        String contentType = "";
        new FileExtensionContentTypeProvider().TryGetContentType(file.UserName!, out contentType!);
        if (contentType == null) {
            contentType = "text/plain";
        }
        Console.WriteLine(contentType);
        var f = new FileStream(filePath, FileMode.Open, FileAccess.Read);
        return new FileStreamResult(f, contentType!);
    }

}
