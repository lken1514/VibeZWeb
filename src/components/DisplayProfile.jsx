import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import PlaylistItem from './PlaylistItem';
import { useParams } from 'react-router-dom';
import ArtistItem from './ArtistItem';
import { extractColors } from 'extract-colors';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
function DisplayProfile() {
    const { userId } = useParams();
    const [firstHex, setFirstHex] = useState('#000000');
    const [profileData, setProfileData] = useState(null);
    const [pageData, setPageData] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const fetchedProfileData = {
            name: 'PhongNguyen',
            playlistCount: 2,
            followingCount: 11,
            img: img3
        };
        const fetchedPageData = {
            topArtists: [
                { id: 1, name: 'LowG', img: img1 },
                { id: 2, name: 'Vu.', img: img1 },
                { id: 3, name: 'Wren Evans', img: img1 }
            ],
            topTracks: [
                { id: 1, name: 'Anh muon nhin thay em', album: 'Anh muon nhin thay em', duration: '3:51', img: img1 }
            ],
            playlists: [
                { id: 1, name: 'Playlist 1', img: img1 },
                { id: 1, name: 'Playlist 1', img: img1 },
                { id: 1, name: 'Playlist 1', img: img1 }

            ]
        };

        setProfileData(fetchedProfileData);
        setPageData(fetchedPageData);

        extractColors(fetchedProfileData.img)
            .then(colors => {
                if (colors.length > 0) {
                    setFirstHex(colors[2].hex);
                }
            })
            .catch(() => {
                setFirstHex('#000000');
            });
    }, [userId]);

    if (!profileData || !pageData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-white p-6 font-sans w-full p-0">
            <div
                className="flex space-x-4 items-center w-full h-72 rounded-lg p-8"
                style={{
                    backgroundImage: `linear-gradient(to top, ${firstHex} 10%, #000000 90%)`
                }}
            >
                <img src={profileData.img} alt="Profile" className="rounded-full w-56 h-56" />
                <div className='ml-8'>
                    <p className="text-sm">Profile</p>
                    <h2 className="text-8xl font-bold mb-4">{profileData.name}</h2>
                    <p className="text-base">{profileData.playlistCount} Public Playlists • {profileData.followingCount} Following</p>
                </div>
            </div>
            <div className="relative flex h-16 items-center" >
                <button
                    className="transition-transform hover:scale-110 hover:opacity-80 px-4 rounded-full text-4xl	 font-semibold h-10"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                </button>

                {showMenu && (
                    <div
                        className="absolute top-[100%] left-[16%] bg-[#2A2A2A] shadow-lg rounded-md p-2 text-white z-50"
                    >
                        <ul>
                            <li className="p-3 hover:bg-[#3E3E3E] text-[14px]">
                                Edit Profile
                            </li>
                            <li className="p-3 hover:bg-[#3E3E3E] text-[14px]">
                                Copy link to profile
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <section className="mb-8 my-8">
                <div className="mb-2">
                    <h2 className="text-xl font-semibold">Top Artists This Month</h2>
                    <p className="text-gray-400 text-sm">Only visible to you</p>
                </div>
                <div className="flex space-x-4">
                    {pageData.topArtists.map((artist) => (
                        <ArtistItem key={artist.id} image={artist.img} name={artist.name} desc="Artist" />
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <div className="mb-2">
                    <h2 className="text-xl font-semibold">Top Tracks This Month</h2>
                    <p className="text-gray-400 text-sm">Only visible to you</p>
                </div>
                <div className="space-y-4">
                    {pageData.topTracks.map((track, index) => (
                        <div key={track.id} className="grid grid-cols-[30px_40px_1fr_50px] items-center gap-4 py-2 border-b border-gray-700">
                            <div className="text-gray-400 text-center">{index + 1}</div>
                            <img src={track.img} alt={track.name} className="w-10 h-10 rounded" />
                            <div>
                                <div className="font-semibold">{track.name}</div>
                                <div className="text-gray-400 text-sm">{track.album}</div>
                            </div>
                            <div className="text-gray-400 text-right">{track.duration}</div>
                        </div>
                    ))}
                </div>
            </section>
            <section >
                <div className="mb-2">
                    <h2 className="text-xl font-semibold">Public Playlists</h2>
                </div>
                <div className='flex'>
                    {pageData.playlists.map((playlist) => (
                        <PlaylistItem key={playlist.id} image={playlist.img} name={playlist.name} createBy={profileData.name} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default DisplayProfile;
