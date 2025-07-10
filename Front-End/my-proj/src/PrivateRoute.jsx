import { Navigate } from 'react-router-dom';
import { useEffect, useState} from 'react';
import axios from 'axios';
const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);

         useEffect(() => {  
    const fetchProfile = async () => {
      try {
            const userId = user?._id;
        const $FSA_auth_token = localStorage.getItem(`$FSA_auth_token`);
        if (!$FSA_auth_token) {
          console.warn('Auth token not found');
          return;
        }
  
        const response = await axios.get('http://localhost:3000/myProfile', {
          headers: {
            Authorization: `Bearer ${$FSA_auth_token}`,
          },
        });
          setUser({
            _id: response.data._id,
          });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfile();
 }, [user?._id]);
       const userId = user?._id;   
  const isAuthenticated = localStorage.getItem(`$FSA_auth_token`); // or use context
  // console.log(isA);
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
