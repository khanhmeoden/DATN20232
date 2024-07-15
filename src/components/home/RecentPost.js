import React, { useEffect, useState } from "react";
import './RecentPost.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Link } from "react-router-dom";
import defaultAvatar from '../../asset/unknown-user.jpg';

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
    'Các chứng bệnh tâm thần ': 'topic-psycho',
    'Sức khoẻ': 'topic-health',
    'Các chủ đề khác': 'topic-other'
};

const purposeClasses = {
    'Cần lời khuyên': 'purpose-need-advice',
    'Đưa lời khuyên': 'purpose-give-advice',
    'Tâm sự và chia sẻ': 'purpose-share',
    'Câu chuyện thường ngày & Tán gẫu': 'purpose-chat'
};


const RecentPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/recent-posts');
                setPosts(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recent-post-table-container">
            <div className="wpforo-category">
                <div className="wpforo-cat-panel">
                    <div className="cat-title" title="">
                        <span className="cat-icon">
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                        </span>
                        <span className="cat-name">BÀI VIẾT GẦN ĐÂY</span>
                    </div>
                </div>
                <div className="recent-post-table">
                    <table>
                        <thead>
                            <tr>
                                <th className="recent-post-table-header-username-avatar">Người viết</th>
                                <th className="recent-post-table-header-title">Tiêu đề</th>
                                <th className="recent-post-table-header-topic">Chủ đề</th>
                                <th className="recent-post-table-header-purpose">Mục đích</th>
                                <th className="recent-post-table-header-likes">Thích</th>
                                <th className="recent-post-table-header-date-posted">Ngày đăng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td className="recent-post-table-row-username-avatar">
                                        <div className="author-info">
                                            <img
                                                src={post.avatarUrl ? `data:image/jpeg;base64,${post.avatarUrl}` : defaultAvatar}
                                                alt={post.username}
                                                className="avatar"
                                            />
                                            <p>{post.username}</p>
                                        </div>
                                    </td>
                                    <td className="recent-post-table-row-title">
                                        <Link to={`/post/${encodeURIComponent(post.title)}`}>{post.title}</Link>
                                    </td>
                                    <td className={`recent-post-table-row-topic ${topicClasses[post.topic] || ''}`}>{post.topic}</td>                                    
                                    <td className={`recent-post-table-row-purpose ${purposeClasses[post.purpose] || ''}`}>{post.purpose}</td>
                                    <td className="recent-post-table-row-likes">{post.likeCount}</td>
                                    <td className="recent-post-table-row-date-posted">{new Date(post.datePosted).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RecentPost;
