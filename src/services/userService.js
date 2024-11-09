import axios from "axios";

const BASE_URL = "https://localhost:7241/odata/User";

const getUserById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        console.log("Get user by id response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Get user by id failed:", error.message || error);
        throw new Error("Get user by id failed: " + (error.response?.data?.message || error.message));
    }
}

const verifyTrack = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/verify`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log("Track verification response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Track verification failed:", error.message || error);
        throw new Error("Track verification failed: " + (error.response?.data?.message || error.message));
    }
};

export default { getUserById, verifyTrack };