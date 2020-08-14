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
        const checkmark = document.createElement("div");
        checkmark.classList.add("checkmark");
        checkmark.classList.add("checkbox");
        checkmark.setAttribute("name", topic.name);
        topicElement.appendChild(checkmark);
        const topicTitle = document.createElement("div");
        topicTitle.classList.add("topic-title");
        topicTitle.innerHTML = topic.name;
        topicElement.appendChild(topicTitle);
        const checkbox = document.createElement("input");
        topicContainer.appendChild(topicElement);
    }

    const topicTiles = document.querySelectorAll(".topic-tile");
    console.log(topicTiles);
    for (let tile of topicTiles) {
        tile.addEventListener("click", (e)=>{
            console.log("anything?");
            const checkbox = e.target.querySelector(".checkbox");
            checkbox.classList.toggle("checked");

            enoughTopics();
        })
    }


    document.addEventListener("submit", async (event)=>{

        const body = {userId: id, }
        const res = await fetch('/api/interests', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
          });
    })
});


const enoughTopics = ()=>{
    const checked = document.querySelectorAll(".checkmark");
    let count = 0;
    for (let i = 0; i<checked.length; i++){
        if (checked[i].classList.contains("checked")){
            count++;
        }
    }
    if(count>=3){
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
