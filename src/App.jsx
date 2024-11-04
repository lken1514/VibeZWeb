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
import DisplaySearch from './components/DisplaySearch';
import SignUpForm from './components/SignUpForm/SignUpForm';
import PremiumPage from './components/PaymentForm/PremiumPage';
import PurchasePage from './components/PaymentForm/PurchasePage';


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
            { path: 'artist/:id', element: <DisplayArtist /> }, // artist page
            {
              path: '/search',
              element: <DisplaySearch />
            }
          ],
        }
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
      element: <PremiumPage />,
    },
    {
      path: '/purchase',
      element: <PurchasePage />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
