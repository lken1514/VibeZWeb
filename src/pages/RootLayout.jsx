import React, { useContext, useState, useEffect } from 'react';
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
import artistService from '../services/artistService';
import { data } from 'autoprefixer';
function RootLayout() {
  const { isListVisible } = useListVisibility();
  const { audioRef, track, isLoading } = useContext(PlayerContext);
  const { Info } = useContext(LoginContext);

  const [queueWidth, setQueueWidth] = useState(300); // Đặt độ rộng ban đầu cho Queue
  const [isResizing, setIsResizing] = useState(false); // Để kiểm soát khi người dùng đang kéo
  const [artist, setArtist] = useState();
  const [isFollow, setFollow] = useState(false);
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        if (track) {
          const data = await artistService.getArtistById(track.artistId);
          setArtist(data);
          console.log(data);
        }

      } catch (error) {
        console.error(error.message);
      }
    }
    fetchArtist();
  }, [track]);

  useEffect(() => {
    const fetchFollow = async () => {
      try {
        const libId = JSON.parse(localStorage.getItem('libId'));
        const isFollow = await artistService.getFollowArtist(libId, track.artistId);
        console.log(isFollow)
        if (isFollow) {
          setFollow(true);
        }
      } catch (error) {
        console.error(error.message); // Lưu lỗi nếu xảy ra
        setFollow(false);
      }
    }
    fetchFollow();
  }, [track]);

  // Hàm xử lý bắt đầu kéo
  const handleMouseDown = () => {
    setIsResizing(true);
  };

  // Hàm xử lý khi kéo (thay đổi độ rộng)
  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= window.innerWidth * 0.2 && newWidth <= window.innerWidth * 0.23) { // Giới hạn trong khoảng 20% đến 23%
        setQueueWidth(newWidth);
      }
    }
  };

  // Hàm xử lý khi ngừng kéo
  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Đăng ký sự kiện toàn cục khi kéo
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className='h-screen bg-black select-none overflow-scroll'>
      <Navbar />
      <div className={`flex gap-1 ${track ? 'h-[83%]' : 'h-full'}`}>
        <Sidebar />
        <Outlet />
        {isListVisible && !Info &&  (
          <div className='relative flex-shrink-0 h-full' style={{ width: `${queueWidth}px`, maxWidth: '25%', minWidth: '20%' }}>
            <div
              className={`absolute top-0 left-0 w-1 h-full bg-gray-950 ${isResizing ? 'cursor-grabbing' : '!cursor-grab'}`}
              onMouseDown={handleMouseDown}
            ></div>
            <Queue queueWidth={queueWidth} />
          </div>
        )}
        {Info && (
          <div className='w-[20%] bg-[#121212] '>
            <SongInfo artist={artist} track={track} isFollow={isFollow} setFollow={setFollow} />
          </div>
        )}
      </div>
      {track && (
        <>
          <Player />
          <audio ref={audioRef} src={track.path} preload='auto' autoPlay></audio>
        </>
      )}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <ClipLoader color="#ffffff" size={60} />
        </div>
      )}
    </div>
  );
}

export default RootLayout;
