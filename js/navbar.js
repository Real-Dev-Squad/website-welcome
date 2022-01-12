window.addEventListener('DOMContentLoaded',(event)=>{
  const checkURL = window.location.href;
  const stagingURL = "https://staging-welcome.realdevsquad.com/";
  const productionURL = "https://welcome.realdevsquad.com/";

  if (checkURL == stagingURL) {
    document.getElementById("user-login").href = "https://github.com/login/oauth/authorize?client_id=c4a84431feaf604e89d1";
   }
  else {
    document.getElementById("user-login").href = "https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97";
  }

})

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
