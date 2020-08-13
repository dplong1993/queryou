const userImage = document.querySelector(".nav-bar-user-image-outer-container");

window.addEventListener('DOMContentLoaded', () => {
  console.log(window.location.href);
});

userImage.addEventListener('click', () => {
  window.location.href = './profile';
});
