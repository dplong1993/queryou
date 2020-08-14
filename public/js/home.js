//const answer = require("../../db/models/answer");

const nav = document.querySelectorAll(".top-nav li");

const getAnswers = async () => {
    const res = await fetch('/api/answers');
    const data = await res.json();
    return data;
};

const populateAnswersList = async () => {
    const answersList = document.querySelector('.answers-list');
    const { answers } = await getAnswers();
    for (let answer of answers) {
        const createdAt = new Date(answer.createdAt);
        const dateOptions = {
            year: "numeric",
            month: "short",
            day: "numeric"
        };
        const timestamp = createdAt.toLocaleString("en-US", dateOptions);
        const answerLi = `
            <li>
                <div class="user-icon">
                    <i class="fas fa-user"></i>
                </div>
                <div class="answer">
                    <div class="answer-header">
                        Updated ${answer.User.username} · ${timestamp}
                    </div>                
                </div>
            </li>
        `;
        answersList.innerHTML += answerLi;
    }
}
populateAnswersList();

