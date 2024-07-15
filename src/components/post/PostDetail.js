import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import Profile from "../home/Profile.js";
import Search from "../home/Search.js";
import NavBar from "../home/NavBar.js";
import './PostDetail.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from '../../asset/unknown-user.jpg';
import linkify from 'linkify-it';

const topicClasses = {
    'Lạm dụng, nghiện các chất': 'topic-1',
    'Căng thẳng & Kiệt quệ tinh thần': 'topic-2',
    'Trầm cảm & Lo lắng': 'topic-3',
    'Đau buồn & Mất mát': 'topic-4',
    'Các mối quan hệ bạn bè, gia đình, xã hội': 'topic-5',
    'Độc thân & Các mối quan hệ tình cảm': 'topic-6',
    'Công việc, tiền bạc, tài chính': 'topic-7',
    'Trẻ em và trẻ vị thành niên': 'topic-8',
    'Trường học và học tập': 'topic-9',
    'Tự tử & Tự làm hại bản thân': 'topic-10',
    'Tình dục & LGBT': 'topic-11',
    'Các chứng bệnh tâm thần ': 'topic-12',
    'Sức khoẻ': 'topic-13',
    'Các chủ đề khác': 'topic-14'
};

const purposeClasses = {
    'Cần lời khuyên': 'purpose-1',
    'Đưa lời khuyên': 'purpose-2',
    'Tâm sự và chia sẻ': 'purpose-3',
    'Câu chuyện thường ngày & Tán gẫu': 'purpose-4'
};

