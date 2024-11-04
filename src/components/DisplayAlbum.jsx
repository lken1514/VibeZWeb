import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import Navbar from "./Navbar";
import albumService from "../services/albumService";
import trackService from "../services/trackService";
import artistService from "../services/artistService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const DisplayAlbum = () => {
  const { id } = useParams();
  const { 
    playWithId, setSongsData, setCurrentIndex, setPlayStatus, 
    playStatus, play, pause, setCurrentAlbumId, currentAlbumId 
  } = useContext(PlayerContext);
  
  const [albumData, setAlbums] = useState({});
  const [artists, setArtists] = useState({});
  const [tracks, setTracks] = useState([]);
  const [clickedId, setClickedId] = useState(false);
  const previousTracks = useRef([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await albumService.getAlbumsById(id); // Gọi API lấy dữ liệu album
        setAlbums(data); // Lưu dữ liệu vào state albums
        const track = await trackService.getAllTrackByAlbumId(id);
        setTracks(track);

        // Lấy tên nghệ sĩ cho mỗi album
        const artistPromises = data.map(async (album) => {
          const artistName = await artistService.getNameArtistById(album.artistId);
          return { [album.id]: artistName };
        });

        const artistResults = await Promise.all(artistPromises);
        const artistMap = Object.assign({}, ...artistResults); // Tạo object từ kết quả
        setArtists(artistMap);
      } catch (error) {
        console.error(error.message); // Lưu lỗi nếu xảy ra
      }
    };

    fetchAlbums(); // Gọi hàm lấy dữ liệu
  }, [id]);

  useEffect(() => {
    // Chỉ phát nhạc khi dữ liệu bài hát đã tải xong và được nhấn play
    if (clickedId && tracks.length > 0) {
      if (tracks[0] && tracks[0].trackId) {
        playWithId(tracks[0].trackId);  // Phát bài hát đầu tiên trong danh sách
      }
    }
  }, [clickedId, tracks]);  // Theo dõi sự thay đổi của clickedId và tracks

  const handleClick = () => {
    if (tracks.length === 0) {
      console.error("Không có bài hát nào trong danh sách.");
      return; // Ngăn không cho tiếp tục nếu không có bài hát
    }

    // Chỉ cập nhật album và phát nhạc nếu là album mới
    if (currentAlbumId !== albumData.id) {
      setCurrentAlbumId(albumData.id); // Cập nhật album hiện tại
      setSongsData(tracks); // Cập nhật danh sách bài hát mới
      setCurrentIndex(0); // Đặt bài hát đầu tiên
      setClickedId(true); // Đánh dấu đã nhấn play
      setPlayStatus(true); // Đặt trạng thái phát nhạc
    } else {
      play();
    }
  };

  const stop = () => {
    setPlayStatus(!playStatus);
    pause();
  };

  return (
    <>
      <div className="flex flex-col mt-10 gap-8 md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />

        <div className="flex-flex-col">
          <p className="font-semibold">Album</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4>{artists[albumData.id]}</h4>
          <p className="mt-1">
            <img className="inline-block w-5 mr-1.5 rounded-full" src={assets.logo} alt="" />
            <b>VibeZ</b> • 1.313.336 likes • <b>{tracks.length} songs,</b> about 2 hr 30 min
          </p>
        </div>
      </div>

      <div className="mt-5">
        {playStatus ? (
          <div className="bg-green-600 w-14 h-14 rounded-full flex justify-center relative items-center hover:bg-[#3BE477]" onClick={() => stop()}>
            <FontAwesomeIcon className="text-black text-[20px]" icon={faPause} />
          </div>
        ) : (
          <div className="bg-green-600 w-14 h-14 rounded-full flex justify-center relative items-center hover:bg-[#3BE477]" onClick={handleClick}>
            <FontAwesomeIcon className="text-black text-[20px]" icon={faPlay} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>

      <hr />

      {tracks.map((item, index) => (
        <div onClick={() => playWithId(item.trackId)} key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
          <p className="text-white flex">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <div>
              <img className="inline w-10 mr-5" src={item.image} alt="" />
            </div>
            <span className="ml-1">{item.name}</span>
          </p>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">{item.createDate}</p>
          <p className="text-[15px] text-center">{item.time}</p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
