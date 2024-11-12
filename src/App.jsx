import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ProfilePage from './pages/ProfilePage';
import DisplayAlbum from './components/DisplayAlbum';
import Display from './components/Display';
import LoginComponent from './components/LoginForm/LoginComponent';
import DisplayHome from './components/DisplayHome';
import DisplayArtist from './components/DisplayArtist';
import DisplayPlaylist from './components/DisplayPlaylist';
import DisplaySearch from './components/DisplaySearch';
import DisplayProfile from './components/DisplayProfile'
import SignUpForm from './components/SignUpForm/SignUpForm';
import PremiumPage from './components/PaymentForm/PremiumPage';
import PurchasePage from './components/PaymentForm/PurchasePage';

import AdminDashboard from './pages/AdminDashboard';
import AdminDisplayBan from './components/AdminDashboard/AdminDisplayBan';
import AdminDisplayArtist from './components/AdminDashboard/AdminDisplayArtist';
import AdminDisplayApproval from './components/AdminDashboard/AdminDisplayApproval';
import AdminDisplayHome from './components/AdminDashboard/AdminDisplayHome';
import ProfileEdit from './components/ProfileEdit';

import ArtistDashboard from './components/ArtistDashboard/ArtistDashboard';
import ArtistHome from './components/ArtistDashboard/ArtistHome';
import ArtistMusicTab from './components/ArtistDashboard/ArtistMusicTab';
import ArtistProfile from './components/ArtistDashboard/ArtistProfile';
import ArtistProfileClaim from './components/Artist/ArtistProfileClaim';
import ArtistVerificationRequestForm from './components/Artist/ArtistVerificationRequestForm';
import EditAlbum from './components/Artist/EditAlbum';
import EditTrack from './components/Artist/EditTrack';
import CreateTrack from './components/Artist/CreateTrack';
import AlbumDetail from './components/Artist/AlbumDetail';
import ArtistApprovalDisplay from './components/AdminDashboard/ArtistApprovalDisplay';



import ForgotPass from './components/ForgotPassword/ForgotPass';
import NewPassword from './components/ForgotPassword/NewPass';
import Verification from './components/ForgotPassword/Verification';
import SyncSong from './components/SyncSong';
import IdentitySong from './components/IdentitySong'
import StudentVerify from './components/StudentVerify/StudentVerify'; 
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Display />,
          children: [

            { path: '/', element: <DisplayHome /> },
            { path: 'album/:id', element: <DisplayAlbum /> },
            { path: 'playlist/:id', element: <DisplayPlaylist /> },
            { path: 'artist/:id', element: <DisplayArtist /> },
            { path: 'user/:id', element: <DisplayProfile /> },
            { path: 'search', element: <DisplaySearch /> },
            { path: '/lyrics', element: <SyncSong />,}
          ],
        },
      ],
    },
    {
      path: '/profileedit',
      element: <ProfileEdit />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
    },
    {
      path: '/login',
      element: <LoginComponent />,
    },
    {
      path: '/signup',
      element: <SignUpForm />,
    },
    {
      path: '/plan',
      element: <PremiumPage />,
    },
    {
      path: '/purchase',
      element: <PurchasePage />,
    },
    {
      path: '/profile/artist-profile-claim', 
      element: <ArtistProfileClaim />, 
    },
    {
      path: '/profile/artist-profile-claim/verify',
      element: <ArtistVerificationRequestForm />,
    },
    {
      path: '/identity',
      element: <IdentitySong />,
    },
    {
      path: '/admin',
      element: <AdminDashboard />,
      children: [
        {
          index: true, // Tự động điều hướng khi truy cập vào /admin
          element: <Navigate to="home" replace />,
        },
        {
          path: 'home',
          element: <AdminDisplayHome />,
        },
        {
          path: 'artist',
          element: <AdminDisplayArtist />,
        },
        {
          path: 'ban',
          element: <AdminDisplayBan />,
        },
        {
          path: 'approval',
          element: <AdminDisplayApproval />,
        },
        {
          path: 'artistApproval',
          element: <ArtistApprovalDisplay />,
        },
      ],
    },
    {
      path: '/artistdashboard',
      element: <ArtistDashboard />, // New artist dashboard
      children: [
        { index: true, element: <ArtistHome /> }, // Default to ArtistHome
        { path: 'home', element: <ArtistHome /> },
        { path: 'music', element: <ArtistMusicTab /> },
        { path: 'profile', element: <ArtistProfile /> },
        {
          path: 'music/album/:id',
          element: <AlbumDetail />, 
        },
        {
          path: 'music/album/:id/edit', 
          element: <EditAlbum />, 
        },
        {
          path: 'music/album/:id/create-track',
          element: <CreateTrack />, 
        },
        {
          path: 'music/album/:albumId/edit-track/:trackId',
          element: <EditTrack />,
        }
      ],
    },
    {
      path: '/student-verify',
      element: <StudentVerify />,
    },
    {
      path: '/Forgot',
      element: <ForgotPass />,
    },
    {
      path: '/NewPass',
      element: <NewPassword />,
    },
    {
      path: '/verify',
      element: <Verification />,
    },
    {

    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
