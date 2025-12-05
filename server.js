const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
// استخدام البورت الخاص بـ Railway أو 3000 للتجربة المحلية
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// إعداد المجلدات (في Railway الملفات تحذف عند إعادة التشغيل، لكن هذا ضروري للعمل)
const dirs = ['./uploads/videos', './uploads/photos', './uploads/logs'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// إعداد التخزين
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'video') cb(null, './uploads/videos');
        else if (file.fieldname === 'photo') cb(null, './uploads/photos');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.studentId}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

// --- الروابط (APIs) ---

// 1. عرض صفحة الامتحان
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. تسجيل المخالفات النصية
app.post('/api/violation', (req, res) => {
    const { studentId, violation } = req.body;
    console.log(`⚠️ مخالفة [${studentId}]: ${violation}`);
    // يمكن هنا إضافة كود لحفظ المخالفة في قاعدة بيانات
    res.json({ status: 'recorded' });
});

// 3. رفع الصور (دليل الغش)
app.post('/api/upload-photo', upload.single('photo'), (req, res) => {
    console.log(`📸 تم حفظ صورة مخالفة للطالب: ${req.body.studentId}`);
    res.json({ status: 'uploaded' });
});

// 4. رفع الفيديو
app.post('/api/upload-video', upload.single('video'), (req, res) => {
    console.log(`📹 تم استلام فيديو للطالب: ${req.body.studentId}`);
    res.json({ status: 'uploaded' });
});

// 5. إنهاء الامتحان
app.post('/api/finish', (req, res) => {
    const { studentId, score } = req.body;
    console.log(`✅ انتهى الطالب ${studentId} بنتيجة ${score}`);
    res.json({ status: 'done' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
