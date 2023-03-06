using Microsoft.AspNetCore.Mvc;

using filesync_server.Services;
using filesync_server.Models;
using filesync_server.Utils;

namespace filesync_server.Controllers;

[ApiController]
[Route("api/upload")]
public class FileUploadController : ControllerBase
{
    private ILogger<FileUploadController> _looger;
    private DirectoryServiceManager _directoryManager;

    [HttpGet]
    public ActionResult Index() {
        var path = Path.Combine("storage", "123");
        var p1 = Path.GetFullPath(path);
        return Ok(MyHash.sha256_hash(path));
        // return Ok("OK1");
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
            string relativePath = Path.Combine("storage", MyHash.sha256_hash(formFile.FileName));
            Console.WriteLine(relativePath);

            using (var stream = new FileInfo(relativePath).Create()) {
                await formFile.CopyToAsync(stream);
            }
            byteUpload += formFile.Length;
        }
        return Ok(byteUpload);
    }
}
