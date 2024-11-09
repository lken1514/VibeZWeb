import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, InputNumber, message } from 'antd';
import trackService from '../../services/trackService';
import UploadSong from './SubComponent/UploadSong';
import ArtistDashboardService from "../../services/artistDashboardService";

const CreateTrack = () => {
  const { id: albumId } = useParams();
  const [trackName, setTrackName] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [genre, setGenre] = useState('');
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [path, setPath] = useState(null);
  const [image, setImage] = useState(null);
  const [artist, setArtist] = useState();
  const [trackLRC, setTrackLRC] = useState(null);
  const [songInfoImg, setSongInfoImg] = useState(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const getArtist = async () => {
    try {
      const artistData = await ArtistDashboardService.getArtistByUserId(userId);
      setArtist(artistData);
  } catch (error) {
      console.error('Error fetching artist:', error);
  }
}; getArtist();
}, []);

  // Submit handler for creating track
  const handleSubmit = async (values) => {
    if (!path) {
      message.error('Please upload the song file (MP3).');
      return;
    }
    if (!image) {
      message.error('Please upload the album cover image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('AlbumId', albumId);
      formData.append('TrackName', trackName);
      formData.append('Lyrics', lyrics);
      formData.append('Genre', genre);
      formData.append('hour', hour);
      formData.append('minute', minute);
      formData.append('second', second);
      formData.append('artistId', artist.id);
      formData.append('path', path);
      formData.append('image', image);
      if (trackLRC) {
        formData.append('trackLRC', trackLRC);
      }
      if (songInfoImg) {
        formData.append('songInfoImg', songInfoImg);
      }

      await trackService.createTrack(formData);

      message.success('Track created successfully!');
      resetForm();
    } catch (error) {
      message.error(`Failed to create track: ${error.message}`);
    }
  };

  // Reset the form state after submission
  const resetForm = () => {
    setTrackName('');
    setCategoryId('');
    setLyrics('');
    setGenre('');
    setHour(0);
    setMinute(0);
    setSecond(0);
    setPath(null);
    setImage(null);
    setTrackLRC(null);
    setSongInfoImg(null);
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Create a New Track</h2>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Track Title" required>
          <Input
            placeholder="Enter track title"
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Genre">
          <Input
            placeholder="Enter genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Lyrics">
          <Input.TextArea
            placeholder="Enter lyrics"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
          />
        </Form.Item>

        {/* Improved Duration Section */}
        <Form.Item label="Duration">
          <div style={{ display: 'flex', gap: '8px' }}>
            <InputNumber
              min={0}
              placeholder="Hours"
              value={hour}
              onChange={(value) => setHour(value)}
              style={{ width: '80px' }}
            />
            <InputNumber
              min={0}
              max={59}
              placeholder="Minutes"
              value={minute}
              onChange={(value) => setMinute(value)}
              style={{ width: '80px' }}
            />
            <InputNumber
              min={0}
              max={59}
              placeholder="Seconds"
              value={second}
              onChange={(value) => setSecond(value)}
              style={{ width: '80px' }}
            />
          </div>
        </Form.Item>

        <UploadSong setPath={setPath} setImage={setImage} setTrackLRC={setTrackLRC} setSongInfoImg={setSongInfoImg} />

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTrack;
