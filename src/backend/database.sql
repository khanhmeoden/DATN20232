CREATE DATABASE IF NOT EXISTS datn;

USE datn;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('Nam', 'Nữ', 'Khác') NOT NULL,
    address TEXT NOT NULL, 
    avatarUrl VARCHAR(255)
);

CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    title NVARCHAR(255),
    content TEXT,
    topic NVARCHAR(255),
    purpose TEXT,
    datePosted DATETIME,
    likeCount INT DEFAULT 0,
    unlikeCount INT DEFAULT 0,
    imageURL VARCHAR(255) NULL,
    videoURL VARCHAR(255) NULL,
    FOREIGN KEY (userID) REFERENCES users(id)
) CHARACTER SET utf8mb4;

CREATE TABLE comments (
    commentID INT AUTO_INCREMENT PRIMARY KEY,
    postID INT,
    userID INT,
    content TEXT,
    dateCommented DATETIME,
    likeCount INT DEFAULT 0,
    FOREIGN KEY (postID) REFERENCES posts(postID),
    FOREIGN KEY (userID) REFERENCES users(id)
) CHARACTER SET utf8mb4;

CREATE TABLE userStats (
    userID INT PRIMARY KEY,
    totalPosts INT DEFAULT 0,
    totalComments INT DEFAULT 0,
    totalLikes INT DEFAULT 0,
    totalUnlikes INT DEFAULT 0,
    FOREIGN KEY (userID) REFERENCES users(id)
);

CREATE TABLE messages (
    messageID INT AUTO_INCREMENT PRIMARY KEY,
    senderID INT,
    recipientID INT,
    content TEXT,
    sentAt DATETIME,
    FOREIGN KEY (senderID) REFERENCES users(id),
    FOREIGN KEY (recipientID) REFERENCES users(id)
);

CREATE TABLE notifications (
    notificationID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    notificationType ENUM('like_post', 'like_comment', 'comment_post') NOT NULL,
    postID INT,
    commentID INT,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt DATETIME,
    FOREIGN KEY (userID) REFERENCES users(id),
    FOREIGN KEY (postID) REFERENCES posts(postID),
    FOREIGN KEY (commentID) REFERENCES comments(commentID)
);

CREATE TABLE reports (
    reportID INT AUTO_INCREMENT PRIMARY KEY,
    reporterID INT,
    reportedItemID INT,
    itemType ENUM('post', 'comment') NOT NULL,
    reportContent TEXT,
    reportedAt DATETIME,
    FOREIGN KEY (reporterID) REFERENCES users(id),
    FOREIGN KEY (reportedItemID) REFERENCES posts(postID) ON DELETE CASCADE,
    FOREIGN KEY (reportedItemID) REFERENCES comments(commentID) ON DELETE CASCADE
);

-- Bài viết gần đây

SELECT users.username, users.avatarUrl, posts.title, posts.topic, posts.content, posts.likeCount, posts.datePosted
FROM users
JOIN posts ON users.id = posts.userID
ORDER BY posts.datePosted DESC
LIMIT 10;

-- Chủ đề bài viết

SELECT users.username, users.avatarUrl, posts.title, posts.purpose, posts.likeCount, posts.unlikeCount, COUNT(comments.commentID) AS commentCount, posts.datePosted
FROM users
JOIN posts ON users.id = posts.userID
LEFT JOIN comments ON posts.post_id = comments.postID
WHERE posts.topic = 'Chủ đề cụ thể'
GROUP BY posts.post_id
ORDER BY posts.datePosted DESC;

-- Mục đíh bài viết

SELECT users.username, users.avatarUrl, posts.title, posts.topic, posts.likeCount, posts.unlikeCount, COUNT(comments.commentID) AS commentCount, posts.datePosted
FROM users
JOIN posts ON users.id = posts.userID
LEFT JOIN comments ON posts.post_id = comments.postID
WHERE posts.purpose = 'Mục đích cụ thể'
GROUP BY posts.post_id
ORDER BY posts.datePosted DESC;

SELECT users.username, users.avatarUrl, posts.title, posts.topic, posts.purpose, posts.content
FROM users
JOIN posts ON users.id = posts.userID
WHERE posts.purpose LIKE '%Từ_khóa_tìm_kiếm%'

-- Hoạt động gần đây

SELECT comments.content AS CommentContent, users.username AS CommentAuthor, users.avatarUrl AS CommentAuthorAvatar, posts.title AS PostTitle
FROM comments
JOIN users ON comments.userID = users.id
JOIN posts ON comments.postID = posts.postID
ORDER BY comments.datePosted DESC
LIMIT 10;
