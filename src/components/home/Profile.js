import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get('http://localhost:8080/api/login', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching the profile', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile">
      {!profile ? (
        <div className='loading'>Loading...</div>
      ) : (
        <div className='user-brief-infor'>
          <h1>Profile</h1>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Full Name:</strong> {profile.fullname}</p>
          <img src={profile.avatarUrl} alt="Avatar" />
        </div>
      )}
    </div>
  );
}

export default Profile;
