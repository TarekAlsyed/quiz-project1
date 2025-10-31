const QUIZ_TITLE = "جغرافية النقل والمواصلات";
const questions = [
    {type: 'tf', question: "يُعتبر النقل والاتصالات مؤشراً هاماً في عملية البناء الاقتصادي والاجتماعي للدول.", answer: true, difficulty: 'easy', topic: 'مقدمة في النقل'},
    {type: 'tf', question: "لا يوجد فرق بين مفهوم النقل (Transport) ومفهوم جغرافية النقل.", answer: false, difficulty: 'easy', topic: 'مفاهيم أساسية'},
    {type: 'tf', question: "عرف 'Hanzodier' النقل بأنه 'عملية من خط واحد لإنتاج سلعة ونقلها من أماكن الإنتاج إلى مراكز الاستهلاك'.", answer: true, difficulty: 'medium', topic: 'مفاهيم أساسية'},
    {type: 'tf', question: "تُعتبر جغرافية النقل من أحدث فروع الجغرافيا الاقتصادية التي ظهرت في النصف الثاني من القرن العشرين.", answer: true, difficulty: 'medium', topic: 'ماهية جغرافية النقل'},
    {type: 'tf', question: "تقتصر دراسة جغرافية النقل على تحليل شبكات النقل فقط، ولا تهتم بالعلاقة بين النقل والعلوم الأخرى.", answer: false, difficulty: 'easy', topic: 'ماهية جغرافية النقل'},
    {type: 'tf', question: "يساهم النقل في تحقيق التوازن بين مناطق الفائض ومناطق العجز في السلع.", answer: true, difficulty: 'easy', topic: 'الآثار الاقتصادية للنقل'},
    {type: 'tf', question: "يُعتبر النقل عنصرًا سلبيًا في عملية التنمية الاقتصادية لأنه يزيد من التكاليف.", answer: false, difficulty: 'easy', topic: 'الآثار الاقتصادية للنقل'},
    {type: 'tf', question: "تطور صناعات النقل (مثل صناعة السيارات والسفن) ليس له تأثير يُذكر على التطور الاقتصادي العام.", answer: false, difficulty: 'easy', topic: 'الآثار الاقتصادية للنقل'},
    {type: 'tf', question: "يساهم النقل في تقسيم العمل على أساس جغرافي إقليمي ودولي.", answer: true, difficulty: 'medium', topic: 'الآثار الاقتصادية للنقل'},
    {type: 'tf', question: "من الآثار الاجتماعية السلبية للنقل زيادة معدلات الوفيات بسبب الحوادث.", answer: true, difficulty: 'easy', topic: 'الآثار الاجتماعية والبيئية'},
    {type: 'tf', question: "يساعد النقل على نشر الأفكار والعلوم والفنون وتعميق الروابط الاجتماعية بين أفراد الوطن الواحد.", answer: true, difficulty: 'easy', topic: 'الآثار الاجتماعية للنقل'},
    {type: 'tf', question: "يُعتبر الرصاص المنبعث من عوادم السيارات من أخطر ملوثات الهواء في المدن.", answer: true, difficulty: 'medium', topic: 'الآثار البيئية للنقل'},
    {type: 'tf', question: "الازدحام المروري في أوقات الذروة يؤثر إيجابيًا على الصحة النفسية للسكان.", answer: false, difficulty: 'easy', topic: 'الآثار الاجتماعية والبيئية'},
    {type: 'tf', question: "نظم المعلومات الجغرافية (GIS) هي مجرد برامج لرسم الخرائط ولا تساعد في تحليل البيانات.", answer: false, difficulty: 'easy', topic: 'تطبيقات GIS في النقل'},
    {type: 'tf', question: "تساعد نظم المعلومات الجغرافية في تحديد أفضل المسارات لخطوط النقل وتقليل زمن الرحلة.", answer: true, difficulty: 'medium', topic: 'تطبيقات GIS في النقل'},
    {type: 'tf', question: "يمكن استخدام (GIS) في تحليل الحوادث المرورية وتحديد 'النقاط السوداء' (Black Spots) على الطرق.", answer: true, difficulty: 'medium', topic: 'تطبيقات GIS في النقل'},
    {type: 'tf', question: "الموقع المطلق (Mathematical Location) هو الموقع الفلكي الذي يُحدد بخطوط الطول ودوائر العرض.", answer: true, difficulty: 'easy', topic: 'العوامل الجغرافية: الموقع'},
    {type: 'tf', question: "الموضع (Site) هو الموقع الجغرافي الحيوي للمكان، مثل موقع مدينة على قمة جبل أو في سهل.", answer: true, difficulty: 'easy', topic: 'العوامل الجغرافية: الموقع'},
    {type: 'tf', question: "الموقع النسبي (Situation) هو نفسه الموقع المطلق (Location).", answer: false, difficulty: 'easy', topic: 'العوامل الجغرافية: الموقع'},
    {type: 'tf', question: "تُعتبر قناة السويس مثالاً على أهمية الموقع النسبي (Situation) لمصر.", answer: true, difficulty: 'medium', topic: 'العوامل الجغرافية: الموقع'},
    {type: 'tf', question: "البنية الجيولوجية (الصخور الصلبة أو الرخوة) لا تؤثر على تكاليف إنشاء الطرق.", answer: false, difficulty: 'easy', topic: 'العوامل الجغرافية: البنية الجيولوجية'},
    {type: 'tf', question: "يفضل إنشاء المطارات على الأراضي الصخرية الصلبة لتحمل هبوط الطائرات.", answer: false, difficulty: 'medium', topic: 'العوامل الجغرافية: البنية الجيولوجية'},
    {type: 'tf', question: "الأراضي الرملية المفككة لا تحتاج إلى صيانة مستمرة عند مد خطوط السكك الحديدية.", answer: false, difficulty: 'easy', topic: 'العوامل الجغرافية: البنية الجيولوجية'},
    {type: 'tf', question: "في المناطق الجبلية، غالبًا ما تتبع طرق النقل الوديان والممرات الجبلية (الخوانق).", answer: true, difficulty: 'easy', topic: 'العوامل الجغرافية: التضاريس'},
    {type: 'tf', question: "تُعتبر السهول الفيضية (مثل الدلتا) أفضل الأماكن لمد خطوط الأنابيب بسبب سهولة الحفر.", answer: true, difficulty: 'medium', topic: 'العوامل الجغرافية: التضاريس'},
    {type: 'mc', question: "المصطلح الذي يُعنى بدراسة العلاقة بين النقل والوسط الجغرافي (الطبيعي والبشري) هو:", options: ["هندسة النقل", "اقتصاديات النقل", "جغرافية النقل", "إدارة النقل"], answer: 2, difficulty: 'easy', topic: 'ماهية جغرافية النقل'},
    {type: 'mc', question: "العالم الذي يُنسب إليه الفضل في تطوير نموذج 'المدن المتناثرة والزراعة' وتأثير النقل عليها هو:", options: ["ويبر (Weber)", "فون ثونن (Von Thunen)", "راتزل (Ratzel)", "أولمان (Ullman)"], answer: 1, difficulty: 'hard', topic: 'ماهية جغرافية النقل'},
    {type: 'mc', question: "أي من التالي لا يُعد من الآثار الاقتصادية المباشرة للنقل؟", options: ["إشباع حاجات المناطق المختلفة", "زيادة الدخل القومي", "تحقيق الاستقرار الأمني", "توسيع نطاق الأسواق"], answer: 2, difficulty: 'medium', topic: 'الآثار الاقتصادية للنقل'},
    {type: 'mc', question: "أي من التالي يُعد من الآثار الاجتماعية للنقل؟", options: ["تحديد حجم الإنتاج", "ربط أجزاء العالم وتسهيل التفاهم", "خفض أسعار السلع", "زيادة قيمة الأراضي"], answer: 1, difficulty: 'easy', topic: 'الآثار الاجتماعية للنقل'},
    {type: 'mc', question: "تُصنف 'الضوضاء' الناتجة عن حركة المرور الكثيفة ضمن أي نوع من الآثار؟", options: ["الآثار الاقتصادية", "الآثار البيئية (التلوث السمعي)", "الآثار السياسية", "الآثار الثقافية"], answer: 1, difficulty: 'easy', topic: 'الآثار البيئية للنقل'},
    {type: 'mc', question: "أي من التالي يُعد من أخطر ملوثات الهواء الناتجة عن احتراق وقود السيارات؟", options: ["الأكسجين", "ثاني أكسيد الكربون", "الرصاص وأكاسيد النيتروجين", "الهيدروجين"], answer: 2, difficulty: 'medium', topic: 'الآثار البيئية للنقل'},
    {type: 'mc', question: "نظام يعتمد على الحاسب الآلي لربط البيانات المكانية (الخرائط) بالبيانات الوصفية (الجداول) بهدف التحليل واتخاذ القرار:", options: ["GPS (نظام تحديد المواقع)", "Remote Sensing (الاستشعار عن بعد)", "GIS (نظم المعلومات الجغرافية)", "Google Earth"], answer: 2, difficulty: 'easy', topic: 'تطبيقات GIS في النقل'},
    {type: 'mc', question: "في تطبيقات GIS، ما هي الخاصية التي تُستخدم لوصف شبكة الطرق (مثل عرض الطريق، عدد الحارات، السرعة القصوى)؟", options: ["البيانات المكانية (Spatial Data)", "البيانات الوصفية (Attribute Data)", "البيانات الرسومية (Raster Data)", "البيانات المطلقة (Absolute Data)"], answer: 1, difficulty: 'medium', topic: 'تطبيقات GIS في النقل'},
    {type: 'mc', question: "تُستخدم وظيفة 'التتبع' (Tracing) في نظم المعلومات الجغرافية لتحليل:", options: ["تدفق الحركة على جزء من الشبكة", "حساب أطوال الطرق", "تحديد مواقع الحوادث", "رسم الخرائط الكنتورية"], answer: 0, difficulty: 'hard', topic: 'تطبيقات GIS في النقل'},
    {type: 'mc', question: "عند دراسة موقع مدينة ما بالنسبة لخطوط الطول ودوائر العرض، فنحن ندرس:", options: ["الموضع (Site)", "الموقع النسبي (Situation)", "الموقع المطلق (Mathematical Location)", "الموقع الاقتصادي"], answer: 2, difficulty: 'easy', topic: 'العوامل الجغرافية: الموقع'},
    {type: 'mc', question: "وصف موقع القاهرة بأنها 'نقطة التقاء الوجه البحري بالوجه القبلي عند رأس الدلتا' هو وصف لـ:", options: ["الموقع المطلق", "الموضع (Site)", "الموقع النسبي (Situation)", "الموقع الفلكي"], answer: 2, difficulty: 'medium', topic: 'العوامل الجغرافية: الموقع'},
    {type: 'mc', question: "ما هو المصطلح الذي يصف الخصائص الطبيعية للمكان نفسه (مثل نوع التربة، الارتفاع)؟", options: ["الموضع (Site)", "الموقع (Location)", "الموقع النسبي (Situation)", "الموقع الجغرافي"], answer: 0, difficulty: 'easy', topic: 'العوامل الجغرافية: الموقع'},
    {type: 'mc', question: "حسب الملخص، اكتسبت مدينة الزقازيق أهميتها كنقطة عقدية للنقل بسبب:", options: ["موقعها المطلق", "مرور خطوط السكك الحديدية والسيارات بها", "موضعها فوق تل مرتفع", "قربها من البحر"], answer: 1, difficulty: 'medium', topic: 'العوامل الجغرافية: الموقع'},
    {type: 'mc', question: "أي الدول الأوروبية ذُكرت كمثال على الموقع الممتاز كعقدة للنقل البري والحديدي بسبب موقعها المتوسط؟", options: ["بريطانيا", "سويسرا", "فرنسا", "إسبانيا"], answer: 2, difficulty: 'medium', topic: 'العوامل الجغرافية: الموقع'},
    {type: 'mc', question: "أي المطارات ذُكر كمثال على عقدة جوية عالمية تربط بين أوروبا والأمريكتين وأفريقيا؟", options: ["مطار القاهرة", "مطار باريس", "مطار نيويورك (جون كينيدي)", "مطار لندن"], answer: 3, difficulty: 'medium', topic: 'العوامل الجغرافية: الموقع'},
    {type: 'mc', question: "ما هو التأثير الجيولوجي الرئيسي عند إنشاء الطرق في المناطق ذات 'الصخور الرخوة' (الطينية والرملية)؟", options: ["سهولة الإنشاء وقلة التكاليف", "صعوبة الحفر وارتفاع التكاليف", "الحاجة لصيانة مستمرة وتجديد بسبب الهبوط", "عدم الحاجة إلى طبقة أساس"], answer: 2, difficulty: 'medium', topic: 'العوامل الجغرافية: البنية الجيولوجية'},
    {type: 'mc', question: "عند إنشاء المطارات، يُفضل اختيار المناطق ذات التكوينات:", options: ["الصخرية الصلبة النارية", "الطينية الرخوة", "الرملية المفككة", "المكونة من الحجر الجيري (التي تتأثر بالذوبان)"], answer: 1, difficulty: 'medium', topic: 'العوامل الجغرافية: البنية الجيولوجية'},
    {type: 'mc', question: "لماذا تُعتبر الأراضي الرملية اللينة (مثل الكثبان الرملية) غير مفضلة لمد خطوط السكك الحديدية؟", options: ["لأنها صلبة جدًا ويصعب الحفر فيها", "لأنها تحتاج لتثبيت وتغطية مستمرة مما يرفع تكاليف الصيانة", "لأنها تسبب فيضانات", "لأنها لا توجد إلا في المناطق الباردة"], answer: 1, difficulty: 'easy', topic: 'العوامل الجغرافية: البنية الجيولوجية'},
    {type: 'mc', question: "في المناطق ذات الصخور الجيرية (الطباشيرية)، ما هي الظاهرة الجيولوجية التي يجب الحذر منها عند مد خطوط الأنابيب؟", options: ["البراكين", "الزلازل", "الفوالق والانكسارات", "الذوبان (التكهف) وهبوط الأرض"], answer: 3, difficulty: 'hard', topic: 'العوامل الجغرافية: البنية الجيولوجية'},
    {type: 'mc', question: "لماذا تُعتبر تكاليف إنشاء خطوط الأنابيب في الأراضي الصخرية الصلبة 'ضعف' مثيلتها في الأراضي السهلية؟", options: ["بسبب الحاجة لتكسير الصخور", "بسبب الحاجة لتثبيت الأنابيب", "بسبب كثرة الأمطار", "بسبب انخفاض درجات الحرارة"], answer: 0, difficulty: 'medium', topic: 'العوامل الجغرافية: البنية الجيولوجية'},
    {type: 'mc', question: "ما هو العامل الرئيسي الذي يتحكم في توجيه شبكات الطرق في المناطق الجبلية (مثل طرق لبنان)؟", options: ["اتجاه الرياح", "التكوينات الجيولوجية (الوديان والممرات)", "توزيع السكان", "المناطق الزراعية"], answer: 1, difficulty: 'easy', topic: 'العوامل الجغرافية: التضاريس'},
    {type: 'mc', question: "أي نوع من التضاريس يُعتبر 'الأكثر كلفة' عند مد خطوط السكك الحديدية بسبب الحاجة للأنفاق والجسور؟", options: ["السهول الفيضية", "المناطق الجبلية", "السهول الساحلية", "الصحاري الرملية"], answer: 1, difficulty: 'easy', topic: 'العوامل الجغرافية: التضاريس'},
    {type: 'mc', question: "أي من التالي يُعد من أهم وظائف نظم المعلومات الجغرافية (GIS) في مجال النقل؟", options: ["قيادة السيارات آلياً", "بناء الطرق والجسور", "تحليل الحوادث وإدارة الأساطيل وتخطيط المسارات", "بيع تذاكر السفر"], answer: 2, difficulty: 'easy', topic: 'تطبيقات GIS في النقل'},
    {type: 'mc', question: "عندما تفاضل بين مد طريق عبر سهل طيني (تكاليف صيانة عالية) أو عبر جبل صخري (تكاليف إنشاء عالية)، فأنت تدرس تأثير:", options: ["الموقع النسبي", "البنية الجيولوجية والتضاريس", "الآثار الاجتماعية", "نظم المعلومات الجغرافية"], answer: 1, difficulty: 'medium', topic: 'العوامل الجغرافية (شامل)'},
    {type: 'mc', question: "أي من التالي يمثل أفضل وصف لـ 'جغرافية النقل'؟", options: ["دراسة تاريخ تطور وسائل النقل.", "دراسة هندسة محركات السيارات والطائرات.", "دراسة العلاقة المتبادلة بين شبكات النقل والبيئة الجغرافية (الطبيعية والبشري).", "دراسة قوانين المرور الدولية."], answer: 2, difficulty: 'easy', topic: 'ماهية جغرافية النقل'}
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