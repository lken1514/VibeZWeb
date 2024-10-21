import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = ({image, name, release, id,artist}) => {

   const navigate = useNavigate()

  return (
    <div>
      <div onClick={() => navigate(`/album/${id}`)} className="w-[300px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img className="rounded" src={image} alt="" />
        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="font-bold mt-2 mb-1">{artist}</p>
        <p className="text-slate-200 text-sm">Release on {release}</p>
      </div>
    </div>
  )
}

export default AlbumItem;