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
    address TEXT, 
    avatarUrl LONGBLOB
);

CREATE TABLE posts (
    postID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    title VARCHAR(255) UNIQUE,
    content TEXT,
    topic VARCHAR(255),
    purpose VARCHAR(255),
    datePosted DATETIME,
    likeCount INT DEFAULT 0,
    unlikeCount INT DEFAULT 0,
    FOREIGN KEY (userID) REFERENCES users(id)
) CHARACTER SET utf8mb4;

CREATE TABLE comments (
    commentID INT AUTO_INCREMENT PRIMARY KEY,
    postID INT,
    userID INT,
    content TEXT,
    dateCommented DATETIME,
    likeCount INT DEFAULT 0,
    unlikeCount INT DEFAULT 0,
    FOREIGN KEY (postID) REFERENCES posts(postID),
    FOREIGN KEY (userID) REFERENCES users(id)
) CHARACTER SET utf8mb4;

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
