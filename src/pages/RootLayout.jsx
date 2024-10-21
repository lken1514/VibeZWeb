// RootLayout.jsx
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import { PlayerContext } from '../context/PlayerContext';
import Navbar from '../components/Navbar';
import Queue from '../components/Queue';
import { useListVisibility } from '../context/VisibleContext';

function RootLayout() {
  const { isListVisible, setIsListVisible } = useListVisibility();
  const { audioRef, track } = useContext(PlayerContext);
  return (
    <div className='h-screen bg-black'>
      <Navbar />
      <div className="h-[83%] flex">
        <Sidebar />
        <Outlet />
        {isListVisible &&
          (<div className='w-[20%]'>
            <Queue />
          </div>)
        }
      </div>
      <Player />
      {track && (
      <audio ref={audioRef} src={track.path} preload='auto'></audio>
      )}
    </div>

  );
}

export default RootLayout;
