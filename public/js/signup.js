import { redirectIfLoggedIn } from './utils/auth.js';

//Redirect from '/signup' to '/' if the user is logged in already
redirectIfLoggedIn();

const form = document.querySelector('#signup-form');
const errorsContainer = document.querySelector('#errors-container');

form.addEventListener('submit', async (e) => {
  console.log("submitting");
  e.preventDefault();
  const formData = new FormData(form);
  const email = formData.get('email');
  const username = formData.get('username');
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const description = formData.get('description');
  const password = formData.get('password');
  const password2 = formData.get('password2');
  const _csrf = formData.get('_csrf');

  const body = { email, username, firstName, lastName, description, password, password2, _csrf };
  errorsContainer.innerHTML = '';

  const res = await fetch('/api/users', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  if(!res.ok){
    const {message, errors} = data;
    // for (let error of errors) {
    //   const errorLi = document.createElement('li');
    //   errorLi.innerHTML = error;
    //   errorsContainer.appendChild(errorLi);
    // }
    const errorLi = document.createElement('li');
    errorLi.innerHTML = errors[0];
    errorsContainer.appendChild(errorLi);
    const banner = document.getElementById("banner");
    banner.classList.add("isVisible");
    setTimeout(()=> banner.classList.remove("isVisible"),7000);
    return
  }

  window.location.href = '/interests';
});
