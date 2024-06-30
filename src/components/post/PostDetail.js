import React, { useEffect, useState } from 'react';
import axios from 'axios';
import defaultAvatar from '../../asset/unknown-user.jpg';

const PostDetail = ({ match }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostDetail = async () => {
            const postId = match.params.postId;
            try {
                const response = await axios.get(`http://localhost:8080/api/post/${postId}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post detail:', error);
                setLoading(false);
            }
        };

        fetchPostDetail();
    }, [match.params.postId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found.</div>;
    }

    return (
        <div className="post-detail">
            <div className="post-author">
                <img src={post.author.avatarUrl ? `data:image/jpeg;base64,${post.author.avatarUrl}` : defaultAvatar} alt={post.author.username} className="avatar" />
                <p>{post.author.username}</p>
            </div>
            <div className="post-content">
                <h2>{post.title}</h2>
                <div className="post-info">
                    <p><strong>Chủ đề:</strong> {post.topic}</p>
                    <p><strong>Mục đích:</strong> {post.purpose}</p>
                    <p><strong>Nội dung:</strong> {post.content}</p>
                    <p><strong>Số lượt thích:</strong> {post.likeCount}</p>
                    <p><strong>Số lượt không thích:</strong> {post.unlikeCount}</p>
                    <p><strong>Ngày đăng:</strong> {new Date(post.datePosted).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="comments">
                {post.comments.map(comment => (
                    <div key={comment.commentId} className="comment">
                        <div className="comment-author">
                            <img src={comment.user.avatarUrl ? `data:image/jpeg;base64,${comment.user.avatarUrl}` : defaultAvatar} alt={comment.user.username} className="avatar" />
                            <p>{comment.user.username}</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                            <p><strong>Số lượt thích:</strong> {comment.likeCount}</p>
                            <p><strong>Ngày đăng:</strong> {new Date(comment.datePosted).toLocaleDateString()}</p>
                        </div>
                        {comment.replies.map(reply => (
                            <div key={reply.replyId} className="reply">
                                <div className="reply-author">
                                    <img src={reply.user.avatarUrl ? `data:image/jpeg;base64,${reply.user.avatarUrl}` : defaultAvatar} alt={reply.user.username} className="avatar" />
                                    <p>{reply.user.username}</p>
                                </div>
                                <div className="reply-content">
                                    <p>{reply.content}</p>
                                    <p><strong>Số lượt thích:</strong> {reply.likeCount}</p>
                                    <p><strong>Ngày đăng:</strong> {new Date(reply.datePosted).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="comment-form">
                {/* Để lại form comment ở đây */}
            </div>
        </div>
    );
};

export default PostDetail;
