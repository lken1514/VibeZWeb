import { createContext, useEffect, useRef, useState } from "react";
import Queue from 'queue-fifo';
import trackService from "../services/trackService";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(); // Khởi tạo audio ref
  const seekBg = useRef();
  const seekBar = useRef();

  const [currentIndex, setCurrentIndex] = useState(0); // Index của bài hát hiện tại
  const [songsData, setSongsData] = useState([]); // Lưu danh sách bài hát (ai muốn chỉnh nhạc thì dùng hàm ni set)
  const [track, setTrack] = useState(null); // Bài hát hiện tại
  const [playStatus, setPlayStatus] = useState(false); // Trạng thái phát nhạc
  const [repeat, setRepeat] = useState(false); // Trạng thái lặp lại bài hát
  const [volume, setVolume] = useState(1); // Giá trị mặc định âm lượng


  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const [recentlyPlayedQueue, setRecentlyPlayedQueue] = useState(new Queue());
  const maxQueueSize = 10;

  // Lấy danh sách bài hát từ API và đặt bài hát đầu tiên
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        if (songsData.length > 0) {
          setTrack(songsData[currentIndex]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.message);
      }
    };

    fetchSongs();
  }, [songsData]);

  // Cập nhật trạng thái thanh thời gian
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;

        if (duration) {
          const progress = (currentTime / duration) * 100;
          seekBar.current.style.width = `${progress}%`; // Cập nhật đúng chiều rộng của thanh seekBar

          setTime({
            currentTime: {
              second: Math.floor(currentTime % 60) || 0,
              minute: Math.floor(currentTime / 60) || 0,
            },
            totalTime: {
              second: Math.floor(duration % 60) || 0,
              minute: Math.floor(duration / 60) || 0,
            },
          });
        }
      };
    }
  }, [audioRef, track]);

  // Cập nhật sự kiện khi bài hát kết thúc
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = async () => {
        if (repeat) {
          // Nếu chế độ lặp lại bật, phát lại bài hát hiện tại
          await audioRef.current.play();
        } else {
          // Nếu không lặp lại, chuyển sang bài hát tiếp theo
          await next();
        }
      };
    }
  }, [track, currentIndex, songsData, repeat]);

  const updateRecentlyPlayedQueue = (trackId) => { //Dùng để lưu những bài đã nghe gần đây vào localstorage. Thuật toán là sẽ dùng queue để lưu bài gần nhất
    const recentlyPlayedArray = queueToArray(recentlyPlayedQueue);
    if (!recentlyPlayedArray.includes(trackId)) {
      recentlyPlayedQueue.enqueue(trackId);
      if (recentlyPlayedQueue.size() > maxQueueSize) {
        recentlyPlayedQueue.dequeue();
      }
      const updatedRecentlyPlayedArray = queueToArray(recentlyPlayedQueue);
      localStorage.setItem('RecentlyPlayed', JSON.stringify(updatedRecentlyPlayedArray));
    }
  };

  const queueToArray = (queue) => { //Dùng để lưu những bài đã nghe gần đây vào localstorage. Thuật toán là sẽ dùng queue để lưu bài gần nhất
    const array = [];
    const tempQueue = new Queue();
    while (!queue.isEmpty()) {
      const item = queue.dequeue();
      array.push(item);
      tempQueue.enqueue(item);
    }
    while (!tempQueue.isEmpty()) {
      queue.enqueue(tempQueue.dequeue());
    }
    return array;
  };

  const play = () => {
    if (track && audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    const trackToPlay = songsData.find((t) => t.trackId === id);
  
    if (trackToPlay && audioRef.current) {
      updateRecentlyPlayedQueue(id);
      const index = songsData.indexOf(trackToPlay);
      setCurrentIndex(index);
      
      // Gọi UpdateListener mà không cần đợi API hoàn thành
      trackService.UpdateListener(id).catch((error) => {
        console.error("Error updating listener:", error);
      });
  
      await setTrack(trackToPlay);
      await audioRef.current.play().then(() => {
        setPlayStatus(true);
      }).catch((error) => {
        console.error("Error playing the track:", error);
        setPlayStatus(false);
      });
    } else {
      console.error("Bài hát không tồn tại hoặc audioRef chưa được khởi tạo!");
    }
  };
  

  const previous = async () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const previousTrack = songsData[newIndex];
      
      // Gọi UpdateListener mà không cần đợi API hoàn thành
      trackService.UpdateListener(previousTrack.trackId).catch((error) => {
        console.error("Error updating listener for previous track:", error);
      });
  
      setCurrentIndex(newIndex);
      await setTrack(previousTrack);
      updateRecentlyPlayedQueue(previousTrack.trackId);
      audioRef.current.src = previousTrack.path;
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };
  
  const next = async () => {
    if (currentIndex < songsData.length - 1) {
      const newIndex = currentIndex + 1;
      const nextTrack = songsData[newIndex];
      
      // Gọi UpdateListener mà không cần đợi API hoàn thành
      trackService.UpdateListener(nextTrack.trackId).catch((error) => {
        console.error("Error updating listener for next track:", error);
      });
  
      setCurrentIndex(newIndex);
      await setTrack(nextTrack);
      updateRecentlyPlayedQueue(nextTrack.trackId);
      audioRef.current.src = nextTrack.path;
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };
  

  const seekSong = async (e) => {
    if (audioRef.current && audioRef.current.duration) {
      const newTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setTimeout(() => {
        if (audioRef.current.currentTime !== newTime) {
          audioRef.current.currentTime = newTime;
        }
      }, 100);
    }
  };

  // Hàm để bật/tắt chế độ lặp lại
  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

    // Hàm thay đổi âm lượng từ thanh trượt
    const handleVolumeChange = (event) => {
      const newVolume = event.target.value / 100; // Chuyển giá trị từ 0-100 về 0-1
      console.log(newVolume);
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume; // Cập nhật âm lượng của audio
      }
    };

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume; // Đảm bảo audio cập nhật volume đúng
      }
    }, [volume]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    currentIndex,
    setCurrentIndex,
    setSongsData,
    songsData,
    repeat,
    toggleRepeat,
    handleVolumeChange,
    setVolume,
    volume // Thêm hàm toggleRepeat vào context
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
