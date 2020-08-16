window.addEventListener("DOMContentLoaded", async (event) => {
    const res = await fetch("/api/topics", {
        method: "GET",
    });
    const data = await res.json();
    // console.log(data);

    const id = data.id;
    console.log(id);
    const userTopicData = data.userTopics;
    const TopicData = data.topics;
    console.log(TopicData);
    for (let userTopic of userTopicData) {
        const topicElement = document.createElement("div");
        topicElement.classList.add("topic-container");
        //topicElement.setAttribute("onclick", `location.href='/Topics/${userTopic.Topic.id}';`);
        const topicLogo = document.createElement("img");
        topicLogo.setAttribute("src", "../public/images/topic.jpg");
        topicLogo.classList.add("topic-logo");
        topicElement.appendChild(topicLogo);
        const topicName = document.createElement("span");
        topicName.innerHTML = userTopic.Topic.name;
        topicName.classList.add("topic-name");
        topicElement.appendChild(topicName);
        // if (userTopic.Topic.ownerId === id){
        //     const svgSpan = document.createElement("span");
        //     const div = document.createElement("div");
        //     div.innerHTML = '<svg width="24px" height="24px" viewBox="0 0 24 24"><g class="icon_svg-stroke icon_svg-fill" stroke="#666" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><path d="M12,3.5 C12.7787595,4.66681311 13.7787595,5.50014645 15,6 C16.2212405,6.49985355 17.5545738,6.33318689 19,5.5 L19,14.5 C18.5,15.8883533 17.6666667,17.05502 16.5,18 C15.3333333,18.94498 13.8333333,19.7783134 12,20.5 C10.1666667,19.7783134 8.66666667,18.94498 7.5,18 C6.33333333,17.05502 5.5,15.8883533 5,14.5 L5,5.5 C6.5485527,6.30071432 7.88188603,6.46738099 9,6 C10.118114,5.53261901 11.118114,4.69928568 12,3.5 Z"></path><path d="M5,13.2813717 L19,5.75635132"></path><path d="M7,17.441007 L18.654772,11"></path></g></svg>';
        //     while (div.children.length > 0) {
        //         svgSpan.appendChild(div.children[0]);
        //     }
        // }
        const topicsContainer = document.getElementById("your-topics-container");
        topicsContainer.appendChild(topicElement);
    }

    for (let topic of TopicData) {
        const tileContainer = document.getElementById("discover-topics-container");

        const topicTile = document.createElement("div");
        topicTile.classList.add("topic-tile");

        const topicPreview = document.createElement("div");
        topicPreview.classList.add("topic-preview");
        // const topicBackground = document.createElement("img");
        // topicBackground.setAttribute("src", "../public/images/topic.jpg");
        // topicPreview.appendChild(topicBackground);
        topicTile.appendChild(topicPreview);

        const topicTileLogo = document.createElement("div");
        topicTileLogo.classList.add("topic-tile-logo");
        topicTile.appendChild(topicTileLogo);

        const topicTitle = document.createElement("div");
        topicTitle.innerHTML = topic.name;
        topicTitle.classList.add("topic-title");
        topicTile.appendChild(topicTitle);

        const topicDescription = document.createElement("div");
        topicDescription.innerHTML = topic.description;
        topicDescription.classList.add("topic-description");

        const followForm = document.createElement("form");
        followForm.classList.add("follow-form");

        const userIdInput = document.createElement("input")
        userIdInput.setAttribute("type", "hidden");
        userIdInput.classList.add("hidden-input");
        userIdInput.setAttribute("value", id);
        userIdInput.setAttribute("name", "userId");
        followForm.appendChild(userIdInput);

        const topicIdInput = document.createElement("input");
        topicIdInput.setAttribute("type", "hidden");
        topicIdInput.classList.add("hidden-input");
        topicIdInput.setAttribute("value", topic.id);
        topicIdInput.setAttribute("name", "topicId");
        followForm.appendChild(topicIdInput);

        const followButton = document.createElement("button");
        followButton.setAttribute("type", "submit");
        followButton.classList.add("follow-button");
        //followButton.classList.add("unfollowed");
        followButton.classList.add("followed");

        // const followSVG = document.createElement("svg");

        const followButtonText = document.createElement("div");
        followButtonText.innerHTML = "Follow";
        followButtonText.classList.add("button-text");
        followButton.appendChild(followButtonText);

        const followButtonCount = document.createElement("div");
        followButtonCount.innerHTML = topic.UserTopics.length;
        followButtonCount.classList.add("follow-count");
        followButton.appendChild(followButtonCount);


        followForm.appendChild(followButton);
        topicTile.appendChild(followForm);
        tileContainer.appendChild(topicTile);
    }


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
