window.addEventListener("DOMContentLoaded", async (event) => {
    const res = await fetch("/api/interests/", {
        method: "GET",
    });
    const data = await res.json();

    const id = data.id;
    const topicData = data.topics;

    const topicContainer = document.getElementById("topics");
    for (let topic of topicData) {
        // console.log(typeof topic.id);
        const topicLabel = document.createElement("label");
        topicLabel.setAttribute("for", topic.name);
        topicContainer.appendChild(topicLabel);
        const topicElement = document.createElement("div");
        topicElement.classList.add("topic-tile");
        topicElement.setAttribute("name", topic.name);
        const checkmark = document.createElement("div");
        checkmark.classList.add("checkmark");
        checkmark.classList.add("checkbox");
        checkmark.setAttribute("name", topic.name);
        checkmark.setAttribute("topicid", topic.id);
        topicElement.appendChild(checkmark);
        const topicTitle = document.createElement("div");
        topicTitle.classList.add("topic-title");
        topicTitle.innerHTML = topic.name;
        topicElement.appendChild(topicTitle);
        const checkbox = document.createElement("input");
        topicContainer.appendChild(topicElement);
    }

    const topicTiles = document.querySelectorAll(".topic-tile");
    for (let tile of topicTiles) {
        tile.addEventListener("click", (e) => {
            const checkbox = e.target.querySelector(".checkbox");
            checkbox.classList.toggle("checked");

            enoughTopics();
        })
    }

    document.addEventListener("submit", async (event) => {
        event.preventDefault();
        let requests = [];
        const topicTiles = document.querySelectorAll(".topic-tile .checked");
        // console.log(topicTiles);
        for (let topic of topicTiles) {
            requests.push({ userId: Number(id), topicId: Number(topic.getAttribute("topicid")) });
        }


        const form = document.querySelector('#csrf-form');
        const formData = new FormData(form);
        const _csrf = formData.get('_csrf');

        const fetchBody = { requests, _csrf };

        const res = await fetch('/api/interests', {
            method: "POST",
            body: JSON.stringify(fetchBody),
            headers: {
                "Content-Type": "application/json",
            }
        });
        window.location.href="/home";
    })
});


const enoughTopics = () => {
    const checked = document.querySelectorAll(".checkmark");
    let count = 0;
    for (let i = 0; i < checked.length; i++) {
        if (checked[i].classList.contains("checked")) {
            count++;
        }
    }
    if (count >= 3) {
        const nextButton = document.querySelector(".next");
        nextButton.classList.remove("blocked");
        const moreButton = document.querySelector(".more");
        moreButton.classList.add("blocked");
    } else {
        const nextButton = document.querySelector(".next");
        nextButton.classList.add("blocked");
        const moreButton = document.querySelector(".more");
        moreButton.classList.remove("blocked");
    }
};


function getCsrfValue() {
    const rawDough = document.cookie;
    const cookies = rawDough.split("=");
    const csrfCookieValue = cookies[1].split(";")[0];
    return csrfCookieValue;
};
