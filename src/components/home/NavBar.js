import React from "react";
import './NavBar.css';
import logo from '../../asset/psychological.jpg';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate(); 

    const handleLogoClick = () => {
        navigate('/home');
    };

    return (
            <div className="nav">
                <div className="logo-container" onClick={handleLogoClick}>
                    <img src={logo} alt="Diễn đàn tân lý" className="logo"></img>                    
                </div>
                <ul className="menu-list">
                    <li className="link"><a href="/home" className="nav">Trang chủ</a></li>
                    <li className="link"><a href="/create-post" className="nav">Tạo bài viết</a></li>
                    <li className="link"><a href="/user-info" className="nav">Hồ sơ cá nhân</a></li>
                    <li className="link"><a href="/message" className="nav">Tin nhắn</a></li>
                    <li className="link"><a href="/" className="nav">Đăng xuất</a></li>
                </ul>
            </div>
    );
}

export default NavBar;
