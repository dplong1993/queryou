const questionsList = document.querySelector(".questions_list");
const answerButtons = document.querySelectorAll('.answer-button');
const answerFormHolders = document.querySelectorAll('.answer-form');
const answerForms = document.querySelectorAll("#answer-form");
const answerCounts = document.querySelectorAll(".question-answer_info-count");
const questionIds = document.querySelectorAll('.question-id');
const questionHeaders = document.querySelectorAll('.topic-name');
const userNameHolders = document.querySelectorAll('.user_name');
const userDescriptionHolders = document.querySelectorAll('.user_description');

const getQuestions = async() => {
  const res = await fetch("/api/queries/");
  const data = await res.json();
  return data.questions;
}

const getCurrentQuestion = (questions, questionId) => {
  for(let question of questions){
    if(question.id === questionId) return question;
  }
}

const getCurrentQuestionTopic = (questionTopics, questionId) => {
  for(let questionTopic of questionTopics){
    if(questionTopic.questionId === questionId) return questionTopic;
  }
  return null;
}

const getQuestionTopics = async() => {
  const res = await fetch("/api/questionTopics/");
  const data = await res.json();
  return data.questionTopics;
}

const setTopicNames = (questionTopics) => {
  questionHeaders.forEach((el, index)=> {
    const currentQuestionTopic = getCurrentQuestionTopic(questionTopics, Number(questionIds[index].innerText));
    if(currentQuestionTopic) el.innerText = "Question add · " + currentQuestionTopic.Topic.name;
    else el.innerText = "Question add · No topic yet"
  });
}

const setAnswerCounts = (questions) => {
  answerCounts.forEach((el, index)=> {
    const currentQuestion = getCurrentQuestion(questions, Number(questionIds[index].innerText));
    const count = currentQuestion.Answers.length;
    if(count === 0) el.innerText = "No answer yet";
    else if(count === 1) el.innerText = count + " Answer";
    else el.innerText = count + " Answers";
  });
}

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
  const questions = await getQuestions();
  const questionTopics = await getQuestionTopics();
  console.log(questions);
  setTopicNames(questionTopics);
  setAnswerCounts(questions);
  setUserInfo();

  answerButtons.forEach((answerButton, index) => {
    answerButton.addEventListener('click', (e) => {
      answerFormHolders[index].classList.remove("hidden");
    });
  });

  answerCounts.forEach((answerCount, index) => {
    answerCount.addEventListener('click', (e) => {
      const currentQuestion = getCurrentQuestion(questions, Number(questionIds[index].innerText));
      const content = currentQuestion.content.split(' ').join('-');
      window.location.href = `${content}/`;
    });
  })

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
        window.location.href = '/queries';
      }
    });
  });
});
