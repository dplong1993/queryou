const questionsList = document.querySelector(".questions_list");
const answerButtons = document.querySelectorAll('.answer-button');
const answerFormHolders = document.querySelectorAll('.answer-form');
const answerForms = document.querySelectorAll("#answer-form");
const answerCounts = document.querySelectorAll(".question-answer_info-count");

const getQuestions = async() => {
  const res = await fetch("/api/queries/");
  const data = await res.json();
  return data.questions;
}

const setAnswerCounts = (questions) => {
  // console.log(answerCounts);
  answerCounts.forEach((el, index)=> {
    const count = questions[index+1].Answers.length;
    // console.log(questions[index]);
    if(count === 0) el.innerText = "No answer yet";
    else if(count === 1) el.innerText = count + " Answer";
    else el.innerText = questions[index].Answers.length + " Answers";
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  const questions = await getQuestions();
  // console.log(questions[3].Answers.length);
  setAnswerCounts(questions);

  answerButtons.forEach((answerButton, index) => {
    answerButton.addEventListener('click', (e) => {
      answerFormHolders[index].classList.remove("hidden");
    });
  });
  answerForms.forEach((answerForm, index) => {
    answerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(answerForm);
      const content = formData.get("answer");
      const _csrf = formData.get("_csrf");
      const questionId = Number(document.querySelectorAll('.question-id')[index].innerText);
      const body = { content, questionId, _csrf};

      const res = await fetch('/api/queries', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if(res.ok){
        window.location.href = '/queries';
      }
    });
  });
});
