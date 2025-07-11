import {useState } from 'react';
import styles from './Register.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [reason, setReason] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState({
    username: '',
    email: '',
    password: ''
  });

function isStrongPassword(password) {
  console.log(900);
  
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (password.length < minLength) return { valid: false, reason: "Too short (minimum 8 characters)" };
  if (!hasUppercase) return { valid: false, reason: "Missing uppercase letter" };
  if (!hasLowercase) return { valid: false, reason: "Missing lowercase letter" };
  if (!hasDigit) return { valid: false, reason: "Missing digit" };
  if (!hasSpecialChar) return { valid: false, reason: "Missing special character" };

  return { valid: true, reason: "Strong password ✅" };
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!isStrongPassword(password).valid) {
      setReason(isStrongPassword(password).reason)
      setIsValidPassword(true);
      setIsLoading(false);
      return;
    }
    try {
      console.log(890);
      
      const response = await axios.post('https://quiz-app-iazp.onrender.com/register', {
        username,
        email,
        password
      });
      console.log(response.data);

      toast.info('Verification code sent! Please check your email.');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError({ username: '', email: '', password: '' });
navigate('/verificationCode', {
  replace: true,
  state: { email: response.data.email },
});
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || 'An error occurred. Please try again.';
      if (errorMessage.includes('Username')) {
        setError({ ...error, username: errorMessage });
      } else if (errorMessage.includes('Email')) {
        setError({ ...error, email: errorMessage });
      } else {
        setError({ ...error, password: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log(decoded);
      const { name, email } = decoded;
      const response = await axios.post('https://quiz-app-iazp.onrender.com/google-register', {
        name,
        email,
        googleCredential: credentialResponse.credential
      });
      console.log(response.data);
      toast.info('Google login successful!');
      navigate('/', {replace: true});
    } catch (error) {
      console.error('Error during Google login:', error);
      toast.error('Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    setIsLoading(true);
    navigate('/login');
        setIsLoading(false);
  };

  return (
    <>
        {isLoading && (
    
    <div className={styles.loader}>
      <div className={`${styles.load2}`}></div>
    </div>
        )}
      <div className={styles.background}>
        <ToastContainer />
        <div className={styles.formContainer}>
          <h2 className={styles.title} style={{ color: '#2b061e' }}>Sign up</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>

<div className={styles.inputContainer}>
  <input placeholder="Username" className={styles.inputField} type="text" value={username}
  onChange={(e) => setUsername(e.target.value)}
  required
  />  
                {error.username && (
                <div className="alert alert-primary d-flex align-items-center" role="alert">
                  <div>{error.username}</div>
                </div>
              )}
  <label htmlFor="username" className={styles.inputLabel}>Username</label>
  <span className={styles.inputHighlight}></span>
</div>

<div className={styles.inputContainer}>
  <input placeholder="E-mail" className={styles.inputField} type="text" value={email}
                onChange={(e) => setEmail(e.target.value)} required/>
              {error.email && (
                <div className="alert alert-primary d-flex align-items-center" role="alert">
                  <div>{error.email}</div>
                </div>
              )}
  <label htmlFor="E-mail" className={styles.inputLabel}>E-mail</label>
  <span className={styles.inputHighlight}></span>
</div>

<div className={styles.inputContainer}>
  <input placeholder="Password" className={styles.inputField} type="password"
                  value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
                {isValidPassword && (
                <div className="alert alert-primary d-flex align-items-center" role="alert">
                    <span> {reason} </span>
                  </div>
                )}
  <label htmlFor="Password" className={styles.inputLabel}>Password</label>
  <span className={styles.inputHighlight}></span>
</div>

<div className={styles.inputContainer}>
  <input placeholder="Confirm Password" className={styles.inputField} type="password"
                  value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required/>
              {error.password && (
                <div className="alert alert-primary d-flex align-items-center" role="alert">
                  <div>{error.password}</div>
                </div>
              )}
  <label htmlFor="comfirmPassword" className={styles.inputLabel}>Confirm Password</label>
  <span className={styles.inputHighlight}></span>
</div>

            </div>
            <br />
            <button className={styles.sign} type="submit">Sign up</button>
          </form>
          {isLoading && (
            <div className={styles.spinner}>
              <div className={styles.inlineSpinner}></div>
              <div className={styles.inlineSpinner}></div>
              <div className={styles.inlineSpinner}></div>
              <div className={styles.inlineSpinner}></div>
              <div className={styles.inlineSpinner}></div>
              <div className={styles.inlineSpinner}></div>
            </div>
          )}
          <div className={styles.socialMessage}>
            <div className={styles.line}></div>
            <p className={styles.message}>Login with social accounts</p>
            <div className={styles.line}></div>
          </div>
          <div className={styles.socialIcons}>
              <GoogleLogin
              width='0'
                onSuccess={handleGoogleRegister}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              </div>
          <p className={styles.signup}>Have an account?
            <Link to="/login" onClick={handleLoginClick}><a href="#"> Log In</a></Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
