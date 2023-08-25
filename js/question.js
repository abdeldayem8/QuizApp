import { questions, quiz, questionContainer } from "./index.js";
export class Question {
  constructor(index) {
    this.question = questions[index].question;
    this.category = questions[index].category;
    this.answer = questions[index].correct_answer;
    this.index = index;
    this.wrongAnswer = questions[index].incorrect_answers;
    this.allAnswers = this.getChoice();
    this.answered = false;
  }
  getChoice() {
    return this.wrongAnswer.concat(this.answer).sort();
  }
  displayQuestion() {
    const questionHtml = `<div class="question shadow-lg col-lg-6 offset-lg-3 p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__fadeInTopLeft">
     <div class="w-100 d-flex justify-content-between">
     <span class="btn btn-category">${this.category}</span>
     <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      questions.length
    } Questions</span>
     </div>
     <h2 class="text-capitalize text-center">${this.question}</h2>
     <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
     ${this.allAnswers
       .map(function (i) {
         return `<li>${i}</li>`;
       })
       .join("")}
     </ul>
     <h2 class="text-capitalize text-center score-color h3 fw-bold">
     <i class="fa-regular fa-face-laugh-beam"></i> Score: ${quiz.score} </h2>
      </div>`;
    questionContainer.innerHTML = questionHtml;
    const allAnswers = document.querySelectorAll(".question ul li");
    for (let i = 0; i < allAnswers.length; i++) {
      allAnswers[i].addEventListener("click", (e) => {
        this.checkAnswer(e);
      });
    }
  }
  checkAnswer(e) {
    if (!this.answered) {
      this.answered = true;
      if (e.target.innerHTML.toLowerCase() == this.answer.toLowerCase()) {
        e.target.classList.add(
          "correct",
          "animate__animated",
          "animate__flipInY"
        );
        quiz.score += 1;
      } else {
        e.target.classList.add("wrong", "animate__animated", "animate__shakeX");
      }
      this.animateQuestion(e.target, 500);
    }
  }
  animateQuestion(ele, duration) {
    setTimeout(() => {
      ele
        .closest(".question")
        .classList.replace("animate__fadeInTopLeft", "animate__bounceOut");
      setTimeout(() => {
        this.nextQuestion();
      }, duration);
    }, duration);
  }
  nextQuestion() {
    this.index += 1;
    if (this.index > questions.length - 1) {
      questionContainer.innerHTML = quiz.endQuiz();
      const tryAgain = document.querySelector(".again");
      tryAgain.addEventListener("click", function () {
        location.reload();
      });
      return;
    }
    const newQuestion = new Question(this.index);
    newQuestion.displayQuestion();
  }
}
