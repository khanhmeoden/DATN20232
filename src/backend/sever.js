const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken'); 
const cors = require('cors');
const app = express();
const port = 8080; 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datn'
});
db.connect();

app.use(cors());app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); 

app.post('/api/users', (req, res) => {
    const formData = req.body;

    const query = `INSERT INTO users (username, fullname, email, password, gender, dob, address, avatarUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [formData.username, formData.fullname, formData.email, formData.password, formData.gender, formData.dob, formData.address, formData.avatarUrl], (err, result) => {
        if (err) {
            console.error('Lỗi kết nối tới database:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Người dùng mới:', result.insertId);
            res.status(200).send('Tạo mới người dùng thành công !');
        }
    });
});

app.post('/api/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;

    // Kiểm tra xem usernameOrEmail có phải là username hay email
    const query = `SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?`;
    db.query(query, [usernameOrEmail, usernameOrEmail, password], (err, result) => {
        if (err) {
            console.error('Lỗi kết nối tới cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi máy chủ nội bộ');
        } else if (result.length > 0) {
                console.log('Người dùng đăng nhập thành công :', usernameOrEmail);
                res.status(200).send('Đăng nhập thành công !');
            } else {
                console.log('Sai tên đăng nhập hoặc mật khẩu');
                res.status(401).send('Sai tên đăng nhập hoặc mật khẩu');
            }
    });
});



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});