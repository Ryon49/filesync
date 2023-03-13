using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using filesync_server.Services;

var builder = WebApplication.CreateBuilder(args);

// config cors

var AllowedSpecificOrigins = "_allowedSpecificOrigins";
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        foreach (String host in builder.Configuration.GetSection("CORS").Get<String[]>()!)
        {
            Console.WriteLine($"{host}");
        }
        options.AddPolicy(name: AllowedSpecificOrigins,
                          corsBuilder =>
                          {
                              foreach (String cor in builder.Configuration.GetSection("CORS").Get<String[]>()!)
                              {
                                  corsBuilder.WithOrigins(cor)
                                  .AllowAnyMethod()
                                  .AllowAnyHeader();
                              }
                          });

    });
}

// load AWS credential 
Console.WriteLine(builder.Environment.ContentRootPath);
var awsProfile = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile(".secret/credential.json", false, true).Build()
    .GetSection("aws");
var credentials = new BasicAWSCredentials(
    awsProfile.GetSection("aws_access_key_id").Get<String>(),
    awsProfile.GetSection("aws_secret_access_key").Get<String>());
var region = RegionEndpoint.GetBySystemName(awsProfile.GetSection("region").Get<String>());
builder.Services.AddSingleton<AmazonS3Client>(provider => new AmazonS3Client(credentials, region));

// Add services to the container.
builder.Services.AddSingleton<TodoManager>();
builder.Services.AddSingleton<IDirectoryService, LocalDirectoryService>();
builder.Services.AddSingleton<DirectoryManager>();
builder.Services.AddSingleton<IFileService, S3FileService>();
// builder.Services.AddSingleton<IFileService, LocalFileService>();
builder.Services.AddSingleton<FileManager>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(AllowedSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
