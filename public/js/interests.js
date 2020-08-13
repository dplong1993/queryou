import { redirectIfLoggedIn } from './utils/auth.js';
const {Topic} = require("../db/models");

const form = document.querySelector('#signup-form');
const topics = document.querySelector('#topics');

window.addEventListener("DOMContentLoaded", (event)=>{
    const topics = document.getElementById("topics");
    const topics = Topic.findAll();

});
