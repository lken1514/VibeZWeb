
using BusinessObjects;
using Microsoft.AspNetCore.OData;
using Microsoft.OpenApi.Models;
using Repositories.IRepository;
using Repositories.Repository;
using VibeZOData.Models;
using VibeZOData.Services.Blob;

namespace VibeZOData
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddScoped(typeof(VibeZDbContext));
            builder.Services.AddScoped<ITrackRepository, TrackRepository>();  
            builder.Services.AddScoped<IPlaylistRepository, PlaylistRepository>();
            builder.Services.AddScoped<IAlbumRepository, AlbumRepository>();
            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
            builder.Services.AddControllers().AddOData(
                opt => opt.Select().Filter().Count().OrderBy().SetMaxTop(null).Expand().AddRouteComponents("odata", EdmModelBuilder.GetEdmModel()));

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.AddStorage();
            builder.Logging.ClearProviders();
            builder.Logging.AddConsole();
            builder.Logging.AddDebug();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseODataBatching();
            app.UseRouting();

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