const PostDetail = () => {
    const { title } = useParams();
    const decodedTitle = decodeURIComponent(title);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [likeCount, setLikeCount] = useState(0);
    const [unlikeCount, setUnlikeCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState("");
    const [replyContents, setReplyContents] = useState({});
    const [showReplyBoxes, setShowReplyBoxes] = useState({});
    const [likeVisible, setLikeVisible] = useState(true);
    const [unlikeVisible, setUnlikeVisible] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/title/${encodeURIComponent(decodedTitle)}`);
                const commentsWithVisibility = response.data.comments.map(comment => ({
                    ...comment,
                    likeVisible: true,
                    unlikeVisible: true,
                    replies: comment.replies.map(reply => ({
                        ...reply,
                        likeVisible: true,
                        unlikeVisible: true,
                        clickCount: 0
                    }))
                }));
                setPost({ ...response.data, comments: commentsWithVisibility, clickCount: 0 });
                setLikeCount(response.data.likeCount);
                setUnlikeCount(response.data.unlikeCount);
                setLoading(false);

                const token = localStorage.getItem("token");
                if (token) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Lỗi lấy thông tin bài viết:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [decodedTitle]);

    const handleLikeClick = async () => {
        if (!isLoggedIn) {
            alert('Bạn hãy đăng nhập để tương tác với bài viết');
            return;
        }

        const newLikeClickCount = post.clickCount + 1;
        const newLikeCount = newLikeClickCount % 2 !== 0 ? likeCount + 1 : likeCount - 1;

        if (newLikeCount !== likeCount) {
            setPost({ ...post, clickCount: newLikeClickCount });
            setLikeCount(newLikeCount);
            setUnlikeVisible(!unlikeVisible);

            try {
                const token = localStorage.getItem("token");
                await axios.post(`http://localhost:8080/api/posts/like/${post.postID}`, {
                    likeCount: newLikeCount
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleUnlikeClick = async () => {
        if (!isLoggedIn) {
            alert('Bạn hãy đăng nhập để tương tác với bài viết');
            return;
        }

        const newUnlikeClickCount = post.clickCount + 1;
        const newUnlikeCount = newUnlikeClickCount % 2 !== 0 ? unlikeCount + 1 : unlikeCount - 1;

        if (newUnlikeCount !== unlikeCount) {
            setPost({ ...post, clickCount: newUnlikeClickCount });
            setUnlikeCount(newUnlikeCount);
            setLikeVisible(!likeVisible);

            try {
                const token = localStorage.getItem("token");
                await axios.post(`http://localhost:8080/api/posts/unlike/${post.postID}`, {
                    unlikeCount: newUnlikeCount
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCommentLikeClick = async (commentID, currentLikeCount) => {
        if (!isLoggedIn) {
            alert('Bạn hãy đăng nhập để tương tác với bình luận');
            return;
        }
    
        setPost(prevPost => {
            const updatedComments = prevPost.comments.map(comment => {
                if (comment.commentID === commentID) {
                    const newClickCount = comment.clickCount + 1;
                    const newLikeCount = newClickCount % 2 !== 0 ? currentLikeCount + 1 : currentLikeCount - 1;
    
                    if (newLikeCount !== currentLikeCount) {
                        try {
                            const token = localStorage.getItem("token");
                            axios.post(`http://localhost:8080/api/comments/like/${commentID}`, {
                                likeCount: newLikeCount
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });
                        } catch (error) {
                            console.error('Lỗi gửi lượt thích:', error);
                            if (error.response && error.response.status === 403) {
                                alert("Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại.");
                            }
                        }
    
                        return {
                            ...comment,
                            clickCount: newClickCount,
                            comment_likeCount: newLikeCount,
                            unlikeVisible: !comment.unlikeVisible
                        };
                    }
                }
                return comment;
            });
            return { ...prevPost, comments: updatedComments };
        });
    };
    
    const handleCommentUnlikeClick = async (commentID, currentUnlikeCount) => {
        if (!isLoggedIn) {
            alert('Bạn hãy đăng nhập để tương tác với bình luận');
            return;
        }
    
        setPost(prevPost => {
            const updatedComments = prevPost.comments.map(comment => {
                if (comment.commentID === commentID) {
                    const newClickCount = comment.clickCount + 1;
                    const newUnlikeCount = newClickCount % 2 !== 0 ? currentUnlikeCount + 1 : currentUnlikeCount - 1;
    
                    if (newUnlikeCount !== currentUnlikeCount) {
                        try {
                            const token = localStorage.getItem("token");
                            axios.post(`http://localhost:8080/api/comments/unlike/${commentID}`, {
                                unlikeCount: newUnlikeCount
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });
                        } catch (error) {
                            console.error('Lỗi gửi lượt không thích:', error);
                            if (error.response && error.response.status === 403) {
                                alert("Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại.");
                            }
                        }
    
                        return {
                            ...comment,
                            clickCount: newClickCount,
                            comment_unlikeCount: newUnlikeCount,
                            likeVisible: !comment.likeVisible
                        };
                    }
                }
                return comment;
            });
            return { ...prevPost, comments: updatedComments };
        });
    };
    
    const handleReplyLikeClick = async (replyID, commentID, currentLikeCount) => {
        if (!isLoggedIn) {
            alert('Bạn hãy đăng nhập để tương tác với trả lời');
            return;
        }

        setPost(prevPost => {
            const updatedComments = prevPost.comments.map(comment => {
                if (comment.commentID === commentID) {
                    const updatedReplies = comment.replies.map(reply => {
                        if (reply.replyID === replyID) {
                            const newClickCount = reply.clickCount + 1;
                            const newLikeCount = newClickCount % 2 !== 0 ? currentLikeCount + 1 : currentLikeCount - 1;

                            if (newLikeCount !== currentLikeCount) {
                                try {
                                    const token = localStorage.getItem("token");
                                    axios.post(`http://localhost:8080/api/replies/like/${replyID}`, {
                                        likeCount: newLikeCount
                                    }, {
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        }
                                    });
                                } catch (error) {
                                    console.error('Lỗi gửi lượt thích:', error);
                                    if (error.response && error.response.status === 403) {
                                        alert("Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại.");
                                    }
                                }

                                return {
                                    ...reply,
                                    clickCount: newClickCount,
                                    reply_likeCount: newLikeCount,
                                    unlikeVisible: !reply.unlikeVisible
                                };
                            }
                        }
                        return reply;
                    });
                    return {
                        ...comment,
                        replies: updatedReplies
                    };
                }
                return comment;
            });
            return { ...prevPost, comments: updatedComments };
        });
    };

    const handleReplyUnlikeClick = async (replyID, commentID, currentUnlikeCount) => {
        if (!isLoggedIn) {
            alert('Bạn hãy đăng nhập để tương tác với trả lời');
            return;
        }

        setPost(prevPost => {
            const updatedComments = prevPost.comments.map(comment => {
                if (comment.commentID === commentID) {
                    const updatedReplies = comment.replies.map(reply => {
                        if (reply.replyID === replyID) {
                            const newClickCount = reply.clickCount + 1;
                            const newUnlikeCount = newClickCount % 2 !== 0 ? currentUnlikeCount + 1 : currentUnlikeCount - 1;

                            if (newUnlikeCount !== currentUnlikeCount) {
                                try {
                                    const token = localStorage.getItem("token");
                                    axios.post(`http://localhost:8080/api/replies/unlike/${replyID}`, {
                                        unlikeCount: newUnlikeCount
                                    }, {
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        }
                                    });
                                } catch (error) {
                                    console.error('Lỗi gửi lượt không thích:', error);
                                    if (error.response && error.response.status === 403) {
                                        alert("Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại.");
                                    }
                                }

                                return {
                                    ...reply,
                                    clickCount: newClickCount,
                                    reply_unlikeCount: newUnlikeCount,
                                    likeVisible: !reply.likeVisible
                                };
                            }
                        }
                        return reply;
                    });
                    return {
                        ...comment,
                        replies: updatedReplies
                    };
                }
                return comment;
            });
            return { ...prevPost, comments: updatedComments };
        });
    };

    const handleCommentClick = () => {
        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập hoặc đăng ký tài khoản để bình luận.");
        } else {
            setShowCommentBox(prevShowCommentBox => !prevShowCommentBox);
        }
    };

    const handleCommentSubmit = async () => {
        if (comment.trim() === "") {
            alert("Nội dung bình luận không được để trống.");
            return;
        }

        if (!isLoggedIn) {
            alert("Bạn cần đăng nhập hoặc đăng ký tài khoản để bình luận.");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            await axios.post(`http://localhost:8080/api/comments`, {
                postID: post.postID,
                content: comment
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Bình luận của bạn đã được gửi.");
            setComment("");
            setShowCommentBox(false);

            const response = await axios.get(`http://localhost:8080/api/posts/title/${encodeURIComponent(decodedTitle)}`);
            const commentsWithVisibility = response.data.comments.map(comment => ({
                ...comment,
                likeVisible: true,
                unlikeVisible: true,
                replies: comment.replies.map(reply => ({
                    ...reply,
                    likeVisible: true,
                    unlikeVisible: true,
                    clickCount: 0
                }))
            }));
            setPost({ ...response.data, comments: commentsWithVisibility, clickCount: 0 });
        } catch (error) {
            console.error('Lỗi gửi bình luận:', error);
            alert("Có lỗi xảy ra khi gửi bình luận. Vui lòng thử lại.");
        }
    };

    const handleReplyClick = (commentID) => {
        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập hoặc đăng ký tài khoản để trả lời.");
        } else {
            setShowReplyBoxes(prevState => ({
                ...prevState,
                [commentID]: !prevState[commentID]
            }));
        }
    };

    const handleReplyChange = (commentID, content) => {
        setReplyContents(prevState => ({
            ...prevState,
            [commentID]: content
        }));
    };

    const handleReplySubmit = async (commentID) => {
        const replyContent = replyContents[commentID];
        if (replyContent.trim() === "") {
            alert("Nội dung trả lời không được để trống.");
            return;
        }
    
        const token = localStorage.getItem("token");
    
        if (!isLoggedIn) {
            alert("Bạn cần đăng nhập hoặc đăng ký tài khoản để trả lời.");
            return;
        }
    
        try {
            await axios.post(`http://localhost:8080/api/comments/${commentID}/replies`, {
                postID: post.postID, 
                content: replyContent
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Trả lời của bạn đã được gửi.");
            setReplyContents(prevState => ({
                ...prevState,
                [commentID]: ""
            }));
            setShowReplyBoxes(prevState => ({
                ...prevState,
                [commentID]: false
            }));
    
            const response = await axios.get(`http://localhost:8080/api/posts/title/${encodeURIComponent(decodedTitle)}`);
            const commentsWithVisibility = response.data.comments.map(comment => ({
                ...comment,
                likeVisible: true,
                unlikeVisible: true,
                replies: comment.replies.map(reply => ({
                    ...reply,
                    likeVisible: true,
                    unlikeVisible: true,
                    clickCount: 0
                }))
            }));
            setPost({ ...response.data, comments: commentsWithVisibility, clickCount: 0 });
        } catch (error) {
            console.error('Lỗi gửi trả lời:', error);
            alert("Có lỗi xảy ra khi gửi trả lời. Vui lòng thử lại.");
        }
    };

    const handleReportClick = async () => {
        if (!isLoggedIn) {
            alert("Bạn cần đăng nhập hoặc đăng ký tài khoản để báo cáo.");
            return;
        }

        if (window.confirm("Bạn có chắc chắn muốn báo cáo bài viết này không?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.post(`http://localhost:8080/api/reports`, {
                    reporterID: JSON.parse(localStorage.getItem("user")).id,
                    reportedItemID: post.postID,
                    itemType: "post",
                    reportContent: post.content,
                    reportedAt: new Date().toISOString()
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                alert("Báo cáo của bạn đã được gửi.");
            } catch (error) {
                console.error('Lỗi gửi báo cáo:', error);
                alert("Báo cáo đang được xem xét.");
            }
        }
    };

    const handleCommentReportClick = async (commentID) => {
        if (window.confirm("Bạn có chắc chắn muốn báo cáo bình luận này không?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.post(`http://localhost:8080/api/reports`, {
                    reporterID: JSON.parse(localStorage.getItem("user")).id,
                    reportedItemID: commentID,
                    itemType: "comment",
                    reportContent: "Báo cáo bình luận không phù hợp",
                    reportedAt: new Date().toISOString()
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                alert("Báo cáo của bạn đã được gửi.");
            } catch (error) {
                console.error('Lỗi gửi báo cáo:', error);
                alert("Có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại.");
            }
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const formatContent = (content) => {
        const linkifyInstance = linkify();
        const matches = linkifyInstance.match(content);
        if (matches) {
            matches.forEach(match => {
                content = content.replace(match.raw, 
                    `<a href="${match.url}" target="_blank" style="color: blue; text-decoration: underline; font-style: italic;">${match.raw}</a>`);
            });
        }
        return content.replace(/\n/g, '<br />');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Không tìm thấy bài viết</div>;
    }

    const topicPath = `/topic${Object.keys(topicClasses).indexOf(post.topic) + 1}`;
    const purposePath = `/purpose${Object.keys(purposeClasses).indexOf(post.purpose) + 1}`;

    const authorAvatar = post.author_avatar ? `data:image/jpeg;base64,${post.author_avatar}` : defaultAvatar;

    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="post-detail">
                    <button className={`button-topic ${topicClasses[post.topic] || ''}`}>
                        <Link to={topicPath} style={{ color: 'white', textDecoration: 'none' }}>{post.topic}</Link>
                    </button>
                    <button className={`button-purpose ${purposeClasses[post.purpose] || ''}`}>
                        <Link to={purposePath} style={{ color: 'white', textDecoration: 'none' }}>{post.purpose}</Link>
                    </button>
                    <h1>{post.title}</h1>
                    <div className="post-detail-container">
                        <div className="post-likes">
                            <p className="post-likeCount">{likeCount}</p>
                            {likeVisible && (
                                <button className="like-button" onClick={handleLikeClick}>
                                    <FontAwesomeIcon icon={faCaretUp} />
                                </button>
                            )}
                            {unlikeVisible && (
                                <button className="unlike-button" onClick={handleUnlikeClick}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </button>
                            )}
                            <p className="post-unlikeCount">{unlikeCount}</p>
                        </div>
                        <div className="post-info">
                            <div className="author-info">
                                <img
                                    src={authorAvatar}
                                    alt={post.author_username}
                                    className="avatar"
                                />
                                <p>{post.author_username}</p>
                            </div>
                            <div className="post-content" dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
                            <p className="post-time">Thời gian đăng bài: {formatDate(post.datePosted)}</p>
                            <div className="action-buttons">
                                <button className="comment-button" onClick={handleCommentClick}>Bình luận</button>
                                <button className="report-button" onClick={handleReportClick}>Báo cáo</button>
                            </div>
                        </div>
                    </div>
                </div>
                {showCommentBox && (
                    <div className="comment-box">
                        <button className="close-button" onClick={() => setShowCommentBox(false)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Nhập bình luận của bạn..."
                            style={{ height: '150px', width: '100%' }}
                        />
                        <button className="send-button" onClick={handleCommentSubmit}>Gửi</button>
                    </div>
                )}
                
                <div className="comments-section">
                    {post.comments.map(comment => (
                        <div key={comment.commentID}>
                            <div className="comments-detail-container">
                                <div className="post-likes">
                                    <p className="post-likeCount">{comment.comment_likeCount}</p>
                                    {comment.likeVisible && (
                                        <button className="like-button" onClick={() => handleCommentLikeClick(comment.commentID, comment.comment_likeCount)}>
                                            <FontAwesomeIcon icon={faCaretUp} />
                                        </button>
                                    )}
                                    {comment.unlikeVisible && (
                                        <button className="unlike-button" onClick={() => handleCommentUnlikeClick(comment.commentID, comment.comment_unlikeCount)}>
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </button>
                                    )}
                                    <p className="post-unlikeCount">{comment.comment_unlikeCount}</p>
                                </div>
                                <div className="post-info">
                                    <div className="author-info">
                                        <img
                                            src={defaultAvatar}
                                            alt={comment.commenter_username}
                                            className="avatar"
                                        />
                                        <p>{comment.commenter_username}</p>
                                    </div>
                                    <div className="post-content" dangerouslySetInnerHTML={{ __html: formatContent(comment.comment_content) }} />
                                    <p className="post-time">Bình luận vào lúc: {formatDate(comment.dateCommented)}</p>
                                    <div className="comment-actions">
                                        <button className="reply-button" onClick={() => handleReplyClick(comment.commentID)}>Trả lời</button>
                                        <button className="report-button" onClick={() => handleCommentReportClick(comment.commentID)}>Báo cáo</button>
                                    </div>
                                </div>
                                {showReplyBoxes[comment.commentID] && (
                                    <div className="reply-box">
                                        <button className="close-button" onClick={() => setShowReplyBoxes(prevState => ({
                                            ...prevState,
                                            [comment.commentID]: false
                                        }))}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                        <textarea
                                            value={replyContents[comment.commentID] || ""}
                                            onChange={(e) => handleReplyChange(comment.commentID, e.target.value)}
                                            placeholder="Nhập trả lời của bạn..."
                                            style={{ height: '100px', width: '300px' }}
                                        />
                                        <button className='send-button' onClick={() => handleReplySubmit(comment.commentID)}>Gửi</button>
                                    </div>
                                )}
                            </div>
                            {comment.replies && comment.replies.map(reply => (
                                <div key={reply.replyID} className="reply-detail-container">
                                    <div className="post-likes">
                                        <p className="post-likeCount">{reply.reply_likeCount}</p>
                                        {reply.likeVisible && (
                                            <button className="like-button" onClick={() => handleReplyLikeClick(reply.replyID, comment.commentID, reply.reply_likeCount)}>
                                                <FontAwesomeIcon icon={faCaretUp} />
                                            </button>
                                        )}
                                        {reply.unlikeVisible && (
                                            <button className="unlike-button" onClick={() => handleReplyUnlikeClick(reply.replyID, comment.commentID, reply.reply_unlikeCount)}>
                                                <FontAwesomeIcon icon={faCaretDown} />
                                            </button>
                                        )}
                                        <p className="post-unlikeCount">{reply.reply_unlikeCount}</p>
                                    </div>

                                    <div className="post-info">
                                        <div className="author-info">
                                            <img
                                                src={defaultAvatar}
                                                alt={reply.replier_username}
                                                className="avatar"
                                            />
                                            <p>{reply.replier_username}</p>
                                        </div>
                                        <div className="post-content" dangerouslySetInnerHTML={{ __html: formatContent(reply.reply_content) }} />
                                        <p className="post-time">Trả lời vào lúc: {formatDate(reply.reply_date)}</p>
                                        <div className="comment-actions">
                                            <button className="report-button" onClick={() => handleCommentReportClick(reply.replyID)}>Báo cáo</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
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
};

export default PostDetail;
