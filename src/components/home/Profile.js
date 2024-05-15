import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
// import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Giải mã token để lấy thông tin người dùng
      const decoded = jwtDecode(token);
      setUser({
        username: decoded.username,
        email: decoded.email,
        avatarUrl: decoded.avatarUrl
      });
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="user-info">
        <img src={user.avatarUrl} alt="Avatar" className="avatar" />
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
