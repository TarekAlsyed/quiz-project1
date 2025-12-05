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
// جعل مجلد التحميلات عاماً
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// إنشاء المجلدات
const dirs = ['./uploads/videos', './uploads/photos', './uploads/logs'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// إعداد تخزين الصور
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/photos'),
    filename: (req, file, cb) => cb(null, `${req.body.studentId}_${Date.now()}.jpg`)
});
const upload = multer({ storage: storage });

// === 🚫 نظام الحظر (Ban System) ===
const bannedDevices = new Set(); // قائمة الأجهزة المحظورة نهائياً
const bannedIPs = new Set(); // قائمة الـ IPs المحظورة

// تحميل قائمة الحظر من ملف دائم
function loadBanList() {
    try {
        if(fs.existsSync('./uploads/logs/banned.json')) {
            const data = JSON.parse(fs.readFileSync('./uploads/logs/banned.json', 'utf8'));
            data.devices.forEach(d => bannedDevices.add(d));
            data.ips.forEach(ip => bannedIPs.add(ip));
            console.log(`🚫 تم تحميل ${bannedDevices.size} جهاز محظور و ${bannedIPs.size} عنوان IP`);
        }
    } catch(e) {
        console.error('خطأ في تحميل قائمة الحظر:', e);
    }
}

// حفظ قائمة الحظر
function saveBanList() {
    const data = {
        devices: Array.from(bannedDevices),
        ips: Array.from(bannedIPs),
        lastUpdate: new Date().toISOString()
    };
    fs.writeFileSync('./uploads/logs/banned.json', JSON.stringify(data, null, 2));
}

// تحميل القائمة عند بدء السيرفر
loadBanList();

// === 🎥 متغيرات النظام ===
const fileStreams = {}; // لتخزين ملفات الفيديو المفتوحة
const activeStudents = {}; // 🔥 قائمة الطلاب المتصلين حالياً
const activeExams = new Set(); // لمنع دخول نفس الطالب من جهازين

// === 🔗 الروابط ===
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/ops', (req, res) => {
    res.send(opsRoomHTML);
});

