const correctAnswers = ['c', 'b', 'c', 'b', 'c', 'b', 'a', 'd', 'b', 'a'];
const resultMessage = {
  80: "You're an expert! You know Doctor Strange so well! Congrats!",
  50: "You're almost there! It's a good idea to rewatch the movies one more time to remember all the references.",
  0: "It's a good time to rewatch the movies to understand all the references. What do you think?"
};

function checkAnswers() {
  const userAnswers = document.querySelectorAll("input[type='radio']:checked");
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer.value === correctAnswers[index]) {
      score += 10;
    }
  });
  return score;
}

function showResult() {
  const resultWrapper = document.querySelector('.result');
  resultWrapper.style.display = 'block';
}

function getResultMessage(score) {
  let message;
  for (let reference in resultMessage) {
    if (score >= reference) {
      message = resultMessage[reference];
    }
  }
  return message;
}

const quiz = document.forms['quiz'];
quiz.addEventListener('submit', e => {
  e.preventDefault();
  const didUserAnswerAllQuestions =
    document.querySelectorAll("input[type='radio']:checked").length === 10;
  const alert = document.querySelector('.alert');
  if (!didUserAnswerAllQuestions) {
    alert.classList.add('show');
    return;
  }
  alert.classList.remove('show');
  const score = checkAnswers();
  scrollTo(0, 0);
  showResult();
  const scoreElement = document.querySelector('#score');
  let output = 0;
  const timer = setInterval(() => {
    scoreElement.textContent = output;
    if (output === score) {
      clearInterval(timer);
    } else {
      output++;
    }
  }, 15);
  const resultMessage = document.querySelector('.result-message');
  resultMessage.textContent = getResultMessage(score);
});
