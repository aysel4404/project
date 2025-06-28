const quiz = document.querySelector("#quiz");
const answerElm = document.querySelectorAll(".answer");
const questionElm = document.getElementById("question");
const [option_1, option_2, option_3, option_4] = [
    document.getElementById("option_1"),
    document.getElementById("option_2"),
    document.getElementById("option_3"),
    document.getElementById("option_4")
];
const submitBtn = document.querySelector("#submit");

let quizdata = [];
let score = 0;
let currentQuiz = 0;

async function fetchQuestions() {
    try {
        const res = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple');
        const data = await res.json();
        quizdata = data.results.map(q => {
            const options = [...q.incorrect_answers];
            const correctIndex = Math.floor(Math.random() * 4);
            options.splice(correctIndex, 0, q.correct_answer);
            return {
                question: decodeHTML(q.question),
                options: options.map(decodeHTML),
                correct: correctIndex
            };
        });
        loadQuiz();
    } catch (error) {
        quiz.innerHTML = "<h2>Failed to load quiz questions. Please try again later.</h2>";
    }
}

function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const loadQuiz = () => {
    const { question, options } = quizdata[currentQuiz];
    questionElm.innerText = `${currentQuiz + 1}: ${question}`;
    [option_1, option_2, option_3, option_4].forEach((opt, i) => {
        opt.innerText = options[i];
    });
};

const getSelectedOption = () => {
    return Array.from(answerElm).findIndex((curElem) => curElem.checked);
};

const deselectedAnswers = () => {
    answerElm.forEach((curElem) => (curElem.checked = false));
};

submitBtn.addEventListener("click", () => {
    const selectedOptionIndex = getSelectedOption();
    if (selectedOptionIndex === quizdata[currentQuiz].correct) {
        score++;
    }
    currentQuiz++;
    if (currentQuiz < quizdata.length) {
        deselectedAnswers();
        loadQuiz();
    } else {
        quiz.innerHTML = `
        <div class="result">
            <h2>Your Score: ${score}/${quizdata.length} Correct Answers</h2>
            <p>Congratulations on completing the quiz! 🎉</p>
            <button class="reload-button" onclick="location.reload()">Play Again 🔄</button>
        </div>`;
    }
});

// Initial fetch
fetchQuestions();
