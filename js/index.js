import { Quiz } from "./quiz.js";
import { Question } from "./question.js";
export let questions;
export let quiz;
const categoryMenu = document.getElementById("categoryMenu");
const diffcultyMenu = document.getElementById("difficultyOptions");
const numberOfQuestions = document.getElementById("questionsNumber");
const startBtn = document.getElementById("startQuiz");
const quizForm = document.getElementById("quizoptions");
export const questionContainer = document.querySelector(".questionsContainer");

startBtn.addEventListener("click", async function () {
  const category = categoryMenu.value;
  const diffculty = diffcultyMenu.value;
  const number = numberOfQuestions.value;
  quiz = new Quiz(category, diffculty, number);
  questions = await quiz.getQuestion();
  let question = new Question(0);
  quizForm.classList.replace("d-flex", "d-none");
  question.displayQuestion();
});
