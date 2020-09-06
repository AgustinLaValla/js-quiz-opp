import "./styles.css";

//Classes
class Question {
  constructor(text, choises, answer) {
    this.text = text;
    this.choises = choises;
    this.answer = answer;
  }

  isAnswerCorrect(choise) {
    return choise === this.answer;
  }
}

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  getQuestion() {
    return this.questions[this.questionIndex];
  }

  isEnded() {
    return this.questions.length === this.questionIndex;
  }

  setAnswerScoreAndNext(answer) {
    console.log(this.getQuestion());
    if (this.getQuestion().isAnswerCorrect(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }
}

class UI {
  constructor(questions) {
    this.quiz = new Quiz(questions);
  }

  populate() {
    this.showProgress();

    if (this.quiz.isEnded()) {
      this.showScores();
    } else {
      //show question
      const questionElem = document.getElementById("question");
      if (questionElem) {
        document.getElementById(
          "question"
        ).innerHTML = this.quiz.getQuestion().text;
      }
      //show choises
      const choises = this.quiz.getQuestion().choises;
      choises.forEach((choise, index) => {
        console.log(index);
        document.getElementById(`choise${index}`).innerHTML = choise;
        document.getElementById(`btn${index}`).onclick = () => {
          this.quiz.setAnswerScoreAndNext(choise);
          this.populate();
        };
      });
    }
  }
  showScores() {
    document.querySelector(".grid").innerHTML = `
        <h1>Result</h1>
        <h2 id="score">Your score: ${this.quiz.score}</h2>
    `;
  }
  showProgress() {
    const currentQuestionNumber = this.quiz.questionIndex + 1;
    const progressElem = document.getElementById("progress");
    if (progressElem) {
      progressElem.innerText = `${currentQuestionNumber} of ${this.quiz.questions.length}`;
    }
  }
}

//Questions data
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

const ui = new UI(questions);

ui.populate();
