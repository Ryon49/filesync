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


// Add services to the container.
builder.Services.AddSingleton<TodoServiceManager>();

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
