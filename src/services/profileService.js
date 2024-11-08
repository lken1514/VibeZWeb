import axios from 'axios';

const API_URL = 'https://localhost:7241/odata/User';

export const editProfile = async (email, gender, day, month, year) => {
    try {
        const response = await axios.post(`${API_URL}/profileedit`, { email, gender, year, month, day });

        if (response.data) {
            console.log('Edit successful.');
            return;// Trả về thông tin người dùng
        } else {
            console.log("Edit Failed.");
            throw new Error("Edit failed: no data returned."); // Ném lỗi nếu không có data
        }
    } catch (error) {
        console.error("Login error:", error.message || error); // In ra lỗi
        throw new Error("Login failed: " + (error.response?.data?.message || error.message)); // Ném lỗi với thông điệp rõ ràng
    }
}

export default {editProfile};