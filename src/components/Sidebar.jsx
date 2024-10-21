import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';
import { LoginContext } from "../context/LoginContext";
import libraryService from "../services/libraryService";

const Sidebar = () => {
  const navigate = useNavigate();
  const [library, setLibrary] = useState(null); // Khởi tạo null thay vì undefined
  const [albumData, setAlbums] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [isArtist, setIsArtist] = useState(false);
  const [isPlaylist, setIsPlaylist] = useState(true); // Set mặc định là true khi component render
  const [isAlbum, setIsAlbum] = useState(false);
  const { userId } = useContext(LoginContext); // Nếu không có `setUserId` trong context thì bỏ dòng `setUserId`.

  useEffect(() => {
    const fetchId = async () => {
      let id = userId;
  
      // Kiểm tra nếu userId chưa có, lấy từ localStorage
      if (!id) {
        const storedUserId = JSON.parse(localStorage.getItem('userId'));
        if (storedUserId) {
          id = storedUserId;
          // setUserId(id);  // Đặt lại userId nếu cần, nhưng nếu không có setUserId trong context thì bỏ
        } else {
          console.error("User ID not found");
          return;  // Dừng lại nếu không có userId
        }
      }
      try {
        console.log("Fetching library for userId: ", id);
        const library = await libraryService.getLibraryByUserId(id); //Dùng để lấy library bằng userId
        console.log(library);
        setLibrary(library);
      } catch (error) {
        console.error("Error fetching library: ", error.message);
      }
    };
    fetchId();
  }, [userId]); // Cần thêm `userId` vào dependency array

  useEffect(() =>  {
    const fetchLibrary = async () => {
      if (library) { // Chỉ gọi API khi library đã có giá trị
        console.log(library.id);
        try { 
          //Tên hàm nói lên tất cả
          const album = await libraryService.getAlbumsByLibraryId(library.id);
          setAlbums(album);
          const playlist = await libraryService.getPlaylistsByLibraryId(library.id);
          setPlaylistData(playlist);
          const artist = await libraryService.getArtistsByLibraryId(library.id);
          setArtistData(artist);
        } catch (error) {
          console.error("Error fetching library: ", error.message);
        }
      }
    };
  
    fetchLibrary();  // Gọi hàm lấy dữ liệu
  }, [library]);  // Thêm `library` vào dependency array

  const handlePlaylistClick = () => {
    setIsPlaylist(true);
    setIsAlbum(false);
    setIsArtist(false);
  };

  const handleAlbumClick = () => {
    setIsPlaylist(false);
    setIsAlbum(true);
    setIsArtist(false);
  };

  const handleArtistClick = () => {
    setIsPlaylist(false);
    setIsAlbum(false);
    setIsArtist(true);
  };

  return (
    <div className="w-[20%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[100%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="" />
            <img className="w-5" src={assets.plus_icon} alt="" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          <div>
            <button
              className={`py-2 px-3 rounded-full hover:bg-white hover:text-black ${isPlaylist ? 'bg-white text-black' : 'bg-[#333333]'}`}
              onClick={handlePlaylistClick}
            >
              Playlists
            </button>
          </div>
          <div>
            <button
              className={`py-2 px-3 rounded-full hover:bg-white hover:text-black ${isAlbum ? 'bg-white text-black' : 'bg-[#333333]'}`}
              onClick={handleAlbumClick}
            >
              Albums
            </button>
          </div>
          <div>
            <button
              className={`py-2 px-3 rounded-full hover:bg-white hover:text-black ${isArtist ? 'bg-white text-black' : 'bg-[#333333]'}`}
              onClick={handleArtistClick}
            >
              Artists
            </button>
          </div>
        </div>
        <form className="relative w-max">
          <input
            type="search"
            className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full bg-transparent pl-12 outline-none transition-[width] duration-500 ease-in-out focus:w-64 focus:cursor-text focus:pl-16 focus:pr-4"
            placeholder="Search..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-0 my-auto h-8 w-14 stroke-gray-500 px-3.5 transition-all duration-500 ease-in-out peer-focus:stroke-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>

        {isPlaylist && playlistData.length > 0 && playlistData.map((playlist, index) => (
          <div
            key={playlist.id || index} // Sử dụng id nếu có, hoặc index
            className="relative flex w-[100%] h-[10%] cursor-pointer hover:bg-[#3E3E3E] p-2 hover:rounded bg-[#3E3E3E]"
          >
            <div>
              <img
                className="rounded h-full"
                src={playlist.image || assets.img1}
                alt={playlist.name || 'Unknown'}
              />
            </div>
            <div className="flex flex-col ml-5">
              <p className="text-[18px] font-bold">{playlist.name || 'Không có tên'}</p>
              <a className="text-gray-400 text-[18px] hover:text-white hover:underline hover:decoration-1">
                {playlist.artistName || 'Unknown Artist'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
