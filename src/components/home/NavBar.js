import React, { useEffect, useState } from "react";
import './NavBar.css';
import logo from '../../asset/psychological.jpg';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true); 
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false); 
        navigate('/');
    };

    return (
        <div className="nav">
            <div className="logo-container" onClick={handleLogoClick}>
                <img src={logo} alt="Diễn đàn tâm lý" className="logo" />
            </div>
            <ul className="menu-list">
                <li className="link"><Link to="/" className="nav">Trang chủ</Link></li>
                {isLoggedIn && <li className="link"><Link to="/create-post" className="nav">Tạo bài viết</Link></li>}
                {isLoggedIn && <li className="link"><Link to="/user-info" className="nav">Hồ sơ cá nhân</Link></li>}
                {isLoggedIn && <li className="link"><Link to="/" onClick={handleLogout} className="nav">Đăng xuất</Link></li>}
                {!isLoggedIn && <li className="link"><Link to="/login" className="nav">Đăng nhập</Link></li>}
                {!isLoggedIn && <li className="link"><Link to="/register" className="nav">Đăng ký tài khoản</Link></li>}
            </ul>
        </div>
    );
}

export default NavBar;
