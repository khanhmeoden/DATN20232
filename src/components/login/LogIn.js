import React, { useState } from 'react';
import './LogIn.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import googlebutton from '../../asset/googlebutton.jpg';
import facebookbutton from '../../asset/facebookbutton.png';

function LoginForm() {
  const [formLogin, setFormLogin] = useState({
    username_or_email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username_or_email, password } = formLogin;

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/api/login', { usernameOrEmail: username_or_email, password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        alert('Đăng nhập thành công!');
        navigate('/home');
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      setError(error.response?.data?.message || 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <div className="title">
          <h1><i>Đăng nhập</i></h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input type="text" id="username_or_email" name="username_or_email" value={formLogin.username_or_email} onChange={handleChange} placeholder="Tên người dùng hoặc email" required />
          </div>

          <div className="inputBox">
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formLogin.password} onChange={handleChange} placeholder="Mật khẩu" required />
            <button type="button" id="show" onClick={handleTogglePassword}>{showPassword ? 'Ẩn' : 'Hiện'}</button>
          </div>

          {error && <div className="error-message">{error}</div>}
          {loading && <div className="loading-message">Đang xử lý...</div>}

          <div className='google-login'>
            <img src={googlebutton} className='google' alt='Google Sign-in' />
          </div>

          <div className='facebook-login'>
            <img src={facebookbutton} className='facebook' alt='Đăng nhập với tài khoản Facebook' />
          </div>

          <button type="submit" disabled={loading}>Đăng nhập</button>
        </form>

        <div className="register">Chưa có tài khoản? <span onClick={() => navigate('/register')}>Đăng ký ngay!</span></div>
        <div className="home">Quay về diễn đàn chính? <span onClick={() => navigate('/')}>Trang chủ</span></div>
      </div>
    </div>
  );
}

export default LoginForm;
