import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Assets Connection
import { albumsData, assets, songsData } from "../assets/assets";
// Context Connection
import { PlayerContext } from "../context/PlayerContext";
// Component Connection
import Navbar from "./Navbar";
import albumService from "../services/albumService";
import trackService from "../services/trackService"
import { useRef } from "react";

const DisplayAlbum = () => {

  const { id } = useParams()
  const { playWithId, setSongsData} = useContext(PlayerContext);
  const [albumData, setAlbums] = useState([]);
  const [artists, setArtists] = useState({}); // State lưu trữ tên nghệ sĩ
  const [tracks, setTracks] = useState([]);
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
  }, []);
  useEffect(() => {
    if (previousTracks.current.length > 0 && previousTracks.current !== tracks) {
      console.log("Tracks đã thay đổi!");
      console.log("Tracks cũ:", previousTracks.current);
      console.log("Tracks mới:", tracks);
    }

    // Cập nhật phiên bản trước đó của tracks
    setSongsData(tracks);

  }, [tracks]);
  useEffect(() => {
    const saveTrackList = () => {
      setSongsData(tracks);
    };
    saveTrackList();
  }, [tracks]); // Phụ thuộc vào tracks
  const [clicked, setClicked] = useState(false);
  const handleClick = (id) => {

    playWithId(id);
    // if (!clicked) {
    //     setClicked(true);
    //     if (tracks.length > 0) {
          

    //     }
    // }
  }
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
            <b>VibeZ</b> • 1.313.336 likes • <b>{tracks.length} songs,</b> about 2 hr 30 min</p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>

      <hr />

      {
        tracks.map((item, index) => (
          <div onClick={() => playWithId(item.trackId)} key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
            <p className="text-white flex">
              <b className="mr-4 text-[#a7a7a7]">{index+1}</b>
              <div>
              <img className="inline w-10 mr-5" src={item.image} alt="" />
              </div>
              <span className="ml-1">{item.name}</span>              
            </p>
            <p className='text-[15px]'>{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">{item.createDate}</p>
            <p className="text-[15px] text-center">{item.time}</p>
          </div>
        ))
      }
    </>
  )
}
export default DisplayAlbum;