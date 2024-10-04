using BusinessObjects;
using Microsoft.AspNetCore.OData;
using VibeZOData.Models;

namespace VibeZOData
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddScoped(typeof(VibeZDbContext));
            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
            builder.Services.AddControllers().AddOData(
                opt => opt.Select().Filter().Count().OrderBy().SetMaxTop(null).Expand().AddRouteComponents("odata", EdmModelBuilder.GetEdmModel()));

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
            //Neu muon dung swagger thi cmt if{} lai

            app.UseODataBatching();
            app.UseRouting();

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
