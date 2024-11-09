import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import trackService from "../../services/trackService"; 

const EditTrack = () => {
  const { albumId, trackId } = useParams(); 
  const navigate = useNavigate();
  
  const [trackData, setTrackData] = useState({
    trackName: "",
    lyrics: "",
    genre: "",
    hour: 0,
    minute: 0,
    second: 0,
    image: null,
    path: null,
    trackLRC: null, 
    songInfoImg: null 
  });

  useEffect(() => {
    console.log('Album ID:', albumId);
    console.log('Track ID:', trackId);

    const fetchTrackData = async () => {
      try {
        console.log("Fetching track data...");
        const data = await trackService.getTrackById(trackId); 
        const [hour, minute, second] = data.time.split(":").map((part) => parseInt(part, 10));
        console.log("Track data fetched:", data);

        setTrackData({
          trackName: data.name,
          lyrics: data.lyrics,
          genre: data.genre,
          hour: hour || 0,    // Default to 0 if undefined
          minute: minute || 0, // Default to 0 if undefined
          second: second || 0,
          image: data.image,
          path: data.path,
          trackLRC: data.trackLRC || null,
          songInfoImg: data.songInfoImg || null,
        });
      } catch (error) {
        console.error("Error fetching track data", error);
      }
    };

    fetchTrackData();
  }, [trackId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", trackData);
    
    try {
      const formData = new FormData();
      formData.append('trackName', trackData.trackName);
      formData.append('lyrics', trackData.lyrics);
      formData.append('genre', trackData.genre);
      formData.append('hour', trackData.hour);
      formData.append('minute', trackData.minute);
      formData.append('second', trackData.second);
      formData.append('albumId', albumId);

      if (trackData.image) {
        formData.append('image', trackData.image);
      }

      if (trackData.path) {
        formData.append('path', trackData.path);
      }
      if (trackData.trackLRC) formData.append('trackLRC', trackData.trackLRC);
      if (trackData.songInfoImg) formData.append('songInfoImg', trackData.songInfoImg);

      console.log("Sending form data:", formData);
      
      await trackService.updateTrack(trackId, formData); // Call API to update track
      alert("Track updated successfully!");
      navigate(`/artistdashboard/music/album/${albumId}`); // Navigate back to the album page
    } catch (error) {
      console.error("Error updating track", error);
      alert("Failed to update track.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Track</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="trackName" className="block text-lg font-medium mb-2">Track Name</label>
          <input
            type="text"
            id="trackName"
            value={trackData.trackName}
            onChange={(e) => setTrackData({ ...trackData, trackName: e.target.value })}
            required
            className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="lyrics" className="block text-lg font-medium mb-2">Lyrics</label>
          <textarea
            id="lyrics"
            value={trackData.lyrics}
            onChange={(e) => setTrackData({ ...trackData, lyrics: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="genre" className="block text-lg font-medium mb-2">Genre</label>
          <input
            type="text"
            id="genre"
            value={trackData.genre}
            onChange={(e) => setTrackData({ ...trackData, genre: e.target.value })}
            required
            className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-lg font-medium mb-2">Track Time</label>
          <div className="flex space-x-4">
            <input
              type="number"
              id="hour"
              value={trackData.hour}
              onChange={(e) => setTrackData({ ...trackData, hour: e.target.value })}
              className="w-16 p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              id="minute"
              value={trackData.minute}
              onChange={(e) => setTrackData({ ...trackData, minute: e.target.value })}
              required
              className="w-16 p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              id="second"
              value={trackData.second}
              onChange={(e) => setTrackData({ ...trackData, second: e.target.value })}
              required
              className="w-16 p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium mb-2">Track Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setTrackData({ ...trackData, image: e.target.files[0] })}
            className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="path" className="block text-lg font-medium mb-2">Track File</label>
          <input
            type="file"
            id="path"
            onChange={(e) => setTrackData({ ...trackData, path: e.target.files[0] })}
            className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition-all">Update Track</button>
      </form>
    </div>
  );
};

export default EditTrack;
