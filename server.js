const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
// استخدام البورت الخاص بـ Railway أو 3000
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// هام جداً: جعل مجلد التخزين عاماً لنستطيع فتح الفيديوهات من المتصفح
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// إنشاء المجلدات تلقائياً عند التشغيل
const dirs = ['./uploads/videos', './uploads/photos', './uploads/logs'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// إعداد مكان حفظ الملفات وتسميتها
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'video') cb(null, './uploads/videos');
        else if (file.fieldname === 'photo') cb(null, './uploads/photos');
    },
    filename: (req, file, cb) => {
        // الاسم: اسم الطالب_التاريخ_نوع الملف
        cb(null, `${req.body.studentId}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

// ==========================================
// 🔗 الروابط (Routes)
// ==========================================

// 1. الصفحة الرئيسية (الامتحان)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. 🔥 صفحة الأدمن (لعرض التسجيلات)
app.get('/admin', (req, res) => {
    const videoDir = './uploads/videos';
    const photoDir = './uploads/photos';

    // جلب قائمة الملفات
    const videos = fs.existsSync(videoDir) ? fs.readdirSync(videoDir) : [];
    const photos = fs.existsSync(photoDir) ? fs.readdirSync(photoDir) : [];

    // تصميم بسيط للوحة التحكم
    let html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
        <meta charset="UTF-8">
        <title>لوحة المراقب 👮‍♂️ - quiz-project1</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background: #f0f2f5; color: #333; }
            h1 { color: #1f2937; border-bottom: 3px solid #10b981; padding-bottom: 10px; display: inline-block; }
            .container { display: flex; gap: 20px; flex-wrap: wrap; }
            .card { background: white; padding: 20px; border-radius: 12px; flex: 1; min-width: 300px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h2 { margin-top: 0; color: #4b5563; }
            ul { list-style: none; padding: 0; max-height: 400px; overflow-y: auto; }
            li { margin-bottom: 8px; border-bottom: 1px solid #eee; padding: 8px; display: flex; justify-content: space-between; align-items: center; }
            li:last-child { border-bottom: none; }
            a { text-decoration: none; color: #2563eb; font-weight: bold; }
            a:hover { text-decoration: underline; }
            .badge { background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; }
            .empty { color: #9ca3af; font-style: italic; text-align: center; margin-top: 20px; }
        </style>
    </head>
    <body>
        <h1>👮‍♂️ غرفة التحكم والمراقبة</h1>
        <p>ملاحظة: الملفات هنا مؤقتة على سيرفر Railway المجاني.</p>
        
        <div class="container">
            <div class="card">
                <h2>📹 تسجيلات الفيديو (${videos.length})</h2>
                <ul>
                    ${videos.map(f => `
                        <li>
                            <a href="/uploads/videos/${f}" target="_blank">📄 ${f}</a>
                            <span class="badge">فيديو</span>
                        </li>
                    `).join('')}
                    ${videos.length === 0 ? '<div class="empty">لا توجد تسجيلات حتى الآن</div>' : ''}
                </ul>
            </div>

            <div class="card">
                <h2>📸 صور المخالفات (${photos.length})</h2>
                <ul>
                    ${photos.map(f => `
                        <li>
                            <a href="/uploads/photos/${f}" target="_blank">🖼️ ${f}</a>
                            <span class="badge">صورة</span>
                        </li>
                    `).join('')}
                    ${photos.length === 0 ? '<div class="empty">سجل المخالفات نظيف</div>' : ''}
                </ul>
            </div>
        </div>
        
        <script>
            // تحديث الصفحة تلقائياً كل 30 ثانية
            setTimeout(() => location.reload(), 30000);
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

// 3. استقبال المخالفات النصية
app.post('/api/violation', (req, res) => {
    const { studentId, violation } = req.body;
    console.log(`⚠️ مخالفة [${studentId}]: ${violation}`);
    res.json({ status: 'recorded' });
});

// 4. استقبال الصور
app.post('/api/upload-photo', upload.single('photo'), (req, res) => {
    console.log(`📸 تم حفظ صورة مخالفة للطالب: ${req.body.studentId}`);
    res.json({ status: 'uploaded' });
});

// 5. استقبال الفيديو
app.post('/api/upload-video', upload.single('video'), (req, res) => {
    console.log(`📹 استلام فيديو (Chunk) من الطالب: ${req.body.studentId}`);
    res.json({ status: 'uploaded' });
});

// 6. إنهاء الامتحان
app.post('/api/finish', (req, res) => {
    console.log(`✅ تم تسليم الامتحان: ${req.body.studentId} - الدرجة: ${req.body.score}`);
    res.json({ status: 'done' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
