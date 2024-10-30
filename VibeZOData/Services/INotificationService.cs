namespace VibeZOData.Services
{
    public interface INotificationService
    {
        Task SendNotificationAsync(Guid userId, string subject, string trackTitle);
    }
}