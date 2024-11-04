import axios from "axios";
const BASE_URL = "https://localhost:7241/odata/Playlist";

const getTracksByPlaylistId = async (playlistId) => {
    try {
      const response = await axios.get(`${BASE_URL}/Tracks/${playlistId}`);
      return response.data; // Trả về dữ liệu playlists
    } catch (error) {
      console.error(
        `Error fetching playlists for TrackPlaylist: ${playlistId}`,
        error
      );
      throw error;
    }
  };// Thay đổi theo địa chỉ backend

  const getPlaylistById = async (playlistId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${playlistId}`);
      return response.data; // Trả về dữ liệu playlists
    } catch (error) {
      console.error(
        `Error fetching playlists for Playlist: ${playlistId}`,
        error
      );
      throw error;
    }
  };// Thay đổi theo địa chỉ backend

  export default {
    getTracksByPlaylistId,
    getPlaylistById
  };
  