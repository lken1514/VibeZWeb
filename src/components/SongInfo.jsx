import React from 'react';
import { assets } from '../assets/assets';

const SongInfo = () => {
  return (
    <div className='overflow-scroll h-full'>
      <div className='p-4 '>
        <h1 className='font-bold text-[25px] fixed text-white'>Buồn hay vui</h1>
      </div>
      <div className="bg-[#121212] text-white h-full flex flex-col gap-3 items-center p-2 overflow-scroll">

        <div className="w-[18vw] bg-[#121212] rounded-lg  shadow-lg relative">
          <div
            className="relative h-[300px] bg-cover bg-center rounded-3xl"
            style={{
              backgroundImage: `url(${assets.artistBanner})`,
            }}
          ></div>
          <h1 className="font-bold text-[25px] mt-3  z-auto relative">Buồn Hay Vui</h1>
          <p className="text-gray-400  mb-4 z-20 relative">Obito</p>
        </div>

        {/* Div chứa ảnh thứ hai */}
        <div className="w-[18vw] bg-[#272727] rounded-lg shadow-lg">
          {/* Phần ảnh của nghệ sĩ */}
          <div
            className="bg-cover bg-center "
          >
            <div className="px-4 py-3 text-white font-semibold">About the artist</div>
          </div>
          <div className='max-w-[140px] px-4'>
            <img className='rounded-full' src={assets.artistImg} alt="" />
          </div>
          {/* Thông tin về nghệ sĩ */}
          <div className="px-4 py-3">
            <div className="text-lg font-bold">Vũ.</div>
            <div className="text-[14px] flex text-gray-400 items-center gap-20">1,664,944 monthly listeners
              <button className="mt-3 px-3 py-1 border border-gray-500 rounded-full text-white text-end hover:text-white hover:border-white">
                follow
              </button>
            </div>
            <p className="mt-2 text-gray-400 break-words">IM VŨ</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SongInfo;
