const QUIZ_TITLE = "تطبيقات نظم المعلومات الجغرافية فى الشبكات";
const questions = [
    {type: 'tf', question: "المسارات (Paths) هي أشكال من البنية الشبكية لا يمكن العودة فيها لنقطة البداية.", answer: true, difficulty: 'easy', topic: 'البنية الأساسية للشبكات'},
    {type: 'tf', question: "الدارات (Circuits) هي نفسها الشجرات (Trees) لكنها أكبر حجماً.", answer: false, difficulty: 'easy', topic: 'البنية الأساسية للشبكات'},
    {type: 'tf', question: "تُقاس كثافة الشبكة بالنسبة للمساحة بوحدة 'كم/كم مربع'.", answer: true, difficulty: 'easy', topic: 'مؤشرات الكثافة'},
    {type: 'tf', question: "تُقاس كثافة حركة المرور بالنسبة للسكان بقسمة 'عدد السكان' على 'عدد السيارات'.", answer: false, difficulty: 'medium', topic: 'مؤشرات الكثافة'},
    {type: 'tf', question: "مؤشر الانعطاف الذي يساوي 100% يعني أن الطريق به انحرافات كثيرة.", answer: false, difficulty: 'easy', topic: 'مؤشر الانعطاف'},
    {type: 'tf', question: "كلما زادت قيمة مؤشر الانعطاف عن 100%، دل ذلك على كفاءة أعلى للطريق.", answer: false, difficulty: 'medium', topic: 'مؤشر الانعطاف'},
    {type: 'tf', question: "وجود عوائق طبيعية مثل الجبال قد يسبب 'انحرافًا إيجابيًا' في الطريق.", answer: true, difficulty: 'medium', topic: 'مؤشر الانعطاف'},
    {type: 'tf', question: "مؤشر بيتا (Beta) يُحسب بقسمة 'عدد العقد' على 'عدد الوصلات'.", answer: false, difficulty: 'easy', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'tf', question: "إذا كانت قيمة مؤشر بيتا (Beta) أقل من 1، فهذا يعني أن الشبكة شجرية (tree-like).", answer: true, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'tf', question: "مؤشر جاما (Gamma) يقارن بين عدد الوصلات الفعلي والعدد الأقصى الممكن للوصلات.", answer: true, difficulty: 'easy', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'tf', question: "القيمة العظمى لمؤشر جاما (Gamma) هي 1.5.", answer: false, difficulty: 'easy', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'tf', question: "الشبكة المعدومة (Null Graph) هي التي تكون فيها قيمة مؤشر بيتا 1.", answer: false, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'tf', question: "في مصفوفة إمكانية الوصول، العقدة ذات 'أعلى' مجموع هي الأكثر قربًا ومركزية.", answer: false, difficulty: 'medium', topic: 'مصفوفة إمكانية الوصول'},
    {type: 'tf', question: "مؤشر شيمبل (Shimbel Index) هو أحد مؤشرات قياس إمكانية الوصول.", answer: true, difficulty: 'easy', topic: 'مصفوفة إمكانية الوصول'},
    {type: 'tf', question: "'نظرية التفاعل' (نموذج الجاذبية) تفترض أن التفاعل يزداد مع زيادة المسافة.", answer: false, difficulty: 'easy', topic: 'نموذج الجاذبية (التفاعل)'},
    {type: 'tf', question: "وفقًا لنموذج الجاذبية، قوة التفاعل بين مدينتين تتناسب طرديًا مع حاصل ضرب سكانهما.", answer: true, difficulty: 'easy', topic: 'نموذج الجاذبية (التفاعل)'},
    {type: 'tf', question: "الوصلات (Arcs) في تحليل الشبكات الطوبولوجي تمثل المحطات (Stations).", answer: false, difficulty: 'easy', topic: 'البنية الأساسية للشبكات'},
    {type: 'tf', question: "كثافة الشبكة تعكس مدى تطور الاقتصاد للدولة.", answer: true, difficulty: 'medium', topic: 'مؤشرات الكثافة'},
    {type: 'tf', question: "قانون مؤشر الانعطاف هو (الطول بخط مستقيم / الطول الفعلي) × 100.", answer: false, difficulty: 'easy', topic: 'مؤشر الانعطاف'},
    {type: 'tf', question: "نظرية الشبكات (Graph Theory) هي الأساس البياني لتحليل الشبكات.", answer: true, difficulty: 'easy', topic: 'البنية الأساسية للشبكات'},
    {type: 'tf', question: "إذا كانت قيمة مؤشر بيتا = 1.5، فهذا يعني أن الشبكة ذات ترابط عالٍ.", answer: true, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'tf', question: "كلما اقترب مؤشر جاما من 1 (أو 100%)، دل ذلك على أن الشبكة 'كاملة'.", answer: true, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'tf', question: "الانحراف السلبي (Negative deviation) هو المنطقة المسؤولة عن الانحراف عن الخط المستقيم.", answer: true, difficulty: 'medium', topic: 'مؤشر الانعطاف'},
    {type: 'tf', question: "العالم إدوارد أولمان (Edward Ullman) هو من وضع نموذج الجاذبية.", answer: false, difficulty: 'hard', topic: 'نموذج الجاذبية (التفاعل)'},
    {type: 'tf', question: "الشجرات (Trees) هي شبكات تسمح بالعودة إلى نقطة البداية بسهولة.", answer: false, difficulty: 'easy', topic: 'البنية الأساسية للشبكات'},
    {type: 'mc', question: "شبكة تحل مشكلة المسارات والشجرات وتسمح بالرجوع لنقطة البداية، تسمى:", options: ["دارة (Circuit)", "مسار (Path)", "شجرة (Tree)", "عقدة (Node)"], answer: 0, difficulty: 'easy', topic: 'البنية الأساسية للشبكات'},
    {type: 'mc', question: "ما هو المؤشر الذي يُحسب بقسمة 'عدد الوصلات' (e) على 'عدد العقد' (v)؟", options: ["مؤشر جاما (Gamma)", "مؤشر بيتا (Beta)", "مؤشر الانعطاف", "مؤشر شيمبل"], answer: 1, difficulty: 'easy', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'mc', question: "شبكة بها 6 عقد و 9 وصلات، كم تبلغ قيمة مؤشر بيتا (Beta)؟", options: ["0.66", "1.0", "1.5", "0.75"], answer: 2, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'mc', question: "ما هو قانون حساب مؤشر جاما (Gamma)؟", options: ["e / v", "v / e", "e / 3(v-2)", "الطول الفعلي / الطول المستقيم"], answer: 2, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'mc', question: "شبكة بها 6 عقد و 9 وصلات، كم تبلغ قيمة مؤشر جاما (Gamma)؟", options: ["0.50", "1.0", "1.5", "0.75"], answer: 3, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'mc', question: "إذا كانت قيمة مؤشر بيتا (Beta) أقل من 1، فهذا يدل على أن الشبكة:", options: ["كاملة الترابط", "مترابطة جيدًا", "شجرية أو بسيطة جدًا", "معدومة"], answer: 2, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'mc', question: "ما هو قانون حساب 'مؤشر الانعطاف' (Detour Index)؟", options: ["(الطول بخط مستقيم / الطول الفعلي) × 100", "(الطول الفعلي / الطول بخط مستقيم) × 100", "(الطول الفعلي - الطول المستقيم)", "e / v"], answer: 1, difficulty: 'easy', topic: 'مؤشر الانعطاف'},
    {type: 'mc', question: "إذا كان الطول الفعلي 224 كم والطول المستقيم 182 كم، فكم يبلغ مؤشر الانعطاف؟", options: ["100%", "81%", "123%", "42%"], answer: 2, difficulty: 'medium', topic: 'مؤشر الانعطاف'},
    {type: 'mc', question: "قيمة مؤشر انعطاف تبلغ 100% تدل على أن الطريق:", options: ["كفء ومستقيم", "به انحرافات كثيرة", "غير موجود", "دائري"], answer: 0, difficulty: 'easy', topic: 'مؤشر الانعطاف'},
    {type: 'mc', question: "'عدد السيارات المستخدمة للشبكة في 24 ساعة / إجمالي أطوال الطرق' هو قانون:", options: ["كثافة الشبكة للمساحة", "كثافة المرور للسكان", "كثافة المرور لأطوال الطرق", "مؤشر بيتا"], answer: 2, difficulty: 'medium', topic: 'مؤشرات الكثافة'},
    {type: 'mc', question: "'إجمالي أطوال الشبكة (بالكم) / مساحة الدولة (بالكم^2)' هو قانون:", options: ["كثافة الشبكة بالنسبة للمساحة", "كثافة الشبكة بالنسبة للسكان", "كثافة المرور للمساحة", "مؤشر جاما"], answer: 0, difficulty: 'easy', topic: 'مؤشرات الكثافة'},
    {type: 'mc', question: "'نموذج الجاذبية' (Gravity Model) يفترض أن قوة التفاعل بين مدينتين تتناسب عكسيًا مع:", options: ["حاصل ضرب سكانهما", "مربع المسافة بينهما", "عدد الوصلات بينهما", "كثافة الشبكة"], answer: 1, difficulty: 'easy', topic: 'نموذج الجاذبية (التفاعل)'},
    {type: 'mc', question: "وفقًا لنموذج الجاذبية (ت = ح1*ح2 / ف^2)، ما هو التفاعل بين مدينة (أ) سكانها 100,000 و (ب) سكانها 100,000 والمسافة 100 كم؟", options: ["1,000,000", "10,000", "100", "2,000"], answer: 0, difficulty: 'medium', topic: 'نموذج الجاذبية (التفاعل)'},
    {type: 'mc', question: "إذا زادت المسافة بين مدينتين وثبت عدد السكان، فإن التفاعل بينهما:", options: ["يقل", "يزداد", "يبقى ثابتًا", "ينعدم"], answer: 0, difficulty: 'easy', topic: 'نموذج الجاذبية (التفاعل)'},
    {type: 'mc', question: "في 'مصفوفة إمكانية الوصول'، كيف نحدد العقدة الأكثر مركزية والأسهل في الوصول؟", options: ["العقدة ذات أعلى مجموع", "العقدة ذات أقل مجموع", "العقدة ذات الرقم (1)", "العقدة الأخيرة في الجدول"], answer: 1, difficulty: 'medium', topic: 'مصفوفة إمكانية الوصول'},
    {type: 'mc', question: "ما هو المعيار الذي يعكس مدى كفاية الشبكة ويعتبر مؤشرًا لتطور الاقتصاد؟", options: ["مؤشر الانعطاف", "كثافة الشبكة", "نموذج الجاذبية", "مصفوفة الوصول"], answer: 1, difficulty: 'medium', topic: 'مؤشرات الكثافة'},
    {type: 'mc', question: "تمثل (Stations) في تحليل الشبكات الطوبولوجي:", options: ["الوصلات (Arcs)", "المسارات (Paths)", "العقد (Nodes)", "الدارات (Circuits)"], answer: 2, difficulty: 'easy', topic: 'البنية الأساسية للشبكات'},
    {type: 'mc', question: "الشبكة التي تكون فيها كل عقدة مرتبطة بجميع العقد الأخرى في الشبكة تسمى:", options: ["شبكة شجرية (Tree)", "شبكة معدومة (Null)", "شبكة كاملة (Complete)", "شبكة مسار (Path)"], answer: 2, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'mc', question: "ما هي قيمة مؤشر جاما (Gamma) للشبكة الكاملة (Complete Graph)؟", options: ["0", "0.5", "1 (أو 100%)", "1.5"], answer: 2, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'mc', question: "'عدد السيارات المستخدمة للشبكة في 24 ساعة / إجمالي عدد السكان' هو قانون:", options: ["كثافة المرور بالنسبة للسكان", "كثافة الشبكة بالنسبة للسكان", "كثافة المرور للمساحة", "مؤشر الانعطاف"], answer: 0, difficulty: 'easy', topic: 'مؤشرات الكثافة'},
    {type: 'mc', question: "ما هو السبب الرئيسي لوجود انعطاف في خط حديد القاهرة-الإسكندرية حسب الملخص؟", options: ["لتجنب الصحراء", "لربط أكبر كم من المدن والعمران", "لتجنب الجبال", "خطأ في التخطيط"], answer: 1, difficulty: 'medium', topic: 'مؤشر الانعطاف'},
    {type: 'mc', question: "من هو العالم الذي ناقش فكرة التفاعل بين الأقاليم وثلاثية (التكامل، الفرصة البديلة، إمكانية الوصول)؟", options: ["كانسكي (Kansky)", "نيوتن (Newton)", "إدوارد أولمان (Edward Ullman)", "شيمبل (Shimbel)"], answer: 2, difficulty: 'hard', topic: 'نموذج الجاذبية (التفاعل)'},
    {type: 'mc', question: "شبكة بها 6 عقد و 7 وصلات (الحالة ب في الجدول)، كم تبلغ قيمة مؤشر بيتا (Beta)؟", options: ["1", "1.16", "0.85", "7"], answer: 1, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'mc', question: "شبكة بها 6 عقد و 7 وصلات (الحالة ب)، كم تبلغ قيمة مؤشر جاما (Gamma)؟", options: ["0.58", "1.16", "0.5", "1"], answer: 0, difficulty: 'medium', topic: 'مؤشرات الترابط (بيتا وجاما)'},
    {type: 'mc', question: "الأساس النظري البياني لتحليل الشبكات الطوبولوجية هو:", options: ["نظرية الجاذبية", "نظرية التفاعل", "نظرية الشبكات (Graph Theory)", "نظرية الكثافة"], answer: 2, difficulty: 'easy', topic: 'البنية الأساسية للشبكات'}
];
const questionText = document.getElementById('question-text');
const questionCounter = document.getElementById('question-counter');
const progressBar = document.getElementById('progress-bar');
const feedback = document.getElementById('feedback');
const tfOptionsContainer = document.getElementById('tf-options-container');
const mcOptionsContainer = document.getElementById('mc-options-container');
const tfOptionButtons = tfOptionsContainer.querySelectorAll('.option-btn');
const mcOptionButtons = mcOptionsContainer.querySelectorAll('.option-btn');
const allOptionButtons = document.querySelectorAll('.option-btn');
const quizBody = document.getElementById('quiz-body');
const quizFooter = document.getElementById('quiz-footer');
const resultsContainer = document.getElementById('results-container');
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let questionsShuffled = [];
let incorrectAnswers = [];
document.addEventListener('DOMContentLoaded', startQuiz);
function startQuiz() {
    document.getElementById('quiz-title').innerText = QUIZ_TITLE;
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswers = [];
    questionsShuffled = questions.sort(() => Math.random() - 0.5);
    quizBody.style.display = 'block';
    quizFooter.style.display = 'block';
    resultsContainer.style.display = 'none';
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        const newNextBtn = nextBtn.cloneNode(true);
        newNextBtn.innerText = 'السؤال التالي ←';
        newNextBtn.disabled = true;
        quizFooter.replaceChild(newNextBtn, nextBtn);
        newNextBtn.addEventListener('click', handleNextButtonClick);
    }
    loadQuestion();
}
function handleNextButtonClick() {
    if (currentQuestionIndex < questionsShuffled.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}
function loadQuestion() {
    resetState(); 
    if (questionsShuffled.length === 0) {
        document.getElementById('quiz-title').innerText = QUIZ_TITLE;
        document.getElementById('question-text').innerText = "هذا الاختبار غير متاح حالياً. سيتم إضافة الأسئلة قريباً.";
        quizFooter.style.display = 'none';
        questionCounter.innerText = "قريباً";
        progressBar.style.display = 'none';
        return;
    }
    const currentQuestion = questionsShuffled[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    if (currentQuestion.type === 'tf') {
        tfOptionsContainer.style.display = 'flex';
    } else if (currentQuestion.type === 'mc') {
        mcOptionsContainer.style.display = 'flex';
        mcOptionButtons.forEach((button, index) => {
            if (currentQuestion.options[index]) {
                button.querySelector('.option-text').innerText = currentQuestion.options[index];
                button.style.display = 'flex';
            } else {
                button.style.display = 'none';
            }
        });
    }
    questionCounter.innerText = `السؤال ${currentQuestionIndex + 1} / ${questionsShuffled.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / questionsShuffled.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    document.getElementById('next-btn').disabled = true;
}
function resetState() {
    feedback.innerText = '';
    tfOptionsContainer.style.display = 'none';
    mcOptionsContainer.style.display = 'none';
    allOptionButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove('correct', 'incorrect');
        button.querySelector('.icon').innerText = '';
        button.style.display = 'flex';
    });
    if(document.getElementById('next-btn')) {
        document.getElementById('next-btn').disabled = true;
    }
}
function selectAnswer(e) {
    const selectedButton = e.currentTarget;
    const currentQuestion = questionsShuffled[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;
    let selectedAnswer;
    if (currentQuestion.type === 'tf') {
        selectedAnswer = (selectedButton.dataset.answer === 'true');
    } else {
        selectedAnswer = parseInt(selectedButton.dataset.index);
    }
    allOptionButtons.forEach(button => button.disabled = true);
    if (selectedAnswer === correctAnswer) {
        selectedButton.classList.add('correct');
        feedback.innerText = "إجابة صحيحة!";
        feedback.style.color = '#2ecc71';
        correctAnswersCount++;
    } else {
        incorrectAnswers.push(currentQuestion);
        selectedButton.classList.add('incorrect');
        let correctButton;
        if (currentQuestion.type === 'tf') {
            correctButton = tfOptionsContainer.querySelector(`.option-btn[data-answer="${correctAnswer}"]`);
            const correctText = correctAnswer ? 'صح' : 'خطأ';
            feedback.innerText = `إجابة خاطئة. الصحيح هو: '${correctText}'`;
        } else {
            correctButton = mcOptionsContainer.querySelector(`.option-btn[data-index="${correctAnswer}"]`);
            const correctText = currentQuestion.options[correctAnswer];
            feedback.innerText = `إجابة خاطئة. الصحيح هو: '${correctText}'`;
        }
        correctButton.classList.add('correct'); 
        feedback.style.color = '#e74c3c';
    }
    const nextButton = document.getElementById('next-btn');
    nextButton.disabled = false;
    if (currentQuestionIndex === questionsShuffled.length - 1) {
        nextButton.innerText = 'عرض النتيجة';
    }
}
function showResults() {
    const totalQuestions = questionsShuffled.length;
    const incorrectCount = incorrectAnswers.length;
    quizBody.style.display = 'none';
    quizFooter.style.display = 'none';
    questionCounter.innerText = `اكتمل الاختبار ${totalQuestions} / ${totalQuestions}`;
    const percent = totalQuestions > 0 ? (correctAnswersCount / totalQuestions) * 100 : 0;
    const percentInDegrees = (percent / 100) * 360; 
    let feedbackMessage = '';
    let feedbackClass = '';
    if (percent >= 90) {
        feedbackMessage = 'مستواك ممتاز!'; feedbackClass = 'level-excellent';
    } else if (percent >= 75) {
        feedbackMessage = 'مستواك جيد جداً'; feedbackClass = 'level-good';
    } else if (percent >= 50) {
        feedbackMessage = 'مستواك مقبول'; feedbackClass = 'level-pass';
    } else {
        feedbackMessage = 'تحتاج للمحاولة مرة أخرى'; feedbackClass = 'level-fail';
    }
    const errorByDifficulty = { easy: 0, medium: 0, hard: 0 };
    const errorByTopic = {};
    incorrectAnswers.forEach(q => {
        let difficulty = q.difficulty;
        if (difficulty.includes('medium')) {
            difficulty = 'medium';
        }
        if (difficulty === 'easy') errorByDifficulty.easy++;
        else if (difficulty === 'medium') errorByDifficulty.medium++;
        else if (difficulty === 'hard') errorByDifficulty.hard++;
        if (!errorByTopic[q.topic]) {
            errorByTopic[q.topic] = 0;
        }
        errorByTopic[q.topic]++;
    });
    let adviceMessage = 'أداؤك جيد، لا توجد نقاط ضعف واضحة.';
    if (incorrectCount > 0) {
        let worstTopic = '';
        let maxErrors = 0;
        Object.entries(errorByTopic).forEach(([topic, count]) => {
            if (count > maxErrors) {
                maxErrors = count;
                worstTopic = topic;
            }
        });
        if (maxErrors > 1) {
            adviceMessage = `لاحظنا أن معظم أخطائك (${maxErrors} أخطاء) كانت في <strong>"${worstTopic}"</strong>. ننصحك بمراجعة هذا الجزء جيداً.`;
        } else {
             adviceMessage = 'أخطاؤك متنوعة، حاول مراجعة عامة للمنهج.';
        }
    }
    let errorListHtml = '<ul>';
    if(incorrectAnswers.length > 0) {
        incorrectAnswers.forEach(q => {
            errorListHtml += `<li>${q.question}</li>`;
        });
    } else {
        errorListHtml = '<p>لا توجد أخطاء، أحسنت!</p>';
    }
    errorListHtml += '</ul>';
    resultsContainer.innerHTML = `
        <div class="results-chart ${feedbackClass}" style="--percentage-value: ${percentInDegrees.toFixed(0)}deg;">
            <span class="percentage-text">${percent.toFixed(0)}%</span>
        </div>
        <h3 class="results-feedback-text ${feedbackClass}">${feedbackMessage}</h3>
        <p class="results-score-text">نتيجتك النهائية هي: ${correctAnswersCount} من ${totalQuestions}</p>
        <div class="results-divider"></div>
        <div class="results-summary-grid">
            <div class="summary-box">
                <p class="summary-box-label">الإجابات الصحيحة</p>
                <p class="summary-box-value correct">${correctAnswersCount}</p>
            </div>
            <div class="summary-box">
                <p class="summary-box-label">الإجابات الخاطئة</p>
                <p class="summary-box-value incorrect">${incorrectCount}</p>
            </div>
        </div>
        <div class="analysis-section">
            <h4>تحليل الأخطاء</h4>
            <div class="difficulty-analysis">
                <ul>
                    <li>أخطأت في: <span>${errorByDifficulty.easy}</span> أسئلة (سهلة)</li>
                    <li>أخطأت في: <span>${errorByDifficulty.medium}</span> أسئلة (متوسطة)</li>
                    <li>أخطأت في: <span>${errorByDifficulty.hard}</span> أسئلة (صعبة)</li>
                </ul>
            </div>
            <h4>نصيحة المراجعة</h4>
            <div class="advice-box">
                ${adviceMessage}
            </div>
        </div>
        <div class="error-list">
            <details>
                <summary>عرض الأسئلة التي أخطأت فيها (${incorrectCount})</summary>
                <div class="error-list-content">
                    ${errorListHtml}
                </div>
            </details>
        </div>
        <button id="retry-btn" class="next-btn">إعادة الاختبار</button>
    `;
    resultsContainer.style.display = 'flex';
    document.getElementById('retry-btn').addEventListener('click', startQuiz);
}
allOptionButtons.forEach(button => {
    button.addEventListener('click', selectAnswer);
});
