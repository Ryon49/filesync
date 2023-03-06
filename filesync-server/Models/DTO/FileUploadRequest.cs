using Microsoft.AspNetCore.Mvc;

namespace filesync_server.Models;

public class FileUploadDto
{
    [FromForm(Name = "files")]
    public IEnumerable<IFormFile> Files { get; set; } = null!;
}

