import React, { useState, useEffect } from "react";
import './Topic7.css';
import NavBar from "../NavBar";
import Profile from "../Profile";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import defaultAvatar from '../../../asset/unknown-user.jpg';

const purposeClasses = {
    'Cần lời khuyên': 'purpose-need-advice',
    'Đưa lời khuyên': 'purpose-give-advice',
    'Tâm sự và chia sẻ': 'purpose-share',
    'Câu chuyện thường ngày & Tán gẫu': 'purpose-chat'
};

const Topic7 = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axios.get('http://localhost:8080/cong-viec')
            .then(response => {
                setPosts(response.data);
                console.log(response.data);
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
                <div className="topic7-bar">
                    <h1 id="topic7-title"><FontAwesomeIcon icon={faSackDollar} id="topic7-item"/>Công việc, tiền bạc, tài chính</h1>
                </div>

                <div className="topic-posts">
                {error && <p className="error-message">{error}</p>}
                    <table className="topic-posts-table">
                        <thead className="topic-table-heading">
                            <tr>
                                <th className="topic-posts-table-author">Người viết</th>
                                <th className="topic-posts-table-title">Tiêu đề</th>
                                <th className="topic-posts-table-purpose">Mục đích</th>
                                <th className="topic-posts-table-likes">Thích / Không thích</th>
                                <th className="topic-posts-table-comment">Bình luận</th>
                                <th className="topic-posts-table-date-posted">Ngày đăng</th>
                            </tr>
                        </thead>
                        <tbody className="topic-table-body">
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td className="topic-posts-table-row-author">
                                        <div className="author-info">
                                        <img
                                            src={post.avatarUrl ? `data:image/jpeg;base64,${post.avatarUrl}` : defaultAvatar}
                                            alt={post.username}
                                            className="avatar"
                                        />
                                        <p>{post.username}</p>
                                        </div>
                                    </td>
                                    <td className="topic-posts-table-row-title">{post.title}</td>
                                    <td className={`topic-posts-table-row-topic ${purposeClasses[post.purpose] || ''}`}>{post.purpose}</td>                                    
                                    <td className="topic-posts-table-row-likes"><span className="like-count">{post.likeCount}</span> / <span className="unlike-count">{post.unlikeCount}</span></td>
                                    <td className="topic-posts-table-row-comment">{post.total_comments}</td>
                                    <td className="topic-posts-table-row-date-posted">{new Date(post.datePosted).toLocaleDateString()}</td>
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

export default Topic7;
