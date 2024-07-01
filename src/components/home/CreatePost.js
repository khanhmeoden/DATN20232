import React, { useState } from "react";
import './CreatePost.css';
import Search from "./Search";
import NavBar from "./NavBar";
import axios from "axios";
import Profile from "./Profile";

const CreatePost = () => {
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        topic: '',
        purpose: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const topics = [
        'Lạm dụng, nghiện các chất',
        'Căng thẳng & Kiệt quệ tinh thần',
        'Trầm cảm & Lo lắng',
        'Đau buồn & Mất mát',
        'Các mối quan hệ bạn bè, gia đình, xã hội',
        'Độc thân & Các mối quan hệ tình cảm',
        'Công việc, tiền bạc, tài chính',
        'Trẻ em và trẻ vị thành niên',
        'Trường học và học tập',
        'Tự tử & Tự làm hại bản thân',
        'Tình dục & LGBT',
        'Ăn uống, dinh dưỡng',
        'Sức khoẻ',
        'Các chủ đề khác'
    ];

    const purposes = [
        'Cần lời khuyên',
        'Đưa lời khuyên',
        'Tâm sự và chia sẻ',
        'Câu chuyện thường ngày & Tán gẫu'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const getCurrentTime = () => {
        const now = new Date();
        const formattedTime = `${("0" + now.getHours()).slice(-2)}:${("0" + now.getMinutes()).slice(-2)} - ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}`;
        return formattedTime;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const currentTime = getCurrentTime();

        const formData = {
            title: postData.title,
            content: postData.content,
            topic: postData.topic,
            purpose: postData.purpose,
            time: currentTime
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/add-post', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.status === 200) {
                alert("Bài viết đã được đăng thành công!");
                setPostData({
                    title: '',
                    content: '',
                    topic: '',
                    purpose: ''
                });
            };
        } catch (error) {
            console.error('Lỗi khi đăng bài viết:', error);
            setError("Tiêu đề bài viết đã tồn tại, bạn hãy nhập tiêu đề mới !");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="create-bar">
                    <h1 id="create-title">Tạo bài viết</h1>
                </div>

                <div className="post">
                    <form onSubmit={handleSubmit}>
                        <div className="post-title">
                            <label htmlFor="title">Tiêu đề:</label>
                            <input type="text" id="title" name="title" value={postData.title} placeholder="Nhập tiêu đề bài viết" onChange={handleChange} required />
                        </div>

                        <div className="post-content">
                            <label htmlFor="content">Nội dung:</label>
                            <textarea id="content" name="content" value={postData.content} placeholder="Nhập nội dung bài viết" onChange={handleChange} rows="10" cols="70" required></textarea>
                        </div>

                        <div className="post-topic">
                            <label htmlFor="topic">Chủ đề thảo luận:</label>
                            <select id="topic" name="topic" value={postData.topic} onChange={handleChange} required>
                                <option value="">Chọn chủ đề</option>
                                {topics.map(topic => (
                                    <option key={topic} value={topic}>{topic}</option>
                                ))}
                            </select>
                        </div>

                        <div className="post-purpose">
                            <label htmlFor="purpose">Mục đích thảo luận:</label>
                            <select id="purpose" name="purpose" value={postData.purpose} onChange={handleChange} required>
                                <option value="">Chọn mục đích</option>
                                {purposes.map(purpose => (
                                    <option key={purpose} value={purpose}>{purpose}</option>
                                ))}
                            </select>
                        </div>

                        <div className="post-upload">
                            <label>Bạn có thể thêm đường dẫn URL của hình ảnh, video, bài hát,... trong phần nội dung bài viết</label>
                        </div>

                        {error && <div className="error">{error}</div>}
                        
                        <button className="submit-post" type="submit" disabled={isLoading}>
                            {isLoading ? 'Đang đăng...' : 'Đăng bài'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="right-content">
                <div className="profile-section">
                    <Profile />
                </div>

                <div className="search">
                    <Search />
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
