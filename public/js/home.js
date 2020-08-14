//const answer = require("../../db/models/answer");

const nav = document.querySelectorAll(".top-nav li");

const getAnswers = async () => {
    const res = await fetch('/api/answers');
    const data = await res.json();
    return data;
};

const getTopics = async() => {
    const res = await fetch('/api/topics');
    const data = await res.json();
    return data;
}

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
                        ${answer.User.username} · Updated ${timestamp}
                    </div>   
                    <div class="answer-profile">
                        ${answer.User.description}
                    </div>
                    <div class="answer-question">
                        ${answer.Question.content}
                    </div> 
                    <div class="answer-answer">
                        ${answer.content}
                    </div>               
                </div>
                <svg width="24px" height="24px" viewBox="0 0 24 24"><g id="comment" class="comment" stroke="#666" stroke-width="1.5" fill="none" fill-rule="evenodd"><path d="M12.0711496,18.8605911 C16.1739904,18.8605911 19.5,15.7577921 19.5,11.9302955 C19.5,8.102799 16.1739904,5 12.0711496,5 C7.96830883,5 4.64229922,8.102799 4.64229922,11.9302955 C4.64229922,13.221057 5.02055525,14.429401 5.67929998,15.4641215 C5.99817082,15.9649865 4.1279592,18.5219189 4.56718515,18.9310749 C5.02745574,19.3598348 7.80252458,17.6358115 8.37002246,17.9406001 C9.45969688,18.5258363 10.7235179,18.8605911 12.0711496,18.8605911 Z"></path></g></svg>
            </li>
        `
        answersList.innerHTML += answerLi;
    }
}

const populateTopicsList = async () => {
    const topicsList = document.querySelector('.topics-list');
    const { topics } = await getTopics();
    for (let topic of topics) {
        const topicLi = `
            <li>
                <div class = "topic">
                    ${topic.name}
                </div>
            </li>
        `
        topicsList.innerHTML += topicLi;
    }
}

populateAnswersList();
populateTopicsList();