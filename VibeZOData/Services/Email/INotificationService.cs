namespace VibeZOData.Services.Email
{
    public interface INotificationService
    {
        Task SendNotificationAsync(Guid userId, string subject, string trackTitle);
        Task SendSignupSuccessEmailAsync(string email, string username);
        Task SendGoogleLoginSuccessEmailAsync(string email, string username);
        Task SendArtistApprovalEmailAsync(string email, string userName);
        Task SendPaymentSuccessEmailAsync(string email, string userName, double amount);
    }
}