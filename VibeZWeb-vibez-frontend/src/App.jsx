import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ProfilePage from './pages/ProfilePage';
import DisplayAlbum from './components/DisplayAlbum';
import Display from './components/Display';
import LoginComponent from './components/LoginForm/LoginComponent'
import DisplayHome from './components/DisplayHome'; // Imported to use inside nested routes
import DisplayArtist from './components/DisplayArtist';
import DisplayPlaylist from './components/DisplayPlaylist'
import Queue from './components/Queue';
import Plans from './components/Plans';
import SignUpForm from './components/SignUpForm/SignUpForm';

import ArtistDashboard from './components/Artist/ArtistDashboard'; // Import ArtistDashboard
import ArtistHome from './components/Artist/ArtistHome'; // Import Home
import ArtistMusicTab from './components/Artist/ArtistMusicTab'; // Import Music
import ArtistProfile from './components/Artist/ArtistProfile'; // Import Profile

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Display />, // display 
          children: [
            { path: '/', element: <DisplayHome /> }, // home page
            { path: 'album/:id', element: <DisplayAlbum /> },
            { path: 'playlist/:id', element: <DisplayPlaylist /> }, // album page
            {path: 'artist/:id', element: <DisplayArtist />}, // artist page
          ],
        },
      ],
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
      element: <Plans />,
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
