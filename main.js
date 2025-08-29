const questions = [
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answers: ["<a>", "<link>", "<href>", "<url>"],
    correct: "<a>"
  },
  {
    question: "Which CSS property controls the text size?",
    answers: ["font-style", "text-size", "font-size", "text-weight"],
    correct: "font-size"
  },
  {
    question: "Which HTML element is used to insert JavaScript?",
    answers: ["<js>", "<scripting>", "<script>", "<javascript>"],
    correct: "<script>"
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Creative Style Syntax"
    ],
    correct: "Cascading Style Sheets"
  },
  {
    question: "Which of the following is NOT a valid CSS unit?",
    answers: ["px", "em", "rem", "ptx"],
    correct: "ptx"
  },
  {
    question: "Which method is used to select an element by ID in JavaScript?",
    answers: [
      "document.querySelectorAll()",
      "document.getElementById()",
      "document.getElementsByClassName()",
      "document.getElement()"
    ],
    correct: "document.getElementById()"
  },
  {
    question: "In CSS, how do you select an element with the class 'container'?",
    answers: [".container", "#container", "container", "*container"],
    correct: ".container"
  },
  {
    question: "Which HTML5 element is used to display video?",
    answers: ["<media>", "<movie>", "<video>", "<player>"],
    correct: "<video>"
  }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

function startQuiz() {
  shuffledQuestions = shuffle([...questions]); // random order, no repeat
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  resultEl.textContent = "";
  nextBtn.style.display = "block";
  showQuestion();

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
  updateTimer();
}

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerEl.textContent = `⏳ ${minutes}:${seconds.toString().padStart(2,"0")}`;
}

function showQuestion() {
  resetState();
  let currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer");
    button.addEventListener("click", () => selectAnswer(answer));
    answersEl.appendChild(button);
  });
}

function resetState() {
  answersEl.innerHTML = "";
}

function selectAnswer(answer) {
  let correct = shuffledQuestions[currentQuestionIndex].correct;
  if (answer === correct) score++;
  nextBtn.disabled = false;
  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.background = "#81c784";
    } else {
      btn.style.background = "#e57373"; 
    }
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  clearInterval(timer);
  questionEl.textContent = "";
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  resultEl.innerHTML = `⏰ Time's up or quiz finished!<br>✅ Your score: ${score}/${shuffledQuestions.length}`;
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

startQuiz();
