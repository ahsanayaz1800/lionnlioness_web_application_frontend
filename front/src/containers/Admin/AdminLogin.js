import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/AdminLogin.css'; // Import the CSS for styling
import Logo from '../../assets/logo1.png'
import BackgroundImage from '../../assets/Home_background.png'
const baseURL = process.env.REACT_APP_BASE_URL;
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/admin/login`, { email, password });
      localStorage.setItem('adminToken', response.data.token);
      window.location.href = '/admin/dashboard';
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-left">
        <div className="logo">
          <img src={Logo} alt="Lion-n-Lioness Logo" />
        </div>
        <h2 className="portal-title">ADMIN PORTAL</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
      <div className="login-right">
      </div>
    </div>
  );
};

export default AdminLogin;
