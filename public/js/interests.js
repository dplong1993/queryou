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
        const topicLabel = document.createElement("label");
        topicLabel.setAttribute("for", topic.name);
        topicContainer.appendChild(topicLabel);
        const topicElement = document.createElement("div");
        topicElement.classList.add("topic-tile");
        topicElement.setAttribute("name", topic.name);
        // const check = document.createElement("input");
        // check.setAttribute("type", "checkbox");
        // check.setAttribute("checked", "unchecked");
        // check.setAttribute("name",topic.name)
        // topicElement.appendChild(check);
        // const checkmark = document.createElement("div");
        // checkmark.classList.add("checkmark");
        // topicElement.appendChild(checkmark);
        const topicTitle = document.createElement("div");
        topicTitle.classList.add("topic-title");
        topicTitle.innerHTML = topic.name;
        topicElement.appendChild(topicTitle);
        const checkbox = document.createElement("input");
        topicContainer.appendChild(topicElement);
    }
});


const enoughTopics = ()=>{
    const checked = document.querySelectorAll(".checkmark");
    let count = 0;
    for (let i = 0; i<checked.length; i++){
        if (checked.classList.contains("checked")){
            count++;
        }
    }
    if(count>=5){
        const button = document.querySelector("button");
        button.classList.remove("disabled")
        button.classList.add("valid");
    }
};
