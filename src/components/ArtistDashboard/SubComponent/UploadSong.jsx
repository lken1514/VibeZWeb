import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const UploadSong = ({ setImage, setPath }) => {
  const imageUploadProps = {
    name: 'image',
    beforeUpload: (file) => {
      console.log('Image file selected:', file); // Log image file details
      if (!file.type.startsWith('image/')) {
        message.error('You can only upload image files!');
        return false;
      }
      setImage(file);  // Set image in parent component state
      return false; // Prevent automatic upload by antd
    },
    onChange(info) {
      console.log('Image upload status:', info.file.status); // Log upload status
      if (info.file.status === 'done') {
        message.success(`${info.file.name} image uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} image upload failed.`);
      }
    },
  };

  const audioUploadProps = {
    name: 'audio',
    beforeUpload: (file) => {
      console.log('Audio file selected:', file); // Log audio file details
      if (!file.type.startsWith('audio/mpeg')) {
        message.error('You can only upload MP3 files!');
        return false;
      }
      setPath(file);  // Set audio file (MP3) in parent component state
      return false; // Prevent automatic upload
    },
    onChange(info) {
      console.log('Audio upload status:', info.file.status); // Log upload status
      if (info.file.status === 'done') {
        message.success(`${info.file.name} audio uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} audio upload failed.`);
      }
    },
  };

  return (
    <div className="upload-songs">
      <h3>Upload Image</h3>
      <Upload {...imageUploadProps}>
        <Button icon={<UploadOutlined />} className="upload-button">
          Click to Upload Image
        </Button>
      </Upload>

      <h3>Upload Audio (MP3)</h3>
      <Upload {...audioUploadProps}>
        <Button icon={<UploadOutlined />} className="upload-button">
          Click to Upload MP3 File
        </Button>
      </Upload>
    </div>
  );
};

export default UploadSong;
