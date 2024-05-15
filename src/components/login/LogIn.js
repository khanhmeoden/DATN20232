import React, { useState } from 'react';
import './LogIn.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import googlebutton from '../../asset/googlebutton.jpg'

function Navigrate(url){
  window.location.href = url;
}

async function auth(){
  const respone = await fetch('http://localhost:8080/api/auth/google/callback',{method:'post'});
  const data = await respone.json();
  Navigrate(data.url);
}

function LoginForm() {
  const [formLogin, setFormLogin] = useState({
    username_or_email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);

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
      const response = await axios.post('http://localhost:8080/api/login', { usernameOrEmail: username_or_email, password });
      if (response.status === 200) {
        alert('Đăng nhập thành công !');
        navigate('/home')
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      setError(true)
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
          
          {error && <div className="error-message">Bạn đã nhập sai thông tin. Vui lòng thử lại !</div>}
          <div onClick={() => auth()}>
            <img src={googlebutton} className='google' alt='Google Sign-in'></img>
          </div>

          <button type="submit">Đăng nhập</button>
        </form>

        <div className="register">Chưa có tài khoản? <span onClick={() => navigate('/register')}>Đăng ký ngay !</span></div>
        <div className="home">Quay về diễn đàn chính?<span onClick={() => navigate('/')}> Trang chủ</span></div>
      </div>
    </div>
  );
}

export default LoginForm;
