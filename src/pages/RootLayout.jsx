// RootLayout.js
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import { PlayerContext } from '../context/PlayerContext';
import Navbar from '../components/Navbar';
import Queue from '../components/Queue';
import { useListVisibility } from '../context/VisibleContext';
import { ClipLoader } from 'react-spinners';
import SongInfo from '../components/SongInfo';
import { LoginContext } from '../context/LoginContext';

function RootLayout() {
  const { isListVisible } = useListVisibility();
  const { audioRef, track, isLoading: isTrackLoading } = useContext(PlayerContext);
  const { Info, userInfo, loading: loginLoading } = useContext(LoginContext);

  const premium = userInfo?.premium || '';
  console.log('prenium: ' + premium);
  
  if (loginLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader color="#ffffff" size={60} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-black select-none overflow-scroll">
      <Navbar />
      <div className={`flex gap-1 ${track ? 'h-[83%]' : 'h-full'}`}>
        {(premium !== 'Free' && premium !== 'Mini') && <Sidebar />}
        <Outlet />
        {isListVisible && (
          <div className="relative flex-shrink-0 h-full" style={{ width: '20%' }}>
            <Queue />
          </div>
        )}
        {Info && (
          <div className="w-[20%] bg-[#121212] ">
            <SongInfo />
          </div>
        )}
      </div>
      {track && (
        <>
          <Player />
          <audio ref={audioRef} src={track.path} preload="auto" autoPlay></audio>
        </>
      )}
      {isTrackLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ClipLoader color="#ffffff" size={60} />
        </div>
      )}
    </div>
  );
}

export default RootLayout;
