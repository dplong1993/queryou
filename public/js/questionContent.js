const answerButtons = document.querySelectorAll('.answer-button');
const answerFormHolders = document.querySelectorAll('.answer-form');
const userNameHolders = document.querySelectorAll('.user_name');
const userDescriptionHolders = document.querySelectorAll('.user_description');
const answerForms = document.querySelectorAll("#answer-form");
const questionIds = document.querySelectorAll('.question-id');

const getUserInfo = async () => {
  const res = await fetch("/api/users/");
  const data = await res.json();
  return data.user;
}

const setUserInfo = async () => {
  const user = await getUserInfo();
  userNameHolders.forEach((el, index) => {
    el.innerText = user.username;
    userDescriptionHolders[index].innerText = user.description;
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  setUserInfo();

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
      const questionId = Number(questionIds[index].innerText);
      // console.log(questionId);
      const body = { content, questionId, _csrf};

      const res = await fetch('/api/queries', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if(res.ok){
        location.reload();
      }
    });
  });
});
