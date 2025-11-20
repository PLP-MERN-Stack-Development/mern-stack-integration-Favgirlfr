import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Nav() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd', display: 'flex', gap: '1rem' }}>
      <Link to="/">Posts</Link>
      <Link to="/new">New Post</Link>
      <Link to="/categories">Categories</Link>
      <div style={{ marginLeft: 'auto' }}>
        {token ? (
          <>
            <span>{user?.email}</span>
            {' '}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>{' | '}
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}