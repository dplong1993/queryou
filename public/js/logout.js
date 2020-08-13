const logOutBtn = document.querySelector(".log-out");

logOutBtn.addEventListener('click', async () => {
  const res = await fetch("/api/users/session", {
    method: "DELETE"
  });

  if(res.ok){
    window.location.href = '/login_signup';
  }
});
