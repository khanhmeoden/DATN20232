const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 8080; 
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datn'
});
db.connect();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); 

const jwt_secret = 'b96df5dab1b40f674d2c33871193263ce27a5c1bc824a1365f3bb0255ec47056';

app.post('/api/users', (req, res) => {
    const formData = req.body;

    const query = `INSERT INTO users (username, fullname, email, password, gender, dob, address, avatarUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [formData.username, formData.fullname, formData.email, formData.password, formData.gender, formData.dob, formData.address, formData.avatarUrl], (err, result) => {
        if (err) {
            console.error('Lỗi kết nối tới database:', err);
            res.status(500).json('Internal Server Error');
        } else {
            console.log('Người dùng mới:', result.insertId);
            res.status(200).json('Tạo mới người dùng thành công !');
        }
    });
});

// API đăng nhập
app.post('/api/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;

    // Kiểm tra xem usernameOrEmail có phải là username hay email
    const query = `
        SELECT 
            users.id, users.username, users.email, users.fullname, users.dob, 
            users.gender, users.address, users.avatarUrl, users.password 
        FROM users  
        WHERE users.username = ? OR users.email = ?`;
    db.query(query, [usernameOrEmail, usernameOrEmail], (err, result) => {
        if (err) {
            console.error('Lỗi kết nối tới cơ sở dữ liệu:', err);
            return res.status(500).json('Lỗi máy chủ nội bộ');
        } else if (result.length > 0) {
            const user = result[0];
            // So sánh mật khẩu plaintext
            if (password === user.password) {
                console.log('Người dùng đăng nhập thành công:', usernameOrEmail);
                // Tạo jwt
                const token = jwt.sign({
                    id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    avatarUrl: user.avatarUrl
                }, jwt_secret, { expiresIn: '3h' });
                // Trả về token và thông tin người dùng
                return res.status(200).json({
                    message: 'Đăng nhập thành công!',
                    token: token,
                    user: {
                        id: user.id,
                        username: user.username,
                        fullname: user.fullname,
                        avatarUrl: user.avatarUrl,
                    }
                });
            } else {
                console.log('Sai mật khẩu');
                return res.status(401).json('Sai tên đăng nhập hoặc mật khẩu');
            }
        } else {
            console.log('Không tìm thấy người dùng');
            return res.status(401).json('Sai tên đăng nhập hoặc mật khẩu');
        }
    });
});

// Middleware để xác thực JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, jwt_secret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token không hợp lệ' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Token không được cung cấp' });
    }
};

// Endpoint để lấy thông tin người dùng
app.get('/api/user-info', authenticateJWT, (req, res) => {
    const userID = req.user.id;

    const query = `
        SELECT 
            u.id, u.username, u.email, u.fullname, u.dob, 
            u.gender, u.address, u.avatarUrl,
            COALESCE(COUNT(DISTINCT p.postID), 0) AS total_posts,
            COALESCE(COUNT(DISTINCT c.commentID), 0) AS total_comments,
            COALESCE(SUM(p.likeCount), 0) + COALESCE(SUM(c.likeCount), 0) AS total_likes,
            COALESCE(SUM(p.unlikeCount), 0) + COALESCE(SUM(c.unlikeCount), 0) AS total_unlikes
        FROM users u
        LEFT JOIN posts p ON u.id = p.userID
        LEFT JOIN comments c ON u.id = c.userID
        WHERE u.id = ?
        GROUP BY u.id, u.username, u.email, u.fullname, u.dob, 
                 u.gender, u.address, u.avatarUrl`;

    db.query(query, [userID], (err, result) => {
        if (err) {
            console.error('Lỗi kết nối tới cơ sở dữ liệu:', err);
            res.status(500).json('Lỗi máy chủ nội bộ');
        } else if (result.length > 0) {
            const user = result[0];
            const avatarBase64 = user.avatarUrl ? Buffer.from(user.avatarUrl).toString('base64') : null;
            res.status(200).json({ 
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullname: user.fullname,
                    dob: user.dob,
                    gender: user.gender,
                    address: user.address,
                    avatarUrl: avatarBase64 ? `data:image/jpeg;base64,${avatarBase64}` : null,
                    total_posts: user.total_posts,
                    total_comments: user.total_comments,
                    total_likes: user.total_likes,
                    total_unlikes: user.total_unlikes
                }
            });
        } else {
            res.status(404).json('Không tìm thấy thông tin người dùng');
        }
    });
});

// API cập nhật thông tin người dùng
app.put('/api/update-user', authenticateJWT, (req, res) => {
    const { username, email, fullname, dob, gender, address, avatarUrl } = req.body;
    const userId = req.user.id;

    const query = `UPDATE users SET username = ?, email = ?, fullname = ?, dob = ?, gender = ?, address = ?, avatarUrl = ? WHERE id = ?`;
    db.query(query, [username, email, fullname, dob, gender, address, avatarUrl, userId], (err, result) => {
        if (err) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', err);
            return res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
        res.status(200).json({ message: 'Cập nhật thông tin thành công!', user: { username, email, fullname, dob, gender, address, avatarUrl } });
    });
});

// Endpoint để lấy danh sách bài viết của người dùng
app.get('/api/user-posts', authenticateJWT, (req, res) => {
    const userID = req.user.id;

    const query = `
        SELECT 
            p.postID, p.title, p.topic, p.purpose, p.datePosted, p.likeCount, p.unlikeCount,
            (SELECT COUNT(*) FROM comments c WHERE c.postID = p.postID) AS commentCount
        FROM posts p
        WHERE p.userID = ?
        ORDER BY p.datePosted DESC`;

    db.query(query, [userID], (err, results) => {
        if (err) {
            console.error('Lỗi kết nối tới cơ sở dữ liệu:', err);
            res.status(500).json('Lỗi máy chủ nội bộ');
        } else {
            res.status(200).json(results);
        }
    });
});

// Endpoint để xóa bài viết
app.delete('/api/posts/:postId', authenticateJWT, (req, res) => {
    const { postId } = req.params;
    const userID = req.user.id;

    const query = `
        DELETE FROM posts 
        WHERE postID = ? AND userID = ?`;

    db.query(query, [postId, userID], (err, result) => {
        if (err) {
            console.error('Lỗi kết nối tới cơ sở dữ liệu:', err);
            return res.status(500).json('Lỗi máy chủ nội bộ');
        }

        if (result.affectedRows === 0) {
            return res.status(404).json('Không tìm thấy bài viết của bạn');
        }
        res.status(200).json('Xoá bài viết thành công');
    });
});


// Sử dụng middleware cho các route cần bảo vệ
app.get('/api/protected-route', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'Bạn đã truy cập thành công vào route bảo vệ !', user: req.user });
});

// Endpoint API để thêm bài viết mới
app.post('/api/add-post', authenticateJWT, (req, res) => {
    console.log(req.body);
    const { title, content, topic, purpose} = req.body;
    const userId = req.user.id; // Lấy id của người dùng từ JWT

    const query = `INSERT INTO posts (userID, title, content, topic, purpose, datePosted) VALUES (?, ?, ?, ?, ?, NOW())`;
    db.query(query, [userId, title, content, topic, purpose], (err, result) => {
        if (err) {
            console.error('Lỗi khi thêm bài viết mới:', err);
            return res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        } else {
            // Lấy username và avatarUrl của người dùng
            const getUserInfoQuery = `SELECT username, avatarUrl FROM users WHERE id = ?`;
            db.query(getUserInfoQuery, [userId], (err, userResult) => {
                if (err) {
                    console.error('Lỗi lấy thông tin người dùng:', err);
                    return res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
                } else if (userResult.length === 0) {
                    return res.status(404).json({ message: 'Không tìm thấy người dùng' });
                } else {
                    const userInfo = userResult[0];
                    return res.status(200).json({ 
                        message: 'Bài viết đã được đăng thành công!', 
                        postId: result.insertId, 
                        username: userInfo.username, 
                        avatarUrl: userInfo.avatarUrl 
                    });
                }
            });
        }
    });
});

// Bài viết gần đây
app.get('/api/recent-posts', (req, res) => {
    // Lấy thời gian hiện tại của yêu cầu
    const requestTime = new Date();

    const query = `SELECT username, avatarUrl, title, topic, purpose, likeCount, datePosted 
                   FROM posts 
                   JOIN users ON posts.userID = users.id 
                   ORDER BY datePosted DESC 
                   LIMIT 10`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi truy vấn cơ sở dữ liệu:', err);
            return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
        }
        res.json({
            data: results,
            requestTime: requestTime // Gửi thời điểm yêu cầu
        });
    });
});

// API endpoint để tìm kiếm bài viết theo từ khoá
app.get('/search', (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return res.status(400).json({ message: 'Vui lòng cung cấp từ khóa tìm kiếm' });
    }

    const searchPattern = `%${keyword}%`;
    const query = `
        SELECT 
            p.postID, p.title, p.purpose, p.topic, p.likeCount, p.unlikeCount, p.datePosted,
            u.username, u.avatarUrl,
            (SELECT COUNT(*) FROM comments WHERE comments.postID = p.postID) AS total_comments,
            SUBSTRING_INDEX(SUBSTRING_INDEX(p.content, ?, -10), ?, 10) AS snippet_before,
            SUBSTRING_INDEX(SUBSTRING_INDEX(p.content, ?, 10), ?, -10) AS snippet_after
        FROM posts p
        JOIN users u ON p.userID = u.id
        WHERE p.title LIKE ? OR p.content LIKE ?
        LIMIT 20`;

    db.query(query, [keyword, ' ', keyword, ' ', searchPattern, searchPattern], (err, results) => {
        if (err) {
            console.error('Lỗi kết nối tới cơ sở dữ liệu:', err);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
