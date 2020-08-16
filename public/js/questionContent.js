const answerButtons = document.querySelectorAll('.answer-button');
const answerFormHolders = document.querySelectorAll('.answer-form');
const userNameHolders = document.querySelectorAll('.user_name');
const userDescriptionHolders = document.querySelectorAll('.user_description');

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
});
