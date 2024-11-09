import React, { useState } from 'react';
// import userService from '../services/userService';  

function ArtistVerificationRequestForm() {
  const [artistName, setArtistName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [audioFile, setAudioFile] = useState(null);  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form data to be sent to backend
    const formData = new FormData();
    formData.append('artistName', artistName);
    formData.append('email', email);
    formData.append('reason', reason);
    formData.append('audioFile', audioFile);  // Append audio file

    try {
      const response = await userService.verifyArtistTrack(formData);
      if (response.data.isVerified) {
        setMessage("Your track has been successfully verified. You are now a verified artist.");
      } else {
        setMessage("Verification failed. Original content could not be confirmed.");
      }
      setArtistName('');
      setEmail('');
      setReason('');
      setAudioFile(null);
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col justify-center items-center p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-600">forArtists</h1>
      </header>

      <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-white mb-4">Claim your Artist Profile</h2>
        <p className="text-gray-400 mb-4">
          To become a verified artist, please fill in the form below and submit it. Our system will review your track for originality.
        </p>

        {message && (
          <div className={`p-2 rounded-lg mb-4 ${message.includes("successfully") ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="artistName" className="block text-gray-300">Artist Name</label>
            <input
              type="text"
              id="artistName"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 text-white rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 text-white rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="reason" className="block text-gray-300">Reason for Verification</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 text-white rounded-md"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="audioFile" className="block text-gray-300">Upload Your Track (Audio File)</label>
            <input
              type="file"
              id="audioFile"
              onChange={handleAudioChange}
              className="w-full text-white"
              accept="audio/*"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500 transition-all mb-4"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Request Verification'}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center">
          Once reviewed, you will receive an email confirmation if your profile is verified.
        </p>
      </div>
    </div>
  );
}

export default ArtistVerificationRequestForm;
