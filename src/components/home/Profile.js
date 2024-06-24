import React, { useEffect, useState } from 'react';
import unknown_user from '../../asset/unknown-user.jpg';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Stored token:', token);

        const response = await fetch('http://localhost:8080/api/user-info', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          if (response.status === 401) {
            setError('Token không hợp lệ, vui lòng đăng nhập lại.');
            window.location.href = '/login';
          } else {
            setError(data.message || 'Failed to fetch user info');
          }
          console.error('Error response:', data);
        }
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div className="user-profile">
      <h1 className="welcome">Chào mừng bạn đã đến với website</h1>
      <img 
        src={user.avatarUrl ? user.avatarUrl : unknown_user} 
        alt="Avatar của người dùng" 
        className={user.avatarUrl ? "user-profile-avatar" : "profile-default-avatar"} 
      />
      <h1 className="user-profile-fullname">{user.fullname}</h1>
      <p className="user-profile-username">@{user.username}</p>
    </div>
  );
};

export default Profile;
