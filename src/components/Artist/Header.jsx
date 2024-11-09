import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext'; 
import { Link } from 'react-router-dom';
import { HiUser, HiOutlineLogout } from 'react-icons/hi'; // Import các icon
import './HeaderFooter.css';

const Header = () => {
  const { isLoggedIn, user, logout } = useContext(LoginContext); // Lấy isLoggedIn và user từ context
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Quản lý menu xổ xuống

  const handleToggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogOut = () => {
    logout();
    window.location.reload();
  };

  const handleBackToUserPage = () => {
    navigate('/'); 
  };

  return (
    <header className="relative">
      <h1>VibeZ</h1>
      <nav>
        <Link to="/artistdashboard/home">Home</Link>
        <Link to="/artistdashboard/music">Music</Link>
        {/* <Link to="/artistdashboard/profile">Profile</Link> */}
      </nav>

      {isLoggedIn && (
        <div className="absolute right-0 top-0 flex items-center">
          <button 
            className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-300"
            onClick={handleToggleMenu}
          >
            <HiUser className="text-white text-2xl" /> {/* Icon người dùng */}
          </button>

          {isMenuVisible && (
            <div className="absolute top-full right-0 bg-[#2A2A2A] shadow-lg rounded-md p-2 w-48 text-white z-20">
              <ul>
                <li
                  className="p-3 hover:bg-[#3E3E3E] cursor-pointer"
                  onClick={handleBackToUserPage}
                >
                  Back to User Page
                </li>
                <li
                  className="p-3 hover:bg-[#3E3E3E] cursor-pointer"
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </li>
                <li
                  className="p-3 hover:bg-[#3E3E3E] cursor-pointer"
                  onClick={handleLogOut}
                >
                  <HiOutlineLogout className="inline-block mr-2" /> {/* Icon Log out */}
                  Log out
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
