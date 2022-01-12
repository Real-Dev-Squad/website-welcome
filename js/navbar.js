window.addEventListener('DOMContentLoaded', (event) => {
  const checkURL = window.location.href;
  const productionURL = "https://welcome.realdevsquad.com/";
  let userLogin = document.getElementById('user-login');

  if (checkURL === productionURL) {
    userLogin.href = "https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97";
   }
  else {
    userLogin.href = "https://github.com/login/oauth/authorize?client_id=c4a84431feaf604e89d1";
  }
})

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
