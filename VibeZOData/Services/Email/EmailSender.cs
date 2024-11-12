using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace VibeZOData.Services.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfig;

        public EmailSender(IOptions<EmailConfiguration> options)
        {
            _emailConfig = options.Value;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string otpCode)
        {
            var emailTemplate = GenerateEmailTemplate(toEmail, subject, otpCode);

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_emailConfig.FromName, _emailConfig.From));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = emailTemplate };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_emailConfig.SmtpServer, 587, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailConfig.Username, _emailConfig.Password);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

        //Thong bao khi payment thanh cong
        public async Task SendPaymentSuccessEmailAsync(string toEmail, string userName, double amount)
        {
            string subject = "Payment Successful";
            string emailTemplate = GeneratePaymentSuccessTemplate(userName, amount);

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_emailConfig.FromName, _emailConfig.From));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = emailTemplate };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_emailConfig.SmtpServer, 587, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailConfig.Username, _emailConfig.Password);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

        //Thong bao khi Approve Artist
        public async Task SendArtistApprovalEmailAsync(string toEmail, string userName)
        {
            string subject = "Artist Approval Successful";
            string emailTemplate = GenerateArtistApprovalTemplate(userName);

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_emailConfig.FromName, _emailConfig.From));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = emailTemplate };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_emailConfig.SmtpServer, 587, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailConfig.Username, _emailConfig.Password);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

        //Thong bao khi sign-up thanh congs
        public async Task SendSignupSuccessEmailAsync(string toEmail, string userName)
        {
            string subject = "Welcome to VibeZ!";
            string emailTemplate = GenerateSignUpSuccessTemplate(userName);

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_emailConfig.FromName, _emailConfig.From));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = emailTemplate };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_emailConfig.SmtpServer, 587, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailConfig.Username, _emailConfig.Password);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

        //Notification when login google
        public async Task SendGoogleLoginSuccessEmailAsync(string toEmail, string userName)
        {
            string subject = "Welcome to VibeZ!";
            string emailTemplate = GenerateGoogleLoginSuccessTemplate(userName);

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_emailConfig.FromName, _emailConfig.From));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = emailTemplate };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_emailConfig.SmtpServer, 587, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailConfig.Username, _emailConfig.Password);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

        //Thong bao cho follower khi artist up nhac moi
        public async Task SendNoticeEmail(string toEmail, string subject, string content)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_emailConfig.FromName, _emailConfig.From));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Plain) { Text = content };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_emailConfig.SmtpServer, 587, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailConfig.Username, _emailConfig.Password);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }


        private string GenerateEmailTemplate(string email, string subject, string otpCode)
        {
            // Email template now includes the OTP code
            var result = string.Format(
                @"
<!DOCTYPE html>
<html lang=""en"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>{1} - VibeZ</title>
</head>
<body style=""font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f4f4;"">
    <table role=""presentation"" style=""width: 100%; border-collapse: collapse;"">
        <tr>
            <td style=""padding: 0;"">
                <table role=""presentation"" style=""max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"">
                    <!-- Header -->
                    <tr>
                        <td style=""background-color: #0078D4; padding: 20px; text-align: center;"">
                            <h1 style=""color: #ffffff; margin: 0; font-size: 28px;"">VibeZ</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style=""padding: 30px;"">
                            <h2 style=""color: #0078D4; margin-top: 0; margin-bottom: 20px; font-size: 24px;"">{1}</h2>
                            <p style=""margin-top: 0; margin-bottom: 20px;"">Hello, {0}</p>
                            <p style=""margin-top: 0; margin-bottom: 20px;"">Your OTP code for resetting your password is: <strong>{2}</strong></p>
                            <p style=""margin-top: 0; margin-bottom: 20px;"">This code will expire in 10 minutes.</p>
                            <p style=""margin-top: 0; margin-bottom: 20px;"">If you did not request a password reset, please ignore this email.</p>
                            <p style=""margin-top: 0; margin-bottom: 0;"">Best regards,<br>The VibeZ Team</p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style=""background-color: #f8f8f8; padding: 20px; text-align: center; font-size: 14px; color: #888888;"">
                            <p style=""margin: 0;"">This is an automated message, please do not reply to this email.</p>
                            <p style=""margin: 10px 0 0;"">© 2023 VibeZ. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
", email, subject, otpCode);
            return result;
        }
        private string GeneratePaymentSuccessTemplate(string email, double amount)
        {
            return $@"
        <!DOCTYPE html>
        <html lang=""en"">
        <head>
            <meta charset=""UTF-8"">
            <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
            <title>Payment Successful - VibeZ</title>
            <style>
                body {{ font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }}
                .container {{ max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }}
                .header {{ background-color: #0078D4; padding: 15px; color: #fff; text-align: center; }}
                .header h1 {{ margin: 0; }}
                .content {{ padding: 20px; line-height: 1.6; }}
                .button {{ display: inline-block; padding: 10px 15px; margin-top: 10px; background-color: #0078D4; color: #fff; border-radius: 5px; text-decoration: none; }}
                .footer {{ text-align: center; font-size: 12px; color: #666; padding: 15px; }}
            </style>
        </head>
        <body>
            <div class=""container"">
                <div class=""header"">
                    <h1>Payment Successful</h1>
                </div>
                <div class=""content"">
                    <p>Dear {email},</p>
                    <p>Thank you for your payment of <strong>${amount}</strong>. Your transaction was successful, and your account has been updated accordingly.</p>
                    <p>We appreciate your business and look forward to serving you with more music on VibeZ!</p>
                    <p>For any questions, feel free to reach out to our support team.</p>
                </div>
                <div class=""footer"">
                    <p>&copy; 2023 VibeZ. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }

        private string GenerateGoogleLoginSuccessTemplate(string userName)
        {
            return $@"
        <!DOCTYPE html>
        <html lang=""en"">
        <head>
            <meta charset=""UTF-8"">
            <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
            <title>Welcome to VibeZ - Google Login</title>
            <style>
                body {{ font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }}
                .container {{ max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }}
                .header {{ background-color: #0078D4; padding: 15px; color: #fff; text-align: center; }}
                .header h1 {{ margin: 0; }}
                .content {{ padding: 20px; line-height: 1.6; }}
                .footer {{ text-align: center; font-size: 12px; color: #666; padding: 15px; }}
            </style>
        </head>
        <body>
            <div class=""container"">
                <div class=""header"">
                    <h1>Welcome to VibeZ!</h1>
                </div>
                <div class=""content"">
                    <p>Hello {userName},</p>
                    <p>We’re excited to have you join us! Your account has been created successfully, and you’re all set to explore the world of music on VibeZ.</p>
                    <p>Explore music, create playlists, and enjoy personalized content tailored just for you.</p>
                </div>
                <div class=""footer"">
                    <p>&copy; 2023 VibeZ. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }

        private string GenerateArtistApprovalTemplate(string userName)
        {
            return $@"
        <!DOCTYPE html>
        <html lang=""en"">
        <head>
            <meta charset=""UTF-8"">
            <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
            <title>Artist Approval - VibeZ</title>
            <style>
                body {{ font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }}
                .container {{ max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }}
                .header {{ background-color: #0078D4; padding: 15px; color: #fff; text-align: center; }}
                .header h1 {{ margin: 0; }}
                .content {{ padding: 20px; line-height: 1.6; }}
                .button {{ display: inline-block; padding: 10px 15px; margin-top: 10px; background-color: #0078D4; color: #fff; border-radius: 5px; text-decoration: none; }}
                .footer {{ text-align: center; font-size: 12px; color: #666; padding: 15px; }}
            </style>
        </head>
        <body>
            <div class=""container"">
                <div class=""header"">
                    <h1>Welcome, Verified Artist!</h1>
                </div>
                <div class=""content"">
                    <p>Hello {userName},</p>
                    <p>Congratulations! Your artist application has been reviewed and approved. You’re now officially a verified artist on VibeZ.</p>
                    <p>Get ready to share your music with the world. Head over to your account to start uploading your tracks and engaging with your fans.</p>
                </div>
                <div class=""footer"">
                    <p>&copy; 2023 VibeZ. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }

        private string GenerateSignUpSuccessTemplate(string userName)
        {
            return $@"
        <!DOCTYPE html>
        <html lang=""en"">
        <head>
            <meta charset=""UTF-8"">
            <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
            <title>Welcome to VibeZ</title>
            <style>
                body {{ font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }}
                .container {{ max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }}
                .header {{ background-color: #0078D4; padding: 15px; color: #fff; text-align: center; }}
                .header h1 {{ margin: 0; }}
                .content {{ padding: 20px; line-height: 1.6; }}
                .button {{ display: inline-block; padding: 10px 15px; margin-top: 10px; background-color: #0078D4; color: #fff; border-radius: 5px; text-decoration: none; }}
                .footer {{ text-align: center; font-size: 12px; color: #666; padding: 15px; }}
            </style>
        </head>
        <body>
            <div class=""container"">
                <div class=""header"">
                    <h1>Welcome to VibeZ!</h1>
                </div>
                <div class=""content"">
                    <p>Hello {userName},</p>
                    <p>We’re excited to have you join us! Your account has been created successfully, and you’re all set to explore the world of music on VibeZ.</p>
                    <p>Log in to access your personalized music feed and enjoy your favorite tracks anytime, anywhere.</p>
                </div>
                <div class=""footer"">
                    <p>&copy; 2023 VibeZ. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }

    }
}