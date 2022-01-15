window.addEventListener('DOMContentLoaded', (event) => {
  const productionURL = 'https://welcome.realdevsquad.com/';
  let userLoginEl = document.getElementById('user-login');
  const clientId =
    checkURL === productionURL
      ? '23c78f66ab7964e5ef97'
      : 'c4a84431feaf604e89d1';
  userLoginEl.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
});
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
