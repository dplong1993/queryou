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

  const body = { email, username, firstName, lastName, description, password, password2 };
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
    for (let error of errors) {
      const errorLi = document.createElement('li');
      errorLi.innerHTML = error;
      errorsContainer.appendChild(errorLi);
    }
    return
  }

  window.location.href = '/';
});
