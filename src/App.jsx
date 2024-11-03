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
import AdminDashboard from './pages/AdminDashboard';
import AdminDisplayBan from './components/AdminDisplayBan';
import AdminDisplayArtist from './components/AdminDisplayArtist';
import AdminDisplayApproval from './components/AdminDisplayApproval';
import AdminDisplayHome from './components/AdminDisplayHome';
// const AdminDisplayHome  = React.lazy(() => import("./components/AdminDisplayHome"));

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
      element: <Plans />,
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
