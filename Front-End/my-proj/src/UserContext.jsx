// UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState({
    userCoins: 0,
    userSc: 0,
    userAllChapterPoints: null,
  });

  const [user, setUser] = useState(null);
  
  // ✅ Fetch user profile to get _id
  useEffect(() => {
      console.log('user contxt file');

    const fetchProfile = async () => {
      try {
        const $FSA_auth_token = localStorage.getItem(`$FSA_auth_token`);
        if (!$FSA_auth_token) return;

        const response = await axios.get('http://localhost:3000/myProfile', {
          headers: { Authorization: `Bearer ${$FSA_auth_token}` },
        });

        setUser({ _id: response.data._id });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Function to refresh credentials
  const refreshUserCredentials = async () => {
      console.log('user contxt file');

    try {
      const $FSA_auth_token = localStorage.getItem(`$FSA_auth_token`);
      const response = await axios.get('http://localhost:3000/api/fetch-userCredentials', {
        headers: { Authorization: `Bearer ${$FSA_auth_token}` },
      });

      setUserCredentials({
        userCoins: response.data.coins,
        userSc: response.data.overallSkillScore,
        userAllChapterPoints: response.data.allChapterPoints,
      });
    } catch (error) {
      console.error('Error refreshing user credentials:', error);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    refreshUserCredentials();
  }, []);

  return (
    <UserContext.Provider value={{ userCredentials, setUserCredentials, refreshUserCredentials }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
