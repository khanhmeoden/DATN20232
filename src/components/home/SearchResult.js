import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../asset/unknown-user.jpg';
import NavBar from "./NavBar";
import Profile from "./Profile";
import './SearchResult.css';

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

const purposeClasses = {
    'Cần lời khuyên': 'purpose-need-advice',
    'Đưa lời khuyên': 'purpose-give-advice',
    'Tâm sự và chia sẻ': 'purpose-share',
    'Câu chuyện thường ngày & Tán gẫu': 'purpose-chat'
};

const SearchResult = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();

    // Đọc từ khóa tìm kiếm từ state
    const keyword = location.state?.keyword;

    useEffect(() => {
        if (keyword) {
            // Gửi yêu cầu tìm kiếm đến API server
            axios.get(`http://localhost:8080/search?keyword=${encodeURIComponent(keyword)}`)
                .then(response => {
                    console.log(response.data);
                    setSearchResults(response.data);
                    setError(null);
                })
                .catch(error => {
                    console.error('Lỗi khi tìm kiếm:', error);
                    setError('Đã xảy ra lỗi khi tìm kiếm');
                });
        }
    }, [keyword]);

    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div>
                    <h3 className="search-title">Kết quả tìm kiếm cho: {keyword}</h3>
                    {error && <p className="error-message">{error}</p>}
                    {searchResults.length > 0 ? (
                        <table className="search-result-table">
                            <thead>
                                <tr>
                                    <th className="result-table-header">Người viết</th>
                                    <th className="result-table-header">Tiêu đề</th>
                                    <th className="result-table-header">Chủ đề</th>
                                    <th className="result-table-header">Mục đích</th>
                                    <th className="result-table-header">Thích</th>
                                    <th className="result-table-header">Không thích</th>
                                    <th className="result-table-header">Bình luận</th>
                                    <th className="result-table-header">Ngày đăng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((result, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td className="search-result-table-row-username-avatar">
                                                <div className="author-info">
                                                    <img
                                                        src={result.avatarUrl ? `data:image/jpeg;base64,${result.avatarUrl}` : defaultAvatar}
                                                        alt={result.username}
                                                        className="avatar"
                                                    />
                                                    <p className="username">{result.username}</p>
                                                </div>
                                            </td>
                                            <td className="search-result-table-row-title">{result.title}</td>
                                            <td className={`search-result-table-row-topic ${topicClasses[result.topic]}`}>{result.topic}</td>
                                            <td className={`search-result-table-row-purpose ${purposeClasses[result.purpose]}`}>{result.purpose}</td>
                                            <td className="search-result-table-row-likes">{result.likeCount}</td>
                                            <td className="search-result-table-row-unlikes">{result.unlikeCount}</td>
                                            <td className="search-result-table-row-comment">{result.total_comments}</td>
                                            <td className="search-result-table-row-date-posted">{new Date(result.datePosted).toLocaleDateString()}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="8" className="search-result-table-row snippet">
                                                {result.snippet_before} {result.snippet_after} 
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Không tìm thấy kết quả phù hợp.</p>
                    )}
                </div>
            </div>

            <div className="right-content">
                <div className="profile-section">
                    <Profile />
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
