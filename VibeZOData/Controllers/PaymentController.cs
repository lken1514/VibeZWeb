using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; // Thêm using cho ILogger
using Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessObjects;
using Repositories.Repository;

namespace VibeZOData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IU_PackageRepository _uPackageRepository;
        private readonly ILogger<PaymentController> _logger; // Thêm ILogger vào controller

        public PaymentController(IPaymentRepository paymentRepository,IU_PackageRepository u_PackageRepository, ILogger<PaymentController> logger)
        {
            _paymentRepository = paymentRepository;
            _uPackageRepository = u_PackageRepository;
            _logger = logger; // Khởi tạo logger
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Payment>>> GetAllPayments()
        {
            _logger.LogInformation("Fetching all payments."); // Log thông tin
            var payments = await _paymentRepository.GetAllPayments();
            return Ok(payments);
        }

        [HttpGet("userpackages/{userId}")]
        public async Task<ActionResult<IEnumerable<User_package>>> GetUserPackagesByUserId(Guid userId)
        {
            var userPackages = await _uPackageRepository.GetPackageByUserId(userId);
            if (userPackages == null || !userPackages.Any())
            {
                _logger.LogWarning($"No user packages found for User ID: {userId}"); 
                return NotFound($"No user packages found for User ID {userId}");
            }
            return Ok(userPackages);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetPaymentById(Guid id)
        {
            _logger.LogInformation($"Fetching payment with ID: {id}"); // Log thông tin
            var payment = await _paymentRepository.GetPaymentById(id);
            if (payment == null)
            {
                _logger.LogWarning($"No payment found with ID: {id}"); // Log cảnh báo
                return NotFound($"No payment found with ID {id}");
            }
            return Ok(payment);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreatePayment([FromBody] Payment payment)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Model state is invalid."); // Log cảnh báo
                return BadRequest(ModelState);
            }

            payment.Id = Guid.NewGuid(); // Tạo ID cho thanh toán mới
            await _paymentRepository.AddPayment(payment);
            _logger.LogInformation($"Payment created successfully with ID: {payment.Id}"); // Log thông tin
            return Ok(new { message = "Payment created successfully" });
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult> UpdatePayment(Guid id, [FromBody] Payment updatedPayment)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Model state is invalid."); // Log cảnh báo
                return BadRequest(ModelState);
            }

            var payment = await _paymentRepository.GetPaymentById(id);
            if (payment == null)
            {
                _logger.LogWarning($"No payment found with ID: {id}"); // Log cảnh báo
                return NotFound($"No payment found with ID {id}");
            }

            updatedPayment.Id = id; // Đảm bảo ID không thay đổi
            await _paymentRepository.UpdatePayment(updatedPayment);
            _logger.LogInformation($"Payment with ID: {id} updated successfully."); // Log thông tin
            return Ok(new { message = "Payment updated successfully" });
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeletePayment(Guid id)
        {
            var payment = await _paymentRepository.GetPaymentById(id);
            if (payment == null)
            {
                _logger.LogWarning($"No payment found with ID: {id}"); // Log cảnh báo
                return NotFound($"No payment found with ID {id}");
            }

            await _paymentRepository.DeletePayment(id);
            _logger.LogInformation($"Payment with ID: {id} deleted successfully."); // Log thông tin
            return Ok(new { message = "Payment deleted successfully" });
        }
    }
}
