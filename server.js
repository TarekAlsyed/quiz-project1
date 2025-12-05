const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e8 // السماح بملفات كبيرة
});

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// إنشاء المجلدات
const dirs = ['./uploads/videos', './uploads/photos', './uploads/logs'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// إعداد رفع الصور (مازال عبر Multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/photos'),
    filename: (req, file, cb) => cb(null, `${req.body.studentId}_${Date.now()}.jpg`)
});
const upload = multer({ storage: storage });

// === 🔥 نظام البث المباشر (Socket.io) ===
let activeStreams = {}; // لتخزين ملفات الفيديو المفتوحة

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    let currentFileStream = null;
    let studentId = null;

    // 1. عند بدء الامتحان، نفتح ملف فيديو واحد للكتابة
    socket.on('start-stream', (id) => {
        studentId = id;
        const filePath = `./uploads/videos/${studentId}.webm`;
        console.log(`🔴 بدأ البث المباشر للطالب: ${studentId}`);
        
        // فتح ملف للكتابة المستمرة
        currentFileStream = fs.createWriteStream(filePath, { flags: 'a' });
        activeStreams[socket.id] = studentId;

        // إبلاغ لوحة التحكم بوجود طالب جديد
        io.emit('admin-update', { id: studentId, status: 'online' });
    });

    // 2. استقبال قطع الفيديو وإضافتها لنفس الملف
    socket.on('video-chunk', (data) => {
        if (currentFileStream) {
            currentFileStream.write(data);
        }
    });

    // 3. استقبال مخالفات فورية
    socket.on('violation-alert', (msg) => {
        console.log(`⚠️ إنذار فوري [${studentId}]: ${msg}`);
        // إرسال تنبيه فوري لصفحة الأدمن
        io.emit('admin-alert', { id: studentId, msg: msg });
    });

    // 4. عند قطع الاتصال أو انتهاء الامتحان
    socket.on('disconnect', () => {
        if (currentFileStream) {
            currentFileStream.end(); // إغلاق الملف وحفظه
            console.log(`✅ تم حفظ فيديو الطالب: ${studentId}`);
        }
        if (studentId) {
            io.emit('admin-update', { id: studentId, status: 'offline' });
        }
        delete activeStreams[socket.id];
    });
});

// === الروابط (Routes) ===

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// لوحة المراقبة الحية
app.get('/admin', (req, res) => {
    // قراءة الفيديوهات المحفوظة
    const videoDir = './uploads/videos';
    const videos = fs.existsSync(videoDir) ? fs.readdirSync(videoDir) : [];

    res.send(`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
        <title>غرفة العمليات المركزية 📹</title>
        <script src="/socket.io/socket.io.js"></script>
        <style>
            body { font-family: Tahoma, sans-serif; background: #1a1a1a; color: white; padding: 20px; }
            .live-box { border: 2px solid #00ff00; padding: 10px; margin: 10px; display: inline-block; width: 200px; text-align: center; border-radius: 10px; animation: pulse 2s infinite; }
            .offline-box { border: 1px solid #555; padding: 10px; margin: 10px; display: inline-block; width: 200px; text-align: center; color: #888; }
            @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(0, 255, 0, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); } }
            h1 { border-bottom: 3px solid #e50914; display: inline-block; padding-bottom: 10px; }
            .alert { background: red; color: white; padding: 5px; margin-top: 5px; border-radius: 4px; font-size: 0.8rem; }
        </style>
    </head>
    <body>
        <h1>📹 غرفة المراقبة الحية</h1>
        <h3>🔴 الطلاب المتصلين الآن (Live):</h3>
        <div id="activeStudents">Waiting for connections...</div>
        
        <hr style="border-color:#333">
        
        <h3>💾 أرشيف الفيديوهات الكاملة:</h3>
        <ul>
            ${videos.map(v => `<li><a href="/uploads/videos/${v}" target="_blank" style="color:#00a8ff">${v}</a></li>`).join('')}
        </ul>

        <script>
            const socket = io();
            const container = document.getElementById('activeStudents');
            let students = {};

            socket.on('admin-update', (data) => {
                if(data.status === 'online') {
                    students[data.id] = true;
                } else {
                    delete students[data.id];
                }
                render();
            });

            socket.on('admin-alert', (data) => {
                // إظهار تنبيه صوتي أو مرئي
                alert('⚠️ مخالفة للطالب: ' + data.id + '\\nالسبب: ' + data.msg);
            });

            function render() {
                container.innerHTML = Object.keys(students).map(id => 
                    '<div class="live-box">👤 ' + id + '<br><small>مباشر 🔴</small></div>'
                ).join('');
                if(Object.keys(students).length === 0) container.innerHTML = "لا يوجد طلاب متصلين حالياً";
            }
        </script>
    </body>
    </html>
    `);
});

// استقبال الصور (مازال عبر HTTP لأنه أسرع للصور الثابتة)
app.post('/api/upload-photo', upload.single('photo'), (req, res) => {
    console.log(`📸 صورة مخالفة: ${req.body.studentId}`);
    res.json({ status: 'uploaded' });
});

app.post('/api/finish', (req, res) => {
    console.log(`✅ انتهاء: ${req.body.studentId}`);
    res.json({ status: 'done' });
});

server.listen(PORT, () => {
    console.log(`🚀 Live Stream Server running on port ${PORT}`);
});
