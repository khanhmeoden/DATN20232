import React, { useState } from "react";
import './CreatePost.css';
import Search from "./Search";
import RecentActivity from "./RecentActivity";
import NavBar from "./NavBar";
import axios from "axios";
import Profile from "./Profile";

const CreatePost = () => {
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        topic: '',
        purpose: '',
        time: '',
        imageURL: null, 
        videoURL: null
    });

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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        const videoFiles = files.filter(file => file.type.startsWith('video/'));

        if (imageFiles.length > 0) {
            setPostData({
                ...postData,
                imageURL: imageFiles[0]
            });
        }

        if (videoFiles.length > 0) {
            setPostData({
                ...postData,
                videoURL: videoFiles[0]
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentTime = getCurrentTime();
        
        // Tạo FormData để gửi dữ liệu bao gồm cả file
        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('content', postData.content);
        formData.append('topic', postData.topic);
        formData.append('purpose', postData.purpose);
        formData.append('time', currentTime);
        if (postData.imageURL) {
            formData.append('imageURL', postData.imageURL);
        }
        if (postData.videoURL) {
            formData.append('videoURL', postData.videoURL);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/add-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.status === 200) {
                alert("Bài viết đã được đăng thành công!");
                // Đặt lại trạng thái postData để xóa dữ liệu đã nhập sau khi đăng bài thành công
                setPostData({
                    title: '',
                    content: '',
                    topic: '',
                    purpose: '',
                    time: '',
                    imageURL: null, 
                    videoURL: null
                });
            }
        } catch (error) {
            console.error('Lỗi khi đăng bài viết:', error);
            alert("Đã xảy ra lỗi khi đăng bài viết. Vui lòng thử lại sau!");
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
                            <label htmlFor="file">Đăng tải ảnh hoặc video nếu có:</label>
                            <input type="file" id="post-file" name="file" accept="image/*, video/*" multiple onChange={handleFileChange}/>
                        </div>
                        
                        <button className="submit-post" type="submit">Đăng bài</button>
                    </form>
                </div>
            </div>

            <div className="right-content">
                <div className="user-info">
                    <Profile />
                </div>

                <div className="search">
                    <Search />
                </div>
                <div className="recent-activity">
                    <RecentActivity />
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
