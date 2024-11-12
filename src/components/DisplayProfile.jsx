import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import PlaylistItem from './PlaylistItem';
import { useParams } from 'react-router-dom';
import ArtistItem from './ArtistItem';
import { extractColors } from 'extract-colors';
import { getUserProfile } from '../services/profileService';
import unknown_ava from '../assets/unknown-ava.jpg';

function DisplayProfile() {
    const { id } = useParams();

    const [firstHex, setFirstHex] = useState('#000000');
    const [profileData, setProfileData] = useState(null);
    const [pageData, setPageData] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    console.log("User ID from URL:", id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { fetchedProfileData, fetchedPageData } = await getUserProfile(id);
                setProfileData(fetchedProfileData);
                setPageData(fetchedPageData);

                extractColors(fetchedProfileData.image)
                    .then(colors => {
                        if (colors.length > 0) {
                            setFirstHex(colors[2].hex);
                        }
                    })
                    .catch(() => {
                        setFirstHex('#000000');
                    });
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    if (!profileData || !pageData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-white p-6 font-sans w-full p-0">
            <div
                className="flex space-x-4 items-center w-full h-72 rounded-lg p-8"
                style={{ backgroundImage: `linear-gradient(to top, ${firstHex} 10%, #000000 90%)` }}
            >
                {profileData.img ? (
                    <img
                        src={profileData.img}
                        alt="Profile"
                        className="rounded-full w-56 h-56"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = unknown_ava;
                        }}
                    />
                ) : (
                    <img
                        src={unknown_ava}
                        alt="Profile"
                        className="rounded-full w-56 h-56"
                    />
                )}

                <div className='ml-8'>
                    <p className="text-sm">Profile</p>
                    <h2 className="text-8xl font-bold mb-4">{profileData.name}</h2>
                    <p className="text-base">{profileData.playlistCount} Public Playlists • {profileData.followingCount} Following</p>
                </div>
            </div>

            <div className="relative flex h-16 items-center">
                <button
                    className="transition-transform hover:scale-110 hover:opacity-80 px-4 rounded-full text-4xl font-semibold h-10"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                </button>

                {showMenu && (
                    <div className="absolute top-[100%] left-[16%] bg-[#2A2A2A] shadow-lg rounded-md p-2 text-white z-50">
                        <ul>
                            <li className="p-3 hover:bg-[#3E3E3E] text-[14px]">Edit Profile</li>
                            <li className="p-3 hover:bg-[#3E3E3E] text-[14px]">Copy link to profile</li>
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

            <section>
                <div className="mb-2">
                    <h2 className="text-xl font-semibold">Public Playlists</h2>
                </div>
                <div className='flex'>
                    {pageData.playlists.map((playlist) => (
                        <PlaylistItem key={playlist.id} id={playlist.id} image={playlist.img} name={playlist.name} createBy={profileData.name} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default DisplayProfile;
