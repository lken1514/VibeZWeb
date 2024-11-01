// src/services/albumService.js
import axios from 'axios';

const API_URL = 'https://localhost:7241/api/Artist'; // Thay đổi theo địa chỉ backend

// Hàm lấy tên nghệ sĩ theo ID
const getNameArtistById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.name; // Trả về tên nghệ sĩ từ API
  } catch (error) {
    console.error("Error fetching artist name:", error.message || error);
    throw new Error(
      "Failed to fetch artist: " + 
      (error.response?.data?.message || error.message)
    );
  }
};

const getArtistById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Trả về tên nghệ sĩ từ API
  } catch (error) {
    console.error("Error fetching artist:", error.message || error);
    throw new Error(
      "Failed to fetch artist: " + 
      (error.response?.data?.message || error.message)
    );
  }
}
const getAllTrackByArtistId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/Tracks/${id}`);
    return response.data; // Trả về tên nghệ sĩ từ API
  } catch (error) {
    console.error("Error fetching artist:", error.message || error);
    throw new Error(
      "Failed to fetch artist: " + 
      (error.response?.data?.message || error.message)
    );
  }
}
const unfollowArtist = async (artistId, libraryId) => {
  // Kiểm tra xem artistId và libraryId có được cung cấp hay không
  if (!artistId || !libraryId) {
    console.error("Artist ID and Library ID are required to unfollow an artist");
    return;
  }

  try {
    // Gọi API DELETE để xóa mối quan hệ giữa artist và library
    const response = await axios.delete(`https://localhost:7241/api/Library_Artist/${libraryId}/${artistId}`);
    return response.status; // Trả về mã trạng thái của response
  } catch (error) {
    console.error(`Error unfollowing artist with ID ${artistId}`, error.response?.data || error.message);
    throw error; // Ném lỗi ra ngoài để có thể xử lý trong phần gọi hàm
  }
};
// Hàm để đề xuất nghệ sĩ dựa trên lịch sử của người dùng
const suggestArtists = async () => {
  try {
    const recentlyPlayed =
      JSON.parse(localStorage.getItem("RecentlyPlayed")) || [];
    const validIds = recentlyPlayed.filter(Boolean); 
    // Kiểm tra nếu danh sách ID hợp lệ trống
    if (!validIds.length) {
      console.log("No valid IDs found.");
      return [];
    }

    // Gọi API SuggestArtist với validIds là userHistory
    const response = await axios.post(`${API_URL}/SuggestArtist`, validIds, {
      headers: { 'Content-Type': 'application/json' }
    });

    return response.data; // Trả về danh sách nghệ sĩ được đề xuất từ API
  } catch (error) {
    console.error("Error suggesting artists:", error.message || error);
    throw new Error(
      "Failed to suggest artists: " + 
      (error.response?.data?.message || error.message)
    );
  }
};

const FollowArtist = async (libId, artistId) => {
  try {
    const formData = new FormData();
    formData.append('libId', libId);
    formData.append('artistId', artistId);
    const response = await axios.post(`https://localhost:7241/api/Library_Artist/Follow`, formData);
    return response.status === 200 ? "Ok" : null; // Trả về dữ liệu từ API nếu cần
  } catch (error) {
    console.error("Error creating Library_Artist relationship:", error.message || error);
    throw new Error(
      "Failed to create Library_Artist relationship: " + 
      (error.response?.data?.message || error.message)
    );
  }
};

const getFollowArtist = async (libId, artistId) => {
  try {
    const response = await axios.get(`https://localhost:7241/api/Library_Artist/${libId}/${artistId}`);
    return response.status === 200 ? "Ok" : null; // Trả về dữ liệu từ API nếu cần
  } catch (error) {
    console.error("Error creating Library_Artist relationship:", error.message || error);
    throw new Error(
      "Failed to create Library_Artist relationship: " + 
      (error.response?.data?.message || error.message)
    );
  }
};
// Xuất các service
export default { getNameArtistById, getArtistById, getAllTrackByArtistId, unfollowArtist, suggestArtists, FollowArtist, getFollowArtist };
