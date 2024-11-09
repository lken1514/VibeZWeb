// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://localhost:7241/odata'; 

const authServices = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });

        if (response.data?.token) {
            localStorage.setItem('jwtToken', response.data.token);
            localStorage.setItem('username', JSON.stringify(response.data.user.name));
            localStorage.setItem('userId', JSON.stringify(response.data.user.id))
            localStorage.setItem('premium', JSON.stringify(response.data.user.premium))
            console.log('Login successful');
            return response.data; // Trả về thông tin người dùng
        } else {
            console.log("Login failed, no token returned.");
            throw new Error("Login failed: no token returned."); // Ném lỗi nếu không có token
        }
    } catch (error) {
        console.error("Login error:", error.message || error); // In ra lỗi
        throw new Error("Login failed: " + (error.response?.data?.message || error.message)); // Ném lỗi với thông điệp rõ ràng
    }
};

const updatePremiumStatus = async (userId, premiumStatus) => {
    try {
      // Thực hiện lệnh PUT tới endpoint /premium{userId}
      const response = await axios.put(`https://localhost:7241/premium/${userId}`, null, {
        params: {
          premium: premiumStatus,
        },
      });
  
      // Kiểm tra trạng thái của response
      return response.status === 200 ? "Updated successfully." : null;
    } catch (error) {
      console.error("Error updating premium status:", error.message || error);
      throw new Error(
        "Failed to update premium status: " +
        (error.response?.data || error.message)
      );
    }
  };

  
const responseGoogle = async (response) => {
    const token = response.credential;
    try {
      const res = await axios.post(`${API_URL}/google-login`, { token });

      if (res.data?.token) {
        localStorage.setItem('jwtToken', res.data.token);
        localStorage.setItem('userId', JSON.stringify(res.data.user.id));
        return res.data;
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
    }
};


const registerService = async (name, username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, username, email, password });

        return response.status === 200 ? response.data.message : null;
    } catch (error) {
        console.error("Registration error:", error.message || error);
        throw new Error("Registration failed: " + (error.response?.data?.message || error.message));
    }
};

const forgotPassword = async (email) => {
  try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.status === 200 ? response.data : null;
  } catch (error) {
      console.error("Forgot Password error:", error.message || error);
      throw new Error("Failed to send password reset email: " + (error.response?.data || error.message));
  }
};

const verifyOtp = async (email, otp) => {
  try {
      const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
      return response.status === 200 ? response.data : null;
  } catch (error) {
      console.error("OTP Verification error:", error.message || error);
      throw new Error("OTP verification failed: " + (error.response?.data || error.message));
  }
};

const resetPassword = async (email, otp, newPassword) => {
  try {
      const response = await axios.post(`${API_URL}/reset-password`, { email, otp, newPassword });
      return response.status === 200 ? response.data : null;
  } catch (error) {
      console.error("Password Reset error:", error.message || error);
      throw new Error("Password reset failed: " + (error.response?.data || error.message));
  }
};

export default { authServices, registerService, responseGoogle, updatePremiumStatus, forgotPassword, verifyOtp, resetPassword };