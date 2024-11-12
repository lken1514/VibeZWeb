
using Repositories.IRepository;

namespace VibeZOData.Services.Email
{
    public class NotificationService : INotificationService
    {
        private readonly IEmailSender _emailSender;
        private readonly ITrackRepository _trackRepository;
        private readonly IUserRepository _userRepository;
        public NotificationService(IEmailSender emailSender, ITrackRepository trackRepository, IUserRepository userRepository)
        {
            _emailSender = emailSender;
            _trackRepository = trackRepository;
            _userRepository = userRepository;
        }
        public async Task SendNotificationAsync(Guid userId, string subject, string trackTitle)
        {
            var user = await _userRepository.GetUserById(userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            string content = $"Hello {user.Name},\n\nThe artist you follow has released a new track: \"{trackTitle}\". Check it out on VibeZ!";
            string emailSubject = subject;
            await _emailSender.SendNoticeEmail(user.Email, emailSubject, content);
        }

        public async Task SendSignupSuccessEmailAsync(string email, string username)
        {
            await _emailSender.SendSignupSuccessEmailAsync(email, username);
        }

        public async Task SendGoogleLoginSuccessEmailAsync(string email, string username)
        {
            await _emailSender.SendGoogleLoginSuccessEmailAsync(email, username);
        }

        public async Task SendArtistApprovalEmailAsync(string email, string userName)
        {
            await _emailSender.SendArtistApprovalEmailAsync(email, userName);
        }

        public async Task SendPaymentSuccessEmailAsync(string email, string userName, double amount)
        {
            await _emailSender.SendPaymentSuccessEmailAsync(email, userName, amount);
        }
    }
}