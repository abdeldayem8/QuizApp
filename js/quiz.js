export class Quiz {
  constructor(category, difficulty, numberofquestions) {
    this.category = category;
    this.difficulty = difficulty;
    this.numberofquestions = numberofquestions;
    this.score = 0;
  }

  async getQuestion() {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${this.numberofquestions}&category=${this.category}&difficulty=${this.difficulty}&type=multiple`
    );
    const data = await response.json();
    return data.results;
  }
  endQuiz() {
    return ` <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3"
    >
      <h2 class="mb-0">
      ${
        this.score == this.numberofquestions
          ? `Congratulations 🎉`
          : `Your score is ${this.score}`
      }      
      </h2>
      <button class="again btn btn-primary rounded-pill"><i class="bi bi-arrow-repeat"></i> Try Again</button>
    </div>`;
  }
}
