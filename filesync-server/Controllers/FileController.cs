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
    private FileManager _fileManager;

    public FileController(DirectoryManager directoryManager, FileManager fileManager)
    {
        _directoryManager = directoryManager;
        _fileManager = fileManager;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return Ok(_directoryManager.FetchAll());
    }

    [HttpPost]
    public async Task<IActionResult> UploadFiles([FromForm] FileUploadDto request)
    {
        // check fileName duplication in storage
        foreach (IFormFile formFile in request.Files)
        {
            String systemName = Path.Combine("storage", MyHash.sha256_hash(formFile.FileName));
            if (_directoryManager.CheckExists(systemName))
            {
                Console.WriteLine($"File {formFile.FileName} has already existed");
                return Ok($"File {formFile.FileName} has already existed");
            }
        }

        long byteUpload = 0;
        foreach (IFormFile formFile in request.Files)
        {
            long bytes = await _fileManager.UploadFile(formFile);
            if (bytes == 0)
            {
                // TODO: handle upload fail, possible adding different failure state.
            }
            String systemName = MyHash.sha256_hash(formFile.FileName);
            // Add a new entry to directory
            _directoryManager.UpdateEntry(new StoredFile()
            {
                SystemName = systemName,
                UserName = formFile.FileName,
                Size = formFile.Length,
                LastModified = DateTime.Now,
            });
            byteUpload += formFile.Length;
        }
        return Ok(byteUpload);
    }

    [HttpGet("{path}")]
    public ActionResult DownloadFile(String path)
    {
        if (!_directoryManager.CheckExists(path))
        {
            return NotFound("Target does not exists");
        }
        StoredFile file = _directoryManager.Get(path);
        String contentType = file.GetFileMimeType();
        Stream fileStream = _fileManager.DownloadFile(file);
        return new FileStreamResult(fileStream, contentType!);
    }

}
