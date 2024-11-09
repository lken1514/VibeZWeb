import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import PlayerContextProvider from './context/PlayerContext.jsx'
import LoginContextProvider from './context/LoginContext.jsx'
import { ListVisibilityProvider } from './context/VisibleContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='649232747819-r6j0qcug20bnct3qug8j9rch53osec5e.apps.googleusercontent.com'>
    <LoginContextProvider>
      <PlayerContextProvider>
        <ListVisibilityProvider>
          <App />
        </ListVisibilityProvider>
      </PlayerContextProvider>
    </LoginContextProvider>
  </GoogleOAuthProvider>
)