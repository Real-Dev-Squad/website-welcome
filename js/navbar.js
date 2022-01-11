const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const checkURL = window.location.href;
const stagingURL = "https://staging-welcome.realdevsquad.com/";
const productionURL = "https://welcome.realdevsquad.com/";

function checkWindowURL() {
  if (checkURL == stagingURL) {
    document.getElementById("user-login").href = "https://github.com/login/oauth/authorize?client_id=c4a84431feaf604e89d1";
  } else if (checkURL == productionURL) {
    document.getElementById("user-login").href = "https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97";
  } else {
    document.getElementById("user-login").href = "https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97";
  }
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
