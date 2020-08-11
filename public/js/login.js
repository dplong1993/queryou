import { redirectIfLoggedIn } from './utils/auth.js';

//Redirect from '/login' to '/' if the user is logged in already
redirectIfLoggedIn();

const form = document.querySelector('#login-form');

form.addEventListener('submit', async (e) => {
  console.log("submitting");
  e.preventDefault();
  const formData = new FormData(form);
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
    return
  }

  window.location.href = '/';
});
