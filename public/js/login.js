import { redirectIfLoggedIn } from './utils/auth.js';

//Redirect from '/login_signup' to '/' if the user is logged in already
redirectIfLoggedIn();

const form = document.querySelector('#login-form');
const demoForm = document.querySelector("#demo-form");

demoForm.addEventListener('submit', async (e) => {
  console.log("submitting");
  e.preventDefault();
  const formData = new FormData(demoForm);
  console.log(formData);
  const email = formData.get('demo-email');
  const password = formData.get('demo-password');
  const _csrf = formData.get('_csrf');

  const body = { email, password, _csrf };

  const res = await fetch('/api/users/token', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  if(!res.ok){
    const {message} = data;
    const errorsContainer = document.querySelector('#errors-container');
    errorsContainer.innerHTML = message;
    const banner = document.getElementById("banner");
    banner.classList.add("isVisible");
    setTimeout(()=> banner.classList.remove("isVisible"),7000);
    return
  }

  window.location.href = '/home';
});

form.addEventListener('submit', async (e) => {
  console.log("submitting");
  e.preventDefault();
  const formData = new FormData(form);
  console.log(formData);
  const email = formData.get('email');
  const password = formData.get('password');
  const _csrf = formData.get('_csrf');

  const body = { email, password, _csrf };

  const res = await fetch('/api/users/token', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  if(!res.ok){
    const {message} = data;
    const errorsContainer = document.querySelector('#errors-container');
    errorsContainer.innerHTML = message;
    const banner = document.getElementById("banner");
    banner.classList.add("isVisible");
    setTimeout(()=> banner.classList.remove("isVisible"),7000);
    return
  }

  window.location.href = '/home';
});
