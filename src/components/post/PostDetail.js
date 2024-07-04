import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { title } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/post/${title}`);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setPost(data);
        } else {
          console.error('Error fetching post:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Bài viết không tồn tại</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Người đăng: {post.user.username}</p>
      <img src={post.user.avatarUrl} alt="Avatar người đăng" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <h2>Bình luận</h2>
      {post.comments.map(comment => (
        <div key={comment.commentID}>
          <p>{comment.content}</p>
          <p>Người bình luận: {comment.user.username}</p>
          <img src={comment.user.avatarUrl} alt="Avatar người bình luận" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          {comment.replies.map(reply => (
            <div key={reply.replyID}>
              <p>{reply.content}</p>
              <p>Người trả lời: {reply.user.username}</p>
              <img src={reply.user.avatarUrl} alt="Avatar người trả lời" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PostDetail;