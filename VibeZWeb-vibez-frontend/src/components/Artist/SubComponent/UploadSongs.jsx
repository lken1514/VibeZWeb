// UploadSongs.js
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const uploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const UploadSongs = () => (
    <div className="upload-songs">
        <h3>Upload Songs</h3>
        <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} className="upload-button">
                Click to Upload
            </Button>
        </Upload>
        <div className="uploaded-songs-list">
            {/* Display list of uploaded songs here if needed */}
        </div>
    </div>
);

export default UploadSongs;
