import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const UploadSongs = ({ setImage }) => {
    const uploadProps = {
        name: 'image',
        beforeUpload: (file) => {
            setImage(file); // Set image file in parent component state
            return false; // Prevent automatic upload by antd
        },
        onChange(info) {
            if (info.file.status === 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setImage(info.file.originFileObj); // Pass the file to the parent component
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div className="upload-songs">
            <h3>Upload Albums</h3>
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
};

export default UploadSongs;
