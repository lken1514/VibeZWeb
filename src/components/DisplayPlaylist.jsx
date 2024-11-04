import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import playlistService from "../services/playlistService";
import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../context/LoginContext";
import { assets } from "../assets/assets";


const DisplayPlaylist = () => {

  const { id } = useParams()
  const { playWithId, setSongsData} = useContext(PlayerContext);
  const [playlistData, setPlaylist] = useState([]);
  const [artists, setArtists] = useState({}); // State lưu trữ tên nghệ sĩ
  const [tracks, setTracks] = useState([]);
  const previousTracks = useRef([]);
  const { username } = useContext(LoginContext);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await playlistService.getPlaylistById(id); // Gọi API lấy dữ liệu album
        console.log(data);
        setPlaylist(data); // Lưu dữ liệu vào state albums
        const track = await playlistService.getTracksByPlaylistId(id);
        setTracks(track);
      } catch (error) {
        console.error(error.message); // Lưu lỗi nếu xảy ra
      } 
    };

    fetchPlaylist(); // Gọi hàm lấy dữ liệu
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

  return (
    <>
      <div className="flex flex-col mt-10 gap-8 md:flex-row md:items-end">
        <img className="w-48 rounded" src={playlistData.image} alt="" />

        <div className="flex-flex-col">
          <p className="font-semibold">Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{playlistData.name}</h2>
          <h4>{username}</h4>
          <p className="mt-1">
            <img className="inline-block w-5 mr-1.5 rounded-full" src={assets.logo} alt="" />
            <b>VibeZ</b> • 1.313.336 likes • <b>{tracks.length} songs,</b> about 2 hr 30 min</p>
        </div>
      </div>
      <div className="mt-5">
        <div className="bg-green-600 w-14 h-14 rounded-full flex justify-center relative items-center hover:bg-[#3BE477]">
        <FontAwesomeIcon className="text-black text-[20px]" icon={faPlay} />
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
            <p className='text-[15px]'>{item.albumName}</p>
            <p className="text-[15px] hidden sm:block">{item.createDate}</p>
            <p className="text-[15px] text-center">{item.time}</p>
          </div>
        ))
      }
    </>
  )
}
export default DisplayPlaylist;