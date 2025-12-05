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
// جعل مجلد التحميلات عاماً للوصول إليه
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// إنشاء المجلدات الضرورية
const dirs = ['./uploads/videos', './uploads/photos', './uploads/logs'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// إعداد تخزين الصور (للمخالفات)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/photos'),
    filename: (req, file, cb) => cb(null, `${req.body.studentId}_${Date.now()}.jpg`)
});
const upload = multer({ storage: storage });

// === 🎥 متغيرات البث ===
const fileStreams = {}; // لتخزين قنوات الكتابة المفتوحة لكل طالب

// === 🔗 الروابط ===

// 1. صفحة الامتحان
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. صفحة غرفة العمليات (يتم إنشاؤها ديناميكياً)
app.get('/ops', (req, res) => {
    res.send(opsRoomHTML);
});

// === 🔥 نظام Socket.io (قلب البث المباشر) ===
io.on('connection', (socket) => {
    
    // --> دخول المراقب لغرفة العمليات
    socket.on('join-ops', () => {
        socket.join('ops-room');
        console.log('👮‍♂️ دخل مراقب إلى غرفة العمليات');
    });

    // --> 1. بدء البث من الطالب
    socket.on('start-stream', (studentId) => {
        console.log(`🔴 بدأ البث: ${studentId}`);
        const filePath = `./uploads/videos/${studentId}.webm`;
        
        // فتح ملف للكتابة المستمرة (Append Mode)
        // هذا يسمح بملفات ضخمة (10 جيجا+) دون استهلاك الرام
        fileStreams[socket.id] = fs.createWriteStream(filePath, { flags: 'a' });
        
        // إبلاغ غرفة العمليات بطالب جديد
        io.to('ops-room').emit('new-student', { id: studentId, socketId: socket.id });
    });

    // --> 2. استقبال بيانات الفيديو (للحفظ)
    socket.on('video-chunk', (data) => {
        if (fileStreams[socket.id]) {
            // كتابة البيانات فوراً في القرص الصلب
            fileStreams[socket.id].write(data);
        }
    });

    // --> 3. استقبال "فريم" مباشر (للعرض في الغرفة فقط)
    socket.on('live-frame', (imgData) => {
        // إعادة توجيه الصورة فوراً للمراقبين
        io.to('ops-room').emit('update-frame', { socketId: socket.id, image: imgData });
    });

    // --> 4. استقبال مخالفة
    socket.on('violation-alert', (msg) => {
        io.to('ops-room').emit('violation-alert', { socketId: socket.id, msg: msg });
        // تسجيل في ملف نصي
        fs.appendFileSync('./uploads/logs/violations.txt', `[${new Date().toISOString()}] ${socket.id}: ${msg}\n`);
    });

    // --> 5. انقطاع الاتصال
    socket.on('disconnect', () => {
        if (fileStreams[socket.id]) {
            fileStreams[socket.id].end(); // إغلاق الملف وحفظه بأمان
            delete fileStreams[socket.id];
            console.log(`💾 تم حفظ فيديو الجلسة: ${socket.id}`);
        }
        io.to('ops-room').emit('student-left', { socketId: socket.id });
    });
});

// استقبال الصور الثابتة
app.post('/api/upload-photo', upload.single('photo'), (req, res) => {
    console.log(`📸 تم حفظ صورة مخالفة`);
    res.json({ status: 'uploaded' });
});

// إنهاء الامتحان
app.post('/api/finish', (req, res) => {
    console.log(`✅ انتهاء الطالب: ${req.body.studentId} - الدرجة: ${req.body.score}`);
    res.json({ status: 'done' });
});

// كود HTML لغرفة العمليات (مدمج هنا للسهولة)
const opsRoomHTML = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>غرفة العمليات المركزية ☢️</title>
    <script src="/socket.io/socket.io.js"></script>
    <style>
        body { background-color: #0d1117; color: #58a6ff; font-family: 'Segoe UI', monospace; margin: 0; padding: 20px; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #30363d; padding-bottom: 15px; margin-bottom: 20px; }
        h1 { margin: 0; text-shadow: 0 0 10px rgba(88, 166, 255, 0.5); }
        .live-badge { background: #da3633; color: white; padding: 5px 15px; border-radius: 50px; font-weight: bold; animation: pulse 1.5s infinite; }
        
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        
        .student-card { background: #161b22; border: 1px solid #30363d; border-radius: 8px; overflow: hidden; position: relative; transition: 0.3s; }
        .student-card.alert { border-color: #da3633; box-shadow: 0 0 15px rgba(218, 54, 51, 0.5); }
        
        .card-head { background: #21262d; padding: 8px 12px; display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: bold; }
        .feed-container { width: 100%; height: 225px; background: #000; display: flex; align-items: center; justify-content: center; }
        .feed-container img { width: 100%; height: 100%; object-fit: cover; }
        
        .status-bar { padding: 5px; text-align: center; font-size: 0.8rem; background: rgba(0,0,0,0.8); position: absolute; bottom: 0; width: 100%; }
        
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>غرفة العمليات والمراقبة</h1>
        <div class="live-badge">بث مباشر 📡</div>
    </div>
    <div id="grid" class="grid"></div>

    <script>
        const socket = io();
        socket.emit('join-ops');

        // استقبال طالب جديد
        socket.on('new-student', (data) => {
            if(document.getElementById(data.socketId)) return;
            
            const div = document.createElement('div');
            div.id = data.socketId;
            div.className = 'student-card';
            div.innerHTML = \`
                <div class="card-head">
                    <span>👤 \${data.id}</span>
                    <span style="color:#2ea043">● متصل</span>
                </div>
                <div class="feed-container">
                    <img id="img-\${data.socketId}" src="" alt="جاري التحميل...">
                </div>
                <div class="status-bar" id="status-\${data.socketId}">الوضع مستقر</div>
            \`;
            document.getElementById('grid').appendChild(div);
        });

        // تحديث الصورة (الفريم)
        socket.on('update-frame', (data) => {
            const img = document.getElementById('img-' + data.socketId);
            if(img) img.src = data.image;
        });

        // تنبيه مخالفة
        socket.on('violation-alert', (data) => {
            const card = document.getElementById(data.socketId);
            const status = document.getElementById('status-' + data.socketId);
            if(card) {
                card.classList.add('alert');
                status.innerText = '⚠️ ' + data.msg;
                status.style.color = '#ff7b72';
                
                setTimeout(() => {
                    card.classList.remove('alert');
                    status.innerText = 'الوضع مستقر';
                    status.style.color = '#58a6ff';
                }, 5000);
            }
        });

        // خروج طالب
        socket.on('student-left', (data) => {
            const card = document.getElementById(data.socketId);
            if(card) {
                card.style.opacity = '0.5';
                card.querySelector('.card-head span:last-child').innerText = '🔴 غير متصل';
                card.querySelector('.card-head span:last-child').style.color = '#da3633';
            }
        });
    </script>
</body>
</html>
`;

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
