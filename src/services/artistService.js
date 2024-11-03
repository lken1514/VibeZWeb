import axios from 'axios';

const API_URL = 'https://localhost:7241/api/Artist';

export const deleteArtistApi = async (id) => {
  console.log(`Deleting artist with id: ${id}`);
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Error deleting artist:", error.message || error);
    throw new Error(
      "Failed to delete artist: " + 
      (error.response?.data?.message || error.message)
    );
  }
};

const getNameArtistById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.name;
  } catch (error) {
    console.error("Error fetching artist name:", error.message);
    throw new Error(
      "Failed to fetch artist: " + 
      (error.response?.data?.message || error.message)
    );
  }
};

const getArtistById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching artist:", error.message);
    throw new Error(
      "Failed to fetch artist: " + 
      (error.response?.data?.message || error.message)
    );
  }
};

const getAllTrackByArtistId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/Tracks/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching artist:", error.message);
    throw new Error(
      "Failed to fetch artist: " + 
      (error.response?.data?.message || error.message)
    );
  }
}

export default{
  getNameArtistById,
  getArtistById,
  getAllTrackByArtistId,
  deleteArtistApi
};
