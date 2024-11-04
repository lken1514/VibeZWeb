import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
            { path: 'search', element: <DisplaySearch /> }
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
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
