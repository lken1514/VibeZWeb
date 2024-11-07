import axios from 'axios';

const API_URL = 'https://localhost:7241/api/Admin';

const getTotalData = async () => {
    try {
        const response = await axios.get(`${API_URL}/total-data`);
        console.log(response.data); 
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message || error);
        throw new Error(
            "Failed to fetch data: " +
            (error.response?.data?.message || error.message)
        );
    }
};

const getArtistData = async () => {
    try {
        const response = await axios.get(`${API_URL}/artist-data`);
        console.log(response.data); 
        return response.data;
    } catch (error) {
        console.error("Error fetching artist admin data:", error.message || error);
        throw new Error(
            "Failed to fetch artist admin data: " +
            (error.response?.data?.message || error.message)
        );
    }
};

const getAdminHome = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin-home`);
        console.log(response.data); 
        return response.data;
    } catch (error) {
        console.error("Error fetching admin home data:", error.message || error);
        throw new Error(
            "Failed to fetch admin home data: " +
            (error.response?.data?.message || error.message)
        );
    }
}

const getAdminBan = async() => {
    try {
        const response = await axios.get(`${API_URL}/admin-ban`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin ban data:", error.message || error);
        throw new Error(
            "Failed to fetch admin ban data: " +
            (error.response?.data?.message || error.message)
        );
    }
}

const getAdminApproval = async() => {
    try {
        const response = await axios.get(`${API_URL}/admin-approval`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin approval data:", error.message || error);
        throw new Error(
            "Failed to fetch admin approval data: " +
            (error.response?.data?.message || error.message)
        );
    }
}
export { getTotalData, getArtistData, getAdminHome, getAdminBan, getAdminApproval };
