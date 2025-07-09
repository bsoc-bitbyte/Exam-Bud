import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './SignUp.css';
import { FaKey, FaEye, FaEyeSlash, } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const SignUpPage = ({ onCreateAccount }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleClose = () => {
    navigate("/");
  };
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid institutional email.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    if (onCreateAccount) {
      onCreateAccount({ email, password, remember });
    }

    navigate("/dashboard");
  };

  return (
      <div className="sign-up-overlay">
        <div className="sign-up-container">
          <button className="sign-up-close" onClick={handleClose} >&times;</button>
          <div className="sign-up-box">
            <form className="sign-up-form" onSubmit={handleSubmit}>
              <h2 className="sign-up-title">Sign Up</h2>
              <div className="sign-up-field">
                <label htmlFor="email"><MdMailOutline />Enter Institute's Email ID</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="mail@iiitdmj.ac.in"
                    required
                />
              </div>
              <div className="sign-up-field">
                <label htmlFor="password"><FaKey />Create Password</label>
                <div className="password-input-wrapper">
                  <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Must be 8 characters"
                      minLength="8"
                      required
                  />
                  <button type="button" className="show-password-btn" onClick={() => setShowPassword(!showPassword)}
                          aria-label="Toggle password visibility">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="sign-up-options">
                <label className="remember-me">
                  <input
                      type="checkbox"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
              </div>
              {error && <div className="sign-up-error">{error}</div>}
              <button type="submit" className="sign-up-btn">Sign Up</button>
              <div className="sign-up-footer">
                <span>Already have an account?</span>
                <Link to="/login" className="sign-up-link">Log In</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};
export default SignUpPage;
