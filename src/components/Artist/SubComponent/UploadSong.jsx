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
    name: 'file', // Change 'audio' to 'file' to generalize
    beforeUpload: (file) => {
      console.log('File selected:', file); // Log file details
      setPath(file);  // Set file in parent component state
      return false; // Prevent automatic upload
    },
    onChange(info) {
      console.log('File upload status:', info.file.status); // Log upload status
      if (info.file.status === 'done') {
        message.success(`${info.file.name} uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} upload failed.`);
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
