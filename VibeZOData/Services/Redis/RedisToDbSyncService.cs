using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using BusinessObjects;
using Microsoft.EntityFrameworkCore;

namespace VibeZOData
{
    public class RedisToDbSyncService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IConnectionMultiplexer _redis;
        private readonly IDatabase _database;
        private const string RedisKey = "UserTrackListeners";

        public RedisToDbSyncService(IServiceProvider serviceProvider, IConnectionMultiplexer redis)
        {
            _serviceProvider = serviceProvider;
            _redis = redis;
            _database = _redis.GetDatabase();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await SyncDataToDatabase();
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }

        private async Task SyncDataToDatabase()
        {
            try
            {
                var trackListeners = await _database.ListRangeAsync(RedisKey);

                if (trackListeners.Length == 0) return;

                var listenersToSave = new List<UserTrackListener>();

                foreach (var item in trackListeners)
                {
                    var listener = JsonSerializer.Deserialize<UserTrackListener>(item);
                    if (listener != null)
                    {
                        listenersToSave.Add(listener);
                    }
                }

                using (var scope = _serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<VibeZDbContext>();
                    await dbContext.UserTrackListeners.AddRangeAsync(listenersToSave);
                    await dbContext.SaveChangesAsync();
                }

                await _database.KeyDeleteAsync(RedisKey);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error syncing data: {ex.Message}");
            }
        }
    }
}
