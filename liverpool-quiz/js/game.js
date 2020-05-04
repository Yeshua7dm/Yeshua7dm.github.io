let question = document.getElementById("question");
let options = Array.from(document.getElementsByClassName("option"));

let score = 0;
let currentQuestion = {};
let startPlaying = false;
let questionCounter = 0;
let availableQuestions = [];
let progressBar = document.getElementsByClassName("progress");

const Questions = [
  {
    question:
      "What is the name of the Manager who won the last English League title with Liverpool?",
    choice1: "Sir Kenny Dalglish",
    choice2: "Jurgen Klopp",
    choice3: "Bob Paisley",
    choice4: "Rafa Benitez",
    answer: 1,
  },
  {
    question: "Where is the first team training pitch located?",
    choice1: "Kirkby",
    choice2: "Anfield",
    choice3: "Melwood",
    choice4: "Merseyside",
    answer: 3,
  },
  {
    question: "How many FIFA Club World Cup trophies has Liverpool won?",
    choice1: "One",
    choice2: "Two",
    choice3: "Three",
    choice4: "Five",
    answer: 1,
  },
  {
    question: "The current captain of the U-23 side is?",
    choice1: "Rhian Brewster",
    choice2: "Curis Jones",
    choice3: "Chirivella",
    choice4: "Caoimhin Kelleher",
    answer: 2,
  },
  {
    question: "Who is the current Vice-Captain of the First-Team squad?",
    choice1: "Virgil Van Dijk",
    choice2: "Sadio Mane",
    choice3: "Jordan Henderson",
    choice4: "James Milner",
    answer: 4,
  },
];

// some constants
MAX_QUESTIONS = 5;

function startGame() {
  availableQuestions = [...Questions];
  score = 0;
  questionCounter = 0;
  getNewQuestion();
}

function getNewQuestion() {
  // start by checking if the max questions have been reached
  if (questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("score", score);
    localStorage.setItem("max", MAX_QUESTIONS);
    window.location.assign("end.html");
  }

  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  options.forEach((option) => {
    const number = option.dataset["number"];
    option.innerText = currentQuestion["choice" + number];
  });

  let questionCount = document.getElementById("questionCounter");

  questionCount.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  progressBar[0].style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  availableQuestions.splice(questionIndex, 1);
  startPlaying = true;
}

options.forEach((option) => {
  option.addEventListener("click", function (e) {
    if (!startPlaying) return;
    startPlaying = false;

    const selectedOption = e.target;
    const selectedNumber = selectedOption.dataset["number"];
    const classToApply =
      selectedNumber == currentQuestion.answer ? "correct" : "incorrect";
    selectedOption.classList.add(classToApply);

    if (classToApply == "incorrect") {
      correction = document.querySelector(
        ".option[data-number='" + currentQuestion.answer + "']"
      );
      correction.classList.add("correct");
    } else {
      score++;
      let scoreField = document.getElementById("score");
      scoreField.innerText = score;
    }

    setTimeout(() => {
      selectedOption.classList.remove(classToApply);
      if (classToApply == "incorrect") {
        correction.classList.remove("correct");
      }

      getNewQuestion();
    }, 500);
  });
});

startGame();
