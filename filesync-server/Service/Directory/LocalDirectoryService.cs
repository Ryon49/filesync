using System.Text;
using System.Text.Json;
using filesync_server.Models;

namespace filesync_server.Services;

public class LocalDirectoryService : IDirectoryService
{
    private String directoryPath = Path.Combine(".", "storage/system/directory.json");
    public Dictionary<String, StoredFile> _map;

    public LocalDirectoryService()
    {
        Console.WriteLine("LocalDirectoryService.constructor");
        _map = new Dictionary<string, StoredFile>();
        if (!File.Exists(directoryPath))
        {
            Flush();
        }
        else
        {
            Load();
        }
    }

    public void Flush()
    {
        var source = JsonSerializer.Serialize<List<StoredFile>>(_map.Values.ToList());
        File.WriteAllText(directoryPath, source);
        // using (var destination = File.Open(todoPath, FileMode.OpenOrCreate, FileAccess.Write, FileShare.None))
        // {
        //     destination.Write(Encoding.UTF8.GetBytes(source));
        //     destination.Flush();
        // }
    }

    private void Load()
    {
        using (var source = File.Open(directoryPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
        {
            var items = JsonSerializer.Deserialize<List<StoredFile>>(source)!;
            if (items != null)
            {
                foreach (var storedFile in items)
                {
                    _map[storedFile.SystemName!] = storedFile;
                }
            }
        }
    }

    public void UpdateEntry(StoredFile storedFile)
    {
        _map[storedFile.SystemName!] = storedFile;
        Flush();
    }

    public List<StoredFile> FetchAll()
    {
        return _map.Values.ToList();
    }

    public StoredFile Get(String path) {
        return _map[path];
    }
}