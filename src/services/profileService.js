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

