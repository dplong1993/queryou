const nav = document.querySelectorAll(".top-nav li");

window.addEventListener("DOMContentLoaded", async (event) => {
    const res = await fetch("/api/home", {
        method: "GET",
    });
    const data = await res.json();
     console.log(data);

    const id = data.id;
    console.log(id);
    const userTopicData = data.userTopics;
    // const TopicData = data.topics;
    // console.log(TopicData);
    const answerData = data.answers;
    const questionData = data.questions;
    const userData = data.userProfile;
    const answerProfile = data.answerProfile;
    console.log(answerData, questionData, userData)

    for (let userTopic of userTopicData) {
        const topicElement = document.createElement("div");
        topicElement.classList.add("topic-container");
        const topicLogo = document.createElement("img");
        topicLogo.setAttribute("src", "../public/images/topic.jpg");
        topicLogo.classList.add("topic-logo");
        topicElement.appendChild(topicLogo);
        const topicName = document.createElement("span");
        topicName.innerHTML = userTopic.Topic.name;
        topicName.classList.add("topic-name");
        topicElement.appendChild(topicName);
        const feed= document.getElementById("feed");
        feed.appendChild(topicElement);
    }

    // for (let topic of TopicData) {
        const tileContainer = document.getElementById("answer-feed");

        const answerTile = document.createElement("div");
        answerTile.classList.add("answer-tile");

        const answerLine = document.createElement("div");
        answerLine.classList.add("answer-line");
        answerLine.innerHTML = "Answer - Recommended for you"
        answerTile.appendChild(answerLine);

        const userProfile = document.createElement("div");
        userProfile.classList.add("user-profile");

        const profileLogo = document.createElement("img");
        profileLogo.setAttribute("src", "../public/images/new-user.png");
        profileLogo.classList.add("profile-logo");
        userProfile.appendChild(profileLogo);

        const name = document.createElement("div");
        name.innerHTML = `${answerProfile.firstName} ${answerProfile.lastName}`;
        name.classList.add("answer-name");
        userProfile.appendChild(name);

        answerTile.appendChild(userProfile);

        const questionTitle = document.createElement("div");
        questionTitle.innerHTML = questionData.content;
        questionTitle.classList.add("question-title");
        answerTile.appendChild(questionTitle);



        const answerContent = document.createElement("div");
        answerContent.innerHTML = answerData.content;
        answerContent.classList.add("answer-content");
        answerTile.appendChild(answerContent);
        tileContainer.appendChild(answerTile);
    // }


    const followForms = document.querySelectorAll(".follow-form");
    for (let followForm of followForms) {
        followForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (event.target.childNodes[2].classList.contains("unfollowed")) {
                const form = event.target;
                const formData = new FormData(form);
                const userId = id;
                const topicId = formData.get('topicId');
                // console.log(userId);
                // console.log(topicId);
                const _csrfElement = document.getElementById("_csrf")
                const _csrf = _csrfElement.getAttribute("content")
                const fetchBody = { userId, topicId, _csrf };
                // console.log(fetchBody);
                const res = await fetch('/api/topics/follow', {
                    method: "POST",
                    body: JSON.stringify(fetchBody),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                event.target.childNodes[2].classList.toggle("unfollowed")
                event.target.childNodes[2].classList.toggle("followed")
                event.target.childNodes[2].childNodes[0].innerHTML = "Follow"
            } else {
                const form = event.target;
                const formData = new FormData(form);
                const userId = id;
                // console.log(userId);
                const topicId = formData.get('topicId');
                // console.log(topicId);
                const _csrfElement = document.getElementById("_csrf")
                const _csrf = _csrfElement.getAttribute("content")
                const fetchBody = { userId, topicId, _csrf };
                // console.log(fetchBody);
                const res = await fetch('/api/topics/follow', {
                    method: "POST",
                    body: JSON.stringify(fetchBody),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                event.target.childNodes[2].classList.toggle("unfollowed")
                event.target.childNodes[2].classList.toggle("followed")
                event.target.childNodes[2].childNodes[0].innerHTML = "Following"
            }
            location.reload();
        })
    }
    const newTopicForm = document.getElementById("create-topic-div");

    const createTopicButton = document.getElementById("create-topic");
    createTopicButton.addEventListener("click", (event)=>{
        const createDiv = document.getElementById("create-topic-div");
        createDiv.classList.remove("hidden");
        const createTopicFormDiv = document.getElementById("create-topic-form-div");
        createTopicFormDiv.classList.remove("hidden");
    });

    // const newTopicFormDiv = document.getElementById("create-topic-form-div");
    // newTopicForm.addEventListener("click", event=>{
    //     event.stopPropagation();
    // });
    const formButton = document.getElementById("create-topic-button");
    formButton.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        // const form = e.target;
        const form = document.querySelector("#create-topic-form")
        const formData = new FormData(form);
        const ownerId = id;
        console.log(ownerId);
        const name = formData.get('name');
        const description = formData.get("description");
        const _csrfElement = document.getElementById("_csrf")
        const _csrf = _csrfElement.getAttribute("content")
        const fetchBody = { ownerId, name, description, _csrf };
        console.log(fetchBody)
        const res = await fetch('/api/topics/new', {
            method: "POST",
            body: JSON.stringify(fetchBody),
            headers: {
                "Content-Type": "application/json",
            }
        });
        window.location.href="/topics";
    });

    newTopicForm.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        newTopicForm.classList.add("hidden");
        const createTopicFormDiv = document.getElementById("create-topic-form-div");
        createTopicFormDiv.classList.add("hidden");
    });
});
