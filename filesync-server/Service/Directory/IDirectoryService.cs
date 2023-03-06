namespace filesync_server.Services;

public interface IDirectoryService {
    public void add(String key, String value);

    public String lookup(String key);
}