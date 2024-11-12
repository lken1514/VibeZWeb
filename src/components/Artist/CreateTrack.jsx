import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, InputNumber, message } from 'antd';
import trackService from '../../services/trackService';
import UploadSong from '../ArtistDashboard/SubComponent/UploadSong';

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
  const artistId = 'fd0445ac-e007-4336-8d34-44fb0dac37dc';

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
      formData.append('artistId', artistId);
      formData.append('path', path);
      formData.append('image', image);

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

        <UploadSong setPath={setPath} setImage={setImage} />

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