// === 🔥 نظام Socket.io ===
io.on('connection', (socket) => {
    
    // --> 1. دخول المراقب
    socket.on('join-ops', () => {
        socket.join('ops-room');
        console.log('👮‍♂️ دخل مراقب إلى غرفة العمليات');
        const currentIds = Object.keys(activeStudents);
        if(currentIds.length > 0) {
            currentIds.forEach(socketId => {
                socket.emit('new-student', { 
                    id: activeStudents[socketId].name, 
                    socketId: socketId 
                });
            });
        }
    });

    // --> 2. بدء البث من الطالب (مع التحقق من الحظر)
    socket.on('start-stream', (data) => {
        const studentId = data.studentId;
        const deviceId = data.deviceId;
        const userIP = socket.handshake.address;

        // ✅ التحقق من الحظر
        if(bannedDevices.has(deviceId)) {
            console.log(`🚫 محاولة دخول من جهاز محظور: ${deviceId}`);
            socket.emit('device-banned', {
                reason: 'هذا الجهاز محظور نهائياً بسبب مخالفات سابقة',
                bannedAt: 'دائم'
            });
            socket.disconnect(true);
            return;
        }

        if(bannedIPs.has(userIP)) {
            console.log(`🚫 محاولة دخول من IP محظور: ${userIP}`);
            socket.emit('device-banned', {
                reason: 'هذا الاتصال محظور نهائياً',
                bannedAt: 'دائم'
            });
            socket.disconnect(true);
            return;
        }

        // ✅ منع الدخول المزدوج
        if(activeExams.has(studentId)) {
            socket.emit('duplicate-session', 'هذا الحساب مفتوح في جهاز آخر!');
            socket.disconnect();
            return;
        }

        console.log(`🔴 بدأ البث: ${studentId} | جهاز: ${deviceId}`);
        activeExams.add(studentId);

        // تسجيل الطالب
        activeStudents[socket.id] = { 
            name: studentId, 
            socketId: socket.id,
            deviceId: deviceId,
            ip: userIP,
            startTime: new Date()
        };

        const filePath = `./uploads/videos/${studentId}.webm`;
        fileStreams[socket.id] = fs.createWriteStream(filePath, { flags: 'a' });
        
        io.to('ops-room').emit('new-student', { id: studentId, socketId: socket.id });
    });

    // --> 3. استقبال الفيديو
    socket.on('video-chunk', (data) => {
        if (fileStreams[socket.id]) fileStreams[socket.id].write(data);
    });

    // --> 4. استقبال فريم مباشر
    socket.on('live-frame', (imgData) => {
        io.to('ops-room').emit('update-frame', { socketId: socket.id, image: imgData });
    });

    // --> 5. استقبال مخالفة (مع نظام الحظر الفوري)
    socket.on('violation-alert', (violationData) => {
        const student = activeStudents[socket.id];
        if(!student) return;

        console.log(`⚠️ مخالفة خطيرة من ${student.name}: ${violationData.reason}`);
        
        // 🔥 حظر الجهاز والـ IP فوراً
        bannedDevices.add(student.deviceId);
        bannedIPs.add(student.ip);
        saveBanList();

        // تسجيل في ملف Log
        const logEntry = {
            studentId: student.name,
            deviceId: student.deviceId,
            ip: student.ip,
            violation: violationData.reason,
            timestamp: new Date().toISOString(),
            severity: 'CRITICAL'
        };
        const logFile = './uploads/logs/violations.log';
        fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');

        // 🚨 إرسال أمر إنهاء الامتحان للطالب
        socket.emit('exam-terminated', {
            reason: violationData.reason,
            banned: true,
            message: '⛔ تم إلغاء امتحانك وحظر جهازك نهائياً!'
        });

        // إبلاغ المراقب
        io.to('ops-room').emit('critical-violation', {
            socketId: socket.id,
            studentName: student.name,
            deviceId: student.deviceId,
            reason: violationData.reason
        });

        // قطع الاتصال بعد 3 ثواني
        setTimeout(() => {
            if(fileStreams[socket.id]) {
                fileStreams[socket.id].end();
                delete fileStreams[socket.id];
            }
            socket.disconnect(true);
            activeExams.delete(student.name);
            delete activeStudents[socket.id];
        }, 3000);
    });

    // --> 6. انقطاع الاتصال
    socket.on('disconnect', () => {
        const student = activeStudents[socket.id];
        if(student) {
            activeExams.delete(student.name);
            delete activeStudents[socket.id];
        }
        if (fileStreams[socket.id]) {
            fileStreams[socket.id].end(); 
            delete fileStreams[socket.id];
        }
        io.to('ops-room').emit('student-left', { socketId: socket.id });
    });
});

app.post('/api/upload-photo', upload.single('photo'), (req, res) => {
    res.json({ status: 'uploaded' });
});

app.post('/api/finish', (req, res) => {
    console.log(`✅ انتهاء الطالب: ${req.body.studentId}`);
    res.json({ status: 'done' });
});

// كود HTML لغرفة العمليات
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
                    <img id="img-\${data.socketId}" src="" alt="جاري استقبال البث...">
                </div>
                <div class="status-bar" id="status-\${data.socketId}">الوضع مستقر</div>
            \`;
            document.getElementById('grid').appendChild(div);
        });

        socket.on('update-frame', (data) => {
            const img = document.getElementById('img-' + data.socketId);
            if(img) img.src = data.image;
        });

        // استقبال مخالفة خطيرة
        socket.on('critical-violation', (data) => {
            const card = document.getElementById(data.socketId);
            if(card) {
                card.style.borderColor = '#dc2626';
                card.style.background = '#7f1d1d';
                card.innerHTML = \`
                    <div class="card-head" style="background:#991b1b;">
                        <span>👤 \${data.studentName}</span>
                        <span style="color:#fca5a5">🚫 محظور</span>
                    </div>
                    <div class="feed-container" style="background:#450a0a; justify-content:center; align-items:center; flex-direction:column; color:#fca5a5;">
                        <div style="font-size:3rem;">⛔</div>
                        <div style="margin-top:10px; font-weight:bold;">تم الحظر الدائم</div>
                    </div>
                    <div class="status-bar" style="background:#7f1d1d; color:#fca5a5;">
                        🚨 \${data.reason}
                    </div>
                \`;
                // تشغيل صوت تنبيه
                const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
                audio.play().catch(()=>{});
            }
        });

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
