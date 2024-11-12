import axios from "axios";

const API_URL = "https://localhost:7241/odata/Listener";

const UpdateUserListener = async (userId, trackId) => {
    try {
        const response = await axios.post(`${API_URL}/listener`, { userId, trackId });

        if (response.status == 200) {
            return "Update successful, no content returned";
        }
        return response.data;
    } catch (error) {
        console.log("Error fetching user & tracnk:", error.message || error);
        throw new Error(
            "Failed to update userlistener: " +
            (error.response?.data?.message || error.message)
        );
    }
}