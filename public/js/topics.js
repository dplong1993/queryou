window.addEventListener("DOMContentLoaded", async (event) => {
    const res = await fetch("/api/interests/interests", {
        method: "GET",
    });
    const data = await res.json();

    const id = data.id;
    const topicData = data.topics;

    const topicContainer = document.getElementById("topics");
    for (let topic of topicData) {
        console.log(typeof topic.id);
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
});
