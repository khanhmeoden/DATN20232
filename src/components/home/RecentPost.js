import React, { useEffect, useState } from "react";
import './RecentPost.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const RecentPost = () => {
    // const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8080/api/recent-posts');
    //             setPosts(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching posts:', error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchPosts();
    // }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recent-post-table">
            <div className="wpforo-category">
                <div className="wpforo-cat-panel">
                    <div className="cat-title" title="">
                        <span className="cat-icon">
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                        </span>
                        <span className="cat-name">BÀI VIẾT GẦN ĐÂY</span>
                    </div>
                </div>
                <div className="recent-post-header">
                    <div className="recent-post-box author">Người viết</div>
                    <div className="recent-post-box title">Tiêu đề</div>
                    <div className="recent-post-box topic">Chủ đề</div>
                    <div className="recent-post-box purpose">Mục đích</div>
                    <div className="recent-post-box like">Thích</div>  
                    <div className="recent-post-box time">Thời gian</div>  
                </div>
                {/* {posts.map((post) => (
                    <div key={post.post_id} className="recent-post-row">
                        <div className="recent-post-box author">
                            <img src={post.avatarUrl} alt="avatar" className="avatar"/>
                            {post.username}
                        </div>
                        <div className="recent-post-box title">{post.title}</div>
                        <div className="recent-post-box topic">{post.topic}</div>
                        <div className="recent-post-box purpose">{post.purpose}</div>
                        <div className="recent-post-box like">{post.likeCount}</div>
                        <div className="recent-post-box time">{new Date(post.datePosted).toLocaleString()}</div>
                    </div>
                ))} */}
            </div>
        </div>
    );
}

export default RecentPost;
