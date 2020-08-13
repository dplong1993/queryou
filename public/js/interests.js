// import {Topic} from "../../db/models/topics.js";


const form = document.querySelector('#signup-form');
const topics = document.querySelector('#topics');

window.addEventListener("DOMContentLoaded", async (event)=>{
    const res = await fetch("/api/interests/interests", {
        method: "GET",
    });
    const data = await res.json();

    const id = data.id;
    const topicData = data.topics;

    const topicContainer = document.getElementById("topics");
    for (let topic of topicData){
        const topicElement = document.createElement("li");
        topicElement.classList.add("topic-tile");
        topicElement.setAttribute("name", topic.name);
        topicElement.innerHTML = topic.name;
        const topicImage = document.createElement("img");
        topicImage.setAttribute("src", "../images/topic.jpg");
        topicImage.classList.add("topic-image");
        topicElement.appendChild(topicImage);
        const checkbox = document.createElement("input");
        topicContainer.appendChild(topicElement);
    }
});
