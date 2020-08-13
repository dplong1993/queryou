const userImage = document.querySelector(".nav-bar-user-image-outer-container");

userImage.addEventListener('click', () => {
  console.log('clci');
  window.location.href = './profile';
});
