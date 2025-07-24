import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../../utils/FirebaseConfig';
import './SignUp.css';
import { FaGoogle } from "react-icons/fa";
import { MdMailOutline, MdLockOutline, MdPersonOutline } from "react-icons/md";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Please use your IIITDMJ institutional email.');
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });
      navigate("/home");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError('Sign-up failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
        setError('Sign-up cancelled');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        setError('Account already exists. Please sign in instead.');
      } else {
        setError('Sign-up failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SignUp-overlay">
      <div className="SignUp-container">
        <button className="SignUp-close" onClick={handleClose}>&times;</button>
        <div className="SignUp-box">
          <div className="SignUp-form">
            <h2 className="SignUp-title">Sign Up</h2>
            
            <form onSubmit={handleEmailSignUp}>
              <div className="SignUp-field">
                <label htmlFor="name">
                  <MdPersonOutline />Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="SignUp-field">
                <label htmlFor="email">
                  <MdMailOutline />Enter Institute's Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.name@iiitdmj.ac.in"
                  required
                />
              </div>

              <div className="SignUp-field">
                <label htmlFor="password">
                  <MdLockOutline />Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password (min 6 characters)"
                  required
                />
              </div>

              <div className="SignUp-field">
                <label htmlFor="confirmPassword">
                  <MdLockOutline />Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {error && <div className="SignUp-error">{error}</div>}
              
              <button 
                type="submit" 
                className="SignUp-btn" 
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <div className="signup-divider">
              <span>or</span>
            </div>
            
            <button 
              type="button" 
              className="SignUp-btn google-signup-btn" 
              onClick={handleGoogleSignUp}
              disabled={loading}
            >
              <FaGoogle className="google-icon" />
              {loading ? 'Signing up...' : 'Sign up with Google'}
            </button>
            
            <div className="SignUp-footer">
              <span>Already have an account?</span>
              <Link to="/login" className="login-link">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
