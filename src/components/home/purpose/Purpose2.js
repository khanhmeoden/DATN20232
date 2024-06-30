import React, { useState, useEffect } from "react";
import './Purpose2.css';
import NavBar from "../NavBar";
import Profile from "../Profile";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
import axios from 'axios';
import defaultAvatar from '../../../asset/unknown-user.jpg';

const topicClasses = {
    'Lạm dụng, nghiện các chất': 'topic-abuse',
    'Căng thẳng & Kiệt quệ tinh thần': 'topic-stress',
    'Trầm cảm & Lo lắng': 'topic-depression',
    'Đau buồn & Mất mát': 'topic-grief',
    'Các mối quan hệ bạn bè, gia đình, xã hội': 'topic-relationships',
    'Độc thân & Các mối quan hệ tình cảm': 'topic-dating',
    'Công việc, tiền bạc, tài chính': 'topic-finance',
    'Trẻ em và trẻ vị thành niên': 'topic-children',
    'Trường học và học tập': 'topic-school',
    'Tự tử & Tự làm hại bản thân': 'topic-suicide',
    'Tình dục & LGBT': 'topic-lgbt',
    'Ăn uống, dinh duỡng': 'topic-nutrition',
    'Sức khoẻ': 'topic-health',
    'Các chủ đề khác': 'topic-other'
};

const Purpose2 = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axios.get('http://localhost:8080/dua-loi-khuyen')
            .then(response => {
                setPosts(response.data);
                setError(null);
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu:', error);
                setError('Đã xảy ra lỗi khi lấy dữ liệu');
            });
    };

    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="purpose2-bar">
                    <h1 id="purpose2-title">Đưa lời khuyên</h1>
                </div>

                <div className="purpose-posts">
                    {error && <p className="error-message">{error}</p>}
                    <table className="purpose-posts-table">
                        <thead className="purpose2-table-heading">
                            <tr>
                                <th className="purpose-posts-table-author">Người viết</th>
                                <th className="purpose-posts-table-title">Tiêu đề</th>
                                <th className="purpose-posts-table-topic">Chủ đề</th>
                                <th className="purpose-posts-table-likes">Thích / Không thích</th>
                                <th className="purpose-posts-table-comment">Bình luận</th>
                                <th className="purpose-posts-table-date-posted">Ngày đăng</th>
                            </tr>
                        </thead>
                        <tbody className="purpose2-table-body">
                            {posts.map((post, index) => (
                                <tr key={index}>
                                    <td className="purpose-posts-table-row-author">
                                        <div className="author-info">
                                        <img
                                            src={post.avatarUrl ? `data:image/jpeg;base64,${post.avatarUrl}` : defaultAvatar}
                                            alt={post.username}
                                            className="avatar"
                                        />
                                        <p>{post.username}</p>
                                        </div>
                                    </td>
                                    <td className="purpose-posts-table-row-title">{post.title}</td>
                                    <td className={`purpose-posts-table-row-topic ${topicClasses[post.topic] || ''}`}>{post.topic}</td>                                    
                                    <td className="purpose-posts-table-row-likes"><span className="like-count">{post.likeCount}</span> / <span className="unlike-count">{post.unlikeCount}</span></td>
                                    <td className="purpose-posts-table-row-comment">{post.total_comments}</td>
                                    <td className="purpose-posts-table-row-date-posted">{new Date(post.datePosted).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="right-content">
                <div className="profile-section">
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

export default Purpose2;
