// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://localhost:7241/odata'; // Thay đổi theo địa chỉ backend

const authService = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });

        if (response.data?.token) {
            localStorage.setItem('jwtToken', response.data.token);
            localStorage.setItem('username', JSON.stringify(response.data.username));
            localStorage.setItem('userId', JSON.stringify(response.data.id))
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

const responseGoogle = async (response) => {
    const token = response.credential;
    try {
      const res = await axios.post(`${API_URL}/google-login`, { token });

      if (res.data?.token) {
        localStorage.setItem('jwtToken', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
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

        if (response.status === 200) {
            console.log('Registration successful. Proceeding to login...');
        } else {
            console.log("Registration failed.");
            throw new Error("Registration failed.");
        }
    } catch (error) {
        console.error("Registration error:", error.message || error);
        throw new Error("Registration failed: " + (error.response?.data?.message || error.message));
    }
};

export default { authService, registerService, responseGoogle };