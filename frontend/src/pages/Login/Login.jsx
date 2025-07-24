import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../../utils/FirebaseConfig';
import './Login.css';
import { FaGoogle } from "react-icons/fa";
import { MdMailOutline, MdLockOutline } from "react-icons/md";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleClose = () => {
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    return email.endsWith('@iiitdmj.ac.in');
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Please use your IIITDMJ institutional email.');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/home");
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      if (!user.email.endsWith('@iiitdmj.ac.in')) {
        setError('Please use your IIITDMJ institutional email.');
        await auth.signOut();
        return;
      }

      navigate("/home");
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled');
      } else if (error.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection.');
      } else {
        setError('Sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="login-close" onClick={handleClose}>&times;</button>
        <div className="login-box">
          <div className="login-form">
            <h2 className="login-title">Log In</h2>
            
            <form onSubmit={handleEmailLogin}>
              <div className="login-field">
                <label htmlFor="email">
                  <MdMailOutline />Enter Institute's Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@iiitdmj.ac.in"
                  required
                />
              </div>

              <div className="login-field">
                <label htmlFor="password">
                  <MdLockOutline />Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && <div className="login-error">{error}</div>}
              
              <button 
                type="submit" 
                className="login-btn" 
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <div className="login-divider">
              <span>or</span>
            </div>
            
            <button 
              type="button" 
              className="login-btn google-signin-btn" 
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <FaGoogle className="google-icon" />
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </button>
            
            <div className="login-footer">
              <span>Don't have an account?</span>
              <Link to="/signup" className="sign-up-link">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
