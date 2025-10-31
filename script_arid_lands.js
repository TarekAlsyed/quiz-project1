// ---!! (جديد) هنا تضع عنوان الاختبار !! ---
const QUIZ_TITLE = "جغرافيا الاراضي الجافة";
// ----------------------------------------

// ---!! (فارغ) سيتم إضافة الأسئلة هنا مستقبلاً !! ---
const questions = [];
// ----------------------------------------

// --- (هذا هو الكود الكامل لتشغيل الاختبار) ---
// --- (لا تحتاج لتعديل أي شيء هنا) ---
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
        progressBar.style.display = 'none'; // إخفاء شريط التقدم
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
function selectAnswer(e) {}
function showResults() {}
allOptionButtons.forEach(button => {
    button.addEventListener('click', selectAnswer);
});