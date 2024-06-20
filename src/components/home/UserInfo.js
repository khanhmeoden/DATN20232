import React, { useState, useEffect } from "react";
import axios from 'axios';
import './UserInfo.css';
import NavBar from "./NavBar";
import Profile from "./Profile";
import Search from "./Search";
import RecentActivity from "./RecentActivity";
import unknown_user from "../../asset/unknown-user.jpg";

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('info');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullname: '',
        dob: '',
        gender: '',
        address: '',
        avatarUrl: ''
    });
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token'); // Giả sử token được lưu trong localStorage
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/api/user-info', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data.user);
                    setFormData({
                        username: response.data.user.username,
                        email: response.data.user.email,
                        fullname: response.data.user.fullname,
                        dob: response.data.user.dob,
                        gender: response.data.user.gender,
                        address: response.data.user.address,
                        avatarUrl: response.data.user.avatarUrl
                    });
                } catch (error) {
                    console.error('Lỗi khi lấy thông tin người dùng:', error);
                }
            }
        };
        fetchUserInfo();
    }, []);

    // Hàm định dạng ngày sinh
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    // Hàm xử lý thay đổi dữ liệu form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Hàm xử lý thay đổi avatar
    const handleAvatarChange = (e) => {
        setAvatarFile(e.target.files[0]);
    };

    // Hàm xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const updatedData = { ...formData };

        if (avatarFile) {
            const formData = new FormData();
            formData.append('avatar', avatarFile);

            try {
                const avatarResponse = await axios.post('http://localhost:8080/api/upload-avatar', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                updatedData.avatarUrl = avatarResponse.data.avatarUrl;
            } catch (error) {
                console.error('Lỗi khi tải lên avatar:', error);
                alert('Có lỗi xảy ra khi tải lên avatar.');
                return;
            }
        }

        try {
            const response = await axios.put('http://localhost:8080/api/update-user', updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                alert('Cập nhật thông tin thành công!');
                setUser(response.data.user);
                setActiveTab('info');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin.');
        }
    };

    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="profile-bar">
                    <h1 id="profile-title">Hồ sơ người dùng</h1>
                </div>

                <div className="user-avatar-and-username">
                    {user && <img src={user.avatarUrl || unknown_user} alt="Avatar" className={user.avatarUrl ? "user-avatar" : "default-avatar"} />}
                    {user && <h1>{user.username}</h1>}
                </div>

                <div className="tabs">
                    <button className={activeTab === 'info' ? 'active' : ''} onClick={() => setActiveTab('info')}>Thông tin người dùng</button>
                    <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>Thống kê</button>
                    <button className={activeTab === 'edit' ? 'active' : ''} onClick={() => setActiveTab('edit')}>Chỉnh sửa thông tin</button>
                </div>

                <div className="tab-content">
                    {activeTab === 'info' && user && (
                        <div className="user-info">
                            <h2>Thông tin người dùng</h2>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Họ tên đầy đủ:</strong> {user.fullname}</p>
                            <p><strong>Ngày sinh:</strong> {formatDate(user.dob)}</p>
                            <p><strong>Giới tính:</strong> {user.gender}</p>
                            <p><strong>Địa chỉ:</strong> {user.address}</p>
                        </div>
                    )}
                    {activeTab === 'stats' && user && (
                        <div className="user-stats">
                            <h2>Thống kê</h2>
                            <p><strong>Tổng số bài viết:</strong> {user.totalPosts}</p>
                            <p><strong>Tổng số bình luận:</strong> {user.totalComments}</p>
                            <p><strong>Tổng số lượt thích:</strong> {user.totalLikes}</p>
                            <p><strong>Tổng số lượt không thích:</strong> {user.totalUnlikes}</p>
                        </div>
                    )}
                    {activeTab === 'edit' && (
                        <form className="edit-user-form" onSubmit={handleSubmit}>
                            <h2>Chỉnh sửa thông tin người dùng</h2>
                            <div className="form-group">
                                <label>Tên đăng nhập:</label>
                                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Họ tên đầy đủ:</label>
                                <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Ngày sinh:</label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Giới tính:</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} required>
                                    <option value="Male">Nam</option>
                                    <option value="Female">Nữ</option>
                                    <option value="Other">Khác</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ:</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Avatar:</label>
                                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                            </div>
                            <button type="submit">Lưu thay đổi</button>
                        </form>
                    )}
                </div>
            </div>

            <div className="right-content">
                <div className="profile-section">
                    <Profile />
                </div>
                <div className="search-section">
                    <Search />
                </div>
                <div className="recent-activity-section">
                    <RecentActivity />
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
