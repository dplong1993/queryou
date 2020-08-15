const questionsList = document.querySelector(".questions_list");

window.addEventListener("DOMContentLoaded", async () => {
  const answerButtons = document.querySelectorAll('.answer-button');
  const answerFormHolders = document.querySelectorAll('.answer-form');
  const answerForms = document.querySelectorAll("#answer-form");
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
