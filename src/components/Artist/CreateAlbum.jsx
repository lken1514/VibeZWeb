import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, message } from 'antd';
import UploadSong from './SubComponent/UploadSong';
import albumService from '../../services/albumService';

const CreateAlbum = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [nation, setNation] = useState('');
    const [releaseDate, setReleaseDate] = useState(null); 
    const [image, setImage] = useState(null);
    const artistId = '3dae27c5-9209-4d9d-aea6-a72dfd69a7fc';

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            if (!releaseDate) {
                throw new Error('Release date is required.');
            }
    
            const yy = releaseDate.year();
            const mm = (releaseDate.month() + 1).toString().padStart(2, '0');
            const dd = releaseDate.date().toString().padStart(2, '0');
    
            const formData = new FormData();
            formData.append('artistId', artistId);
            formData.append('name', name);
            formData.append('yy', yy);
            formData.append('mm', mm);
            formData.append('dd', dd);
            formData.append('image', image);
            formData.append('nation', nation);
    
            // Log FormData contents to verify they are correctly set
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
    
            // Send formData directly to createAlbum
            await albumService.createAlbum(formData);
    
            message.success('Album created successfully!');
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            message.error(`Failed to create album: ${error.message}`);
        }
    };
    
    const resetForm = () => {
        setName('');
        setNation('');
        setReleaseDate(null); // Reset the date
        setImage(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal} className="common-button">Create Album</Button>
            <Modal
                title="Create Album"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form layout="vertical">
                    <Form.Item label="Album Title" required>
                        <Input
                            placeholder="Enter album title"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Release Date" required>
                        <DatePicker 
                            style={{ width: '100%' }}
                            onChange={(date) => setReleaseDate(date)} 
                            placeholder="Select release date"
                        />
                    </Form.Item>
                    <UploadSong setImage={setImage} /> {/* Pass a function to set the image */}
                    <Form.Item label="Nation" required>
                        <Input
                            placeholder="Enter nation"
                            value={nation}
                            onChange={(e) => setNation(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleOk} className="submit-button">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateAlbum;
