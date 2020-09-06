import "./styles.css";

function Question(text, choises, answer) {
  this.text = text;
  this.choises = choises;
  this.answer = answer;
}

Question.prototype.correctAnswer = function (choise) {
  return choise === this.answer;
};

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.isEnded = function () {
  return this.questions.length === this.questionIndex;
};

Quiz.prototype.setScoreAndNext = function (answer) {
  if (this.getQuestionIndex().correctAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

function populate() {
  showProgress();
  if (quiz.isEnded()) {
    showScores();
  } else {
    const element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    //Show choises
    const choises = quiz.getQuestionIndex().choises;
    choises.forEach((choise, index) => {
      document.getElementById(`choise${index}`).innerHTML = choise;
      guess(`btn${index}`, choise);
    });
  }
}

function guess(id, guess) {
  const button = document.getElementById(id);
  button.onclick = function () {
    quiz.setScoreAndNext(guess);
    populate();
  };
}

function showProgress() {
  const currentQuestionNumber = quiz.questionIndex + 1;
  document.getElementById(
    "progress"
  ).innerText = `${currentQuestionNumber} of ${quiz.questions.length}`;
}

function showScores() {
  const gameOverHtml = `
      <h1>Result</h1>
      <h2 id="score">Your scores: ${quiz.score}</h2>
  `;
  document.querySelector(".grid").innerHTML = gameOverHtml;
}

const questions = [
  new Question(
    "Which one is not an object oriented programming language?",
    ["Java", "C#", "C++", "C"],
    "C"
  ),
  new Question(
    "Which one is used for styling web pages?",
    ["HTML", "JQuery", "CSS", "XML"],
    "CSS"
  ),
  new Question(
    "There are ____ main components of object oriented programming",
    ["1", "6", "2", "4"],
    "4"
  ),
  new Question(
    "Which language is used for web apps?",
    ["PHP", "Python", "Javascript", "All"],
    "All"
  ),
  new Question(
    "MCV is a ____",
    ["Language", "Library", "Framework", "All"],
    "Framework"
  )
];

const quiz = new Quiz(questions);

populate();
