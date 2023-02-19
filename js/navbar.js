const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('DOMContentLoaded', (event) => {
  const checkURL = window.location.href;
  const productionURL = 'https://welcome.realdevsquad.com/';
  let userLoginEl = document.getElementById('user-login');
  const clientId =
    checkURL === productionURL
      ? '23c78f66ab7964e5ef97'
      : 'c4a84431feaf604e89d1';
  userLoginEl.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${checkURL}`;
});
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

const signout = () => {
  fetch(`${API_BASE_URL}/auth/signout`, {
    method: 'GET',
    credentials: 'include',
  }).then(() => {
    location.reload();
  });
};

document.getElementById('signout-option').addEventListener('click', () => {
  signout();
});

const myProfileButton = document.getElementById('my-profile');
myProfileButton.addEventListener('click', () => {
  window.location.href = MY_BASE_URL;
});

document.querySelectorAll('.user-greet').forEach((greet) => {
  greet.addEventListener('click', () => {
    document.querySelector('.dropdown').classList.toggle('hide');
  });
});

const dropdownTrigger = document.querySelectorAll('.user-greet');
document.addEventListener('click', (event) => {
  if (
    dropdownTrigger[0] != event.target.parentElement &&
    dropdownTrigger[1] != event.target.parentElement &&
    !document.querySelector('.dropdown').classList.contains('hide')
  ) {
    document.querySelector('.dropdown').classList.add('hide');
  }
});
