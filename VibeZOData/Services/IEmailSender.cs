namespace VibeZOData.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string toEmail, string subject, string otpCode);
    }

}
