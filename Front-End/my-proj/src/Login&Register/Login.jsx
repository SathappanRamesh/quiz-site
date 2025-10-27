import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
    const [user, setUser] = useState(null);
  const [displayError, setDisplayError] = useState('');
  const navigate = useNavigate();

       useEffect(() => {  

  const fetchProfile = async () => {
    try {
          const userId = user?._id;
          console.log(userId);
          
      const $FSA_auth_token = localStorage.getItem(`$FSA_auth_token`);
      if (!$FSA_auth_token) {
        console.warn('Auth token not found');
        return;
      }

      const response = await axios.get('https://quiz-app-iazp.onrender.com/myProfile', {
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
  const handleSubmit = async (event) => {
    setLoader(true);
    event.preventDefault(); 
    try {
      const userId = user?._id;
      const response = await axios.post(
        'https://quiz-app-iazp.onrender.com/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem( `$FSA_auth_token`)}`,
          },
        }
      );
      if (response.status === 200) {
        const { $FSA_auth_token } = response.data;
        localStorage.setItem(  `$FSA_auth_token`, $FSA_auth_token); // Store token in localStorage
        localStorage.setItem('registered', true); 
        navigate('/gk/all', { replace: true });
      }
    } catch (error) {
      toast.error('Error during login');
      setDisplayError('Invalid email or password');
      console.log(displayError);
      setError(true);
      console.error('Error during login:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
        setLoader(true);

    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userId = user?._id; 

      const response = await axios.post('https://quiz-app-iazp.onrender.com/google-login', {
        googleCredential: credentialResponse.credential,
      });

      if (response.status === 200) {
        const { $FSA_auth_token } = response.data; 
        localStorage.setItem(`$FSA_auth_token`, $FSA_auth_token);
        localStorage.setItem('registered', true);
        toast.info('Google login successful!');
        navigate('/gk/all', { replace: true });
      } else {
        toast.error(response.data.error);
      }
          setLoader(false);

    } catch (error) {
      console.error('Error during Google login:', error);
      toast.error('Google login failed. Please try again.');
      setLoader(false);
    }
  };
  

  return (
    <>
    {loader && (

<div className={styles.loader}>
  <div className={`${styles.load2}`}></div>
</div>
    )}

    <div className='background'>
      <ToastContainer />
      <div className={styles.formContainer}>
        <div className={styles.formBlock}>
        <p className={styles.title}>Sign in</p> {/* Changed to 'Sign in' for clarity */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.loginInput}
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              className={styles.loginInput}
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              required
            />
            {error && (
              <div className="alert alert-primary d-flex align-items-center" role="alert">
                {displayError}
              </div>
            )}
            <div className={styles.forgot}>
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <button type='submit' className={styles.sign}>Sign in</button>
        </form>
        <div className={styles.socialMessage}>
          <div className={styles.line}></div>
          <p className={styles.message}>Login with social accounts</p>
          <div className={styles.line}></div>
        </div>
        <div className={styles.socialIcons}>
          <GoogleLogin
          width='0'
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log('Login Failed');
            toast.error('Google login failed. Please try again.');
          }}
          render={(renderProps) => (
            <button onClick={renderProps.onClick}>Login with Google</button>
          )}
        />
        </div>
        <p className={styles.signup}>Don't have an account? <Link className={styles.signup} to="/register">Sign up</Link> </p>
      </div>
      </div>
    </div>
        </>

  );
}


export default Login;

