import React from "react";
import './NavBar.css';
import logo from '../../asset/psychological.jpg';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate(); 

    const handleLogoClick = () => {
        navigate('/home');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Điều hướng người dùng đến trang đăng nhập hoặc trang chủ
    };

    return (
        <div className="nav">
            <div className="logo-container" onClick={handleLogoClick}>
                <img src={logo} alt="Diễn đàn tâm lý" className="logo" />
            </div>
            <ul className="menu-list">
                <li className="link"><Link to="/home" className="nav">Trang chủ</Link></li>
                <li className="link"><Link to="/create-post" className="nav">Tạo bài viết</Link></li>
                <li className="link"><Link to="/user-info" className="nav">Hồ sơ cá nhân</Link></li>
                <li className="link"><Link to="/message" className="nav">Tin nhắn</Link></li>
                <li className="link"><Link to="/" onClick={handleLogout} className="nav">Đăng xuất</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;
