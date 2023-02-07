using DigitalDisplayBO.API;
using DigitalDisplayBO.API.Helpers;
using DigitalDisplayBO.API.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Database connection
builder.Services.AddDbContext<NetRomInternship2022OlandaDevContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories
builder.Services.AddScoped<IDeviceRepository, DeviceRepository>();
builder.Services.AddScoped<IAdvertisementRepository, AdvertisementRepository>();
builder.Services.AddScoped<IPanelLayoutRepository, PanelLayoutRepository>();
builder.Services.AddScoped<IPanelRepository, PanelRepository>();
builder.Services.AddScoped<IPanelLayoutZoneRepository, PanelLayoutZoneRepository>();
builder.Services.AddScoped<IAdvertisementTypeRepository, AdvertisementTypeRepository>();
builder.Services.AddScoped<IDevicePanelRepository, DevicePanelRepository>();
builder.Services.AddScoped<IPanelZoneRepository, PanelZoneRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IPanelAdvertisementsRepository, PanelAdvertisementsRepository>();

// Add services to the container.

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

app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true)
                .AllowCredentials());

app.UseHttpsRedirection();

//app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
