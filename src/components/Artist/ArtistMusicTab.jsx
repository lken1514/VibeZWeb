import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import trackService from '../../services/trackService';
import albumService from '../../services/albumService';
import { FiEdit, FiTrash } from 'react-icons/fi';
import './music.css';

const MusicTab = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('songs');
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [errorTracks, setErrorTracks] = useState(null); // Separate error state for tracks
  const [errorAlbums, setErrorAlbums] = useState(null); // Separate error state for albums
  const [isPlaying, setIsPlaying] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(new Audio());
  const a = '70507740-ce24-460e-8053-1bacb2b184f1';

  const showTab = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoadingAlbums(true);
      try {
        const data = await albumService.getAllAlbums();
        console.log("Fetched albums:", data);
        setAlbums(data);
      } catch (error) {
        setErrorAlbums("Error fetching albums");
        console.error("Error fetching albums:", error);
      } finally {
        setLoadingAlbums(false);
      }
    };

    const fetchTracks = async () => {
      //if (albumId) {
      setLoading(true);
      try {
        const data = await trackService.getAllTracks();
        console.log("Fetched tracks:", data);
        setTracks(data);
      } catch (error) {
        setErrorTracks("Error fetching tracks");
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
      }
      //}
    };

    fetchAlbums();
    fetchTracks();
  }, [albumId]); // Fetch tracks when albumId changes

  const handlePlay = (track) => {
    if (currentTrack?.trackId !== track.trackId) {
      audioRef.current.src = track.path;
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
    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
    };
  }, []);

  const handleEditAlbum = (albumId) => {
    navigate(`/artistdashboard/music/album/${albumId}/edit`);
  };
  const handleDeleteAlbum = async (albumId) => {
    try{
      await trackService.deleteTracksByAlbumId(albumId);
      await albumService.deleteAlbum(albumId);
      setAlbums(albums.filter(album => album.id !== albumId));
      alert("Album deleted successfully!");
    }catch(error){
      console.error("Error deleting album", error);
      alert("Failed to delete album.");
  };
};

  return (
    <div className="app-container">
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
              {errorTracks && <p>Error: {errorTracks}</p>}
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
                    <tr
                      key={track.trackId}
                      className={currentTrack?.trackId === track.trackId ? 'playing' : ''}
                      onClick={() => handlePlay(track)}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img src={track.image} alt={track.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                          <span>{track.name || 'Unknown Title'}</span>
                        </div>
                      </td>
                      <td>{track.genre || 'Unknown Genre'}</td>
                      <td>{track.listener || 0}</td>
                      <td>{track.createDate ? formatDate(track.createDate) : 'N/A'}</td>
                      <td>
                        <audio className="audio-player" controls style={{ width: "100%" }}>
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
              {errorAlbums && <p>Error: {errorAlbums}</p>}
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Release Date</th>
                    <th>Nation</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="albums-data">
                  {albums.map((album, index) => (
                    <tr
                      key={album.id}
                      onClick={() => navigate(`/artistdashboard/music/album/${album.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img src={album.image} alt={album.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                          <span>{album.name || 'Unknown Title'}</span>
                        </div>
                      </td>
                      <td>{album.dateOfRelease ? formatDate(album.dateOfRelease) : 'N/A'}</td>
                      <td>{album.nation || 'Unknown Nation'}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <FiEdit
                            className="icon edit-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAlbum(album.id);
                            }}
                            style={{
                              cursor: 'pointer',
                            }}
                          />
                          <FiTrash
                            className="icon delete-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAlbum(album.id);
                            }}
                            style={{
                              cursor: 'pointer',
                            }}
                          />
                        </div>
                      </td>
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
