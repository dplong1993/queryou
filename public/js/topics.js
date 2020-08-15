window.addEventListener("DOMContentLoaded", async (event) => {
    const res = await fetch("/api/topics", {
        method: "GET",
    });
    const data = await res.json();
    // console.log(data);
    const id = data.id;
    const userTopicData = data.userTopics;
    console.log(userTopicData);
    for (let userTopic of userTopicData) {
        const topicElement = document.createElement("div");
        //topicElement.setAttribute("onclick", `location.href='/${}';`);
        const topicLogo = document.createElement("img");
        topicLogo.setAttribute("src", "../public/images/topic.jpg");
        topicElement.appendChild(topicLogo);
        const topicName = document.createElement("span");
        topicName.innerHTML = userTopic.Topic.name;
        topicElement.appendChild(topicName);
        const topicsContainer = document.getElementById("your-topics-container");
        topicsContainer.appendChild(topicElement);
    }
});
