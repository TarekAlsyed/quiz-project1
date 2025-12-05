const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// تفعيل استقبال البيانات
app.use(cors());
app.use(express.json());

// إنشاء المجلدات تلقائياً إذا لم تكن موجودة
const dirs = ['./uploads/videos', './uploads/photos', './uploads/logs'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// إعداد مكان حفظ الملفات
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'video') cb(null, './uploads/videos');
        else if (file.fieldname === 'photo') cb(null, './uploads/photos');
    },
    filename: (req, file, cb) => {
        // تسمية الملف: اسم الطالب_التوقيت.نوع الملف
        cb(null, `${req.body.studentId}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// --- الروابط (APIs) ---

// 1. استقبال تسجيل المخالفات
app.post('/api/violation', (req, res) => {
    const { studentId, violation } = req.body;
    const logFile = `./uploads/logs/${studentId}.txt`;
    
    const logEntry = `[${new Date().toISOString()}] مخالفة: ${violation}\n`;
    
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.error(err);
    });
    
    console.log(`⚠️ مخالفة للطالب ${studentId}: ${violation}`);
    res.json({ status: 'ok' });
});

// 2. استقبال صور محاولات الغش
app.post('/api/upload-photo', upload.single('photo'), (req, res) => {
    console.log(`📸 تم حفظ صورة مخالفة للطالب: ${req.body.studentId}`);
    res.json({ status: 'ok' });
});

// 3. استقبال فيديو الامتحان
app.post('/api/upload-video', upload.single('video'), (req, res) => {
    console.log(`📹 تم حفظ مقطع فيديو للطالب: ${req.body.studentId}`);
    res.json({ status: 'ok' });
});

// 4. تقرير النهاية
app.post('/api/finish', (req, res) => {
    console.log(`✅ أنهى الطالب ${req.body.studentId} الامتحان بدرجة ${req.body.score}`);
    res.json({ status: 'ok' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`
    🚀 السيرفر يعمل بنجاح!
    -----------------------------------
    🌐 رابط الامتحان: http://localhost:3000
    📂 ملفات الفيديو ستجدها في: uploads/videos
    -----------------------------------
    `);
});

// تقديم ملف الامتحان عند الدخول للموقع
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
