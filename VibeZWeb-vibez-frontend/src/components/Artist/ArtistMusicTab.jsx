import React, { useState, useEffect, useRef } from 'react';
import trackService from '../../services/trackService';
import albumService from '../../services/albumService';
import './music.css';

const MusicTab = () => {
  const [activeTab, setActiveTab] = useState('songs');
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]); // State for albums
  const [loading, setLoading] = useState(false);
  const [loadingAlbums, setLoadingAlbums] = useState(false); // State for loading albums
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(null); // Track currently playing
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(new Audio());

  const showTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      try {
        const data = await trackService.getAllTracks();
        console.log("Fetched data:", data);
        setTracks(data);
      } catch (error) {
        setError("Error fetching tracks");
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAlbums = async () => {
      setLoadingAlbums(true);
      try {
        const data = await albumService.getAllAlbums(); // Fetch albums
        console.log("Fetched albums:", data);
        setAlbums(data);
      } catch (error) {
        setError("Error fetching albums");
        console.error("Error fetching albums:", error);
      } finally {
        setLoadingAlbums(false);
      }
    };

    fetchAlbums(); // Fetch albums when component mounts
    fetchTracks();
  }, []);

  const handlePlay = (track) => {
    if (currentTrack?.trackId !== track.trackId) {
      audioRef.current.src = track.path; // Set the audio source to the track path
      audioRef.current.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
    };
  }, []);

  return (
    <div className="app-container"> {/* Thay body bằng div */}
      <main id="music-section">
        <h2>Music</h2>
        <div className="tabs">
          <button onClick={() => showTab('songs')}>Songs</button>
          <button onClick={() => showTab('albums')}>Albums</button>
          <button onClick={() => showTab('playlists')}>Playlists</button>
          <button onClick={() => showTab('upcoming')}>Upcoming</button>
        </div>

        {/* Songs Tab */}
        {activeTab === 'songs' && (
          <div id="songs" className="tab-content">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <select>
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 28 days</option>
              </select>
            </div>
            <div className="table-container">
              {loading && <p>Loading songs...</p>}
              {error && <p>Error: {error}</p>}
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Listeners</th>
                    <th>First Added</th>
                    <th>Track</th>
                  </tr>
                </thead>
                <tbody id="songs-data">
                  {tracks.map((track, index) => (
                    <tr key={track.trackId}>
                      <td>{index + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img src={track.image} alt={track.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                          <span>{track.name || 'Unknown Title'}</span>
                        </div>
                      </td>
                      <td>{track.genre || 'Unknown Genre'}</td>
                      <td>{track.listener || 0}</td>
                      <td>
                          {track.createDate ? 
                            (() => {
                              const date = new Date(track.createDate);
                              const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits
                              const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                              const year = date.getFullYear();
                              return `${day}-${month}-${year}`; // Format as dd-mm-yyyy
                            })() : 'N/A'}
                        </td>
                      <td>
                        <audio className="audio-player"
                          controls
                          style={{ width: "100%" }}
                        >
                          <source src={track.path} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Albums Tab */}
        {activeTab === 'albums' && (
          <div id="albums" className="tab-content">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <select>
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 28 days</option>
              </select>
            </div>
            <div className="table-container">
            {loadingAlbums && <p>Loading albums...</p>}
            {error && <p>Error: {error}</p>}
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Release Date</th>
                    <th>Nation</th>
                  </tr>
                </thead>
                <tbody id="albums-data">
                  {/* Data will be populated here */}
                  {albums.map((album, index) => (
                    <tr key={album.id}>
                      <td>{index + 1}</td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img src={album.image} alt={album.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                          <span>{album.name || 'Unknown Title'}</span>
                        </div>
                      <td>{album.dateOfRelease ? 
                        new Date(album.dateOfRelease).toLocaleDateString() : 'N/A'}</td>
                      <td>{album.nation || 'Unknown Nation'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Playlists Tab */}
        {activeTab === 'playlists' && (
          <div id="playlists" className="tab-content">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <select>
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 28 days</option>
              </select>
            </div>
            <h3>Algorithmic</h3>
            <p>Playlists created for a listener based on their taste using crowdsourcing and data.</p>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Source</th>
                    <th>Listeners</th>
                    <th>Streams</th>
                  </tr>
                </thead>
                <tbody id="playlists-data">
                  {/* Data will be populated here */}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Upcoming Tab */}
        {activeTab === 'upcoming' && (
          <div id="upcoming" className="tab-content">
            <p>Upcoming content will be displayed here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MusicTab;
