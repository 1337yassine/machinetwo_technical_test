using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using technical_test_api_infrastructure.Context;
using Serilog;
using technical_test_api_application.User;
using technical_test_api_infrastructure.Repositories.User;
using technical_test_api_infrastructure.Repositories.Note;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Technical Test", Version = "v1" });
    c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Description = "ApiKey must appear in header",
        Type = SecuritySchemeType.ApiKey,
        Name = "XApiKey",
        In = ParameterLocation.Header,
        Scheme = "ApiKeyScheme"
    });
    var key = new OpenApiSecurityScheme()
    {
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "ApiKey"
        },
        In = ParameterLocation.Header
    };
    var requirement = new OpenApiSecurityRequirement
                {
                             { key, new List<string>() }
                };
    c.AddSecurityRequirement(requirement);
    c.EnableAnnotations();
});

//Service Registraition
builder.Services.AddDbContext<UserDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("Default"), x => x.MigrationsAssembly("technical_test_api_infrastructure")));
builder.Services.AddTransient<IUserService, UserService>();

//repos
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<INoteRepository, NoteRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
