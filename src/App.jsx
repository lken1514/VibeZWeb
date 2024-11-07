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
import SignUpForm from './components/SignUpForm/SignUpForm';
import PremiumPage from './components/PaymentForm/PremiumPage';
import PurchasePage from './components/PaymentForm/PurchasePage';

import AdminDashboard from './pages/AdminDashboard';
import AdminDisplayBan from './components/AdminDisplayBan';
import AdminDisplayArtist from './components/AdminDisplayArtist';
import AdminDisplayApproval from './components/AdminDisplayApproval';
import AdminDisplayHome from './components/AdminDisplayHome';
import ProfileEdit from './components/ProfileEdit';

import ArtistDashboard from './components/ArtistDashboard/ArtistDashboard'; 
import ArtistHome from './components/ArtistDashboard/ArtistHome'; 
import ArtistMusicTab from './components/ArtistDashboard/ArtistMusicTab'; 
import ArtistProfile from './components/ArtistDashboard/ArtistProfile'; 
import DisplayProfile from './components/DisplayProfile';

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
            { path: 'search', element: <DisplaySearch /> },
            { path: 'user/:id', element: <DisplayProfile /> },
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
          ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
