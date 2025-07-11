import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="383869457570-gupq720fk2s1unh8bn5vag2ie58533bv.apps.googleusercontent.com">
    <Router>
      <UserProvider>
        <App/>
      </UserProvider>
    </Router>
    </GoogleOAuthProvider>

  )
