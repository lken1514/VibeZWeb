namespace VibeZOData.Services.Email
{
    public interface IEmailSender //New
    {
        Task SendEmailAsync(string toEmail, string subject, string otpCode);
        Task SendNoticeEmail(string toEmail, string subject, string content);
        Task SendPaymentSuccessEmailAsync(string toEmail, string userName, double amount);
        Task SendArtistApprovalEmailAsync(string toEmail, string userName);
        Task SendSignupSuccessEmailAsync(string toEmail, string userName);
        Task SendGoogleLoginSuccessEmailAsync(string toEmail, string userName);
    }

}