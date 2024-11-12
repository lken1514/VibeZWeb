import axios from 'axios';

const API_URL = 'https://localhost:7241/api/profile';

export const getUserProfile = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        const playlistCount = response.data.playlists ? response.data.playlists.length : 0;
        const followingCount = response.data.following ? response.data.following.length : 0;
        const fetchedProfileData = {
            name: response.data.name,
            playlistCount,
            followingCount,
            image: response.data.image || ''
        };
        const fetchedPageData = {
            topArtists: response.data.topArtists,
            topTracks: response.data.topTracks,
            playlists: response.data.myPlaylists
        };

        return { fetchedProfileData, fetchedPageData };
    } catch (error) {
        console.error("Error fetching user profile:", error.message || error);
        throw new Error("Failed to fetch user profile: " + (error.response?.data?.message || error.message));
    }
}


export const editProfile = async (email, gender, day, month, year) => {
    try {
        const response = await axios.post(`https://localhost:7241/odata/User/profileedit`, { email, gender, year, month, day });

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
