const headerMenuBtn = document.querySelector('.header__menu-toggle');
const headerMenu = document.querySelector('.header__center');
const headerMobileToggle = document.querySelector('.header__mobile-toggle');
const handleHeaderClick = () => {
  headerMenu.classList.toggle('open-menu');
  headerMenu.classList.toggle('active');
};

window.addEventListener('DOMContentLoaded', () => {
  headerMenuBtn.addEventListener('click', handleHeaderClick);
  headerMobileToggle.addEventListener('click', handleHeaderClick);
});

const hamBurgerBtn = document.querySelector('.hamburger');
const navElementsContainer = document.querySelector('nav.main-nav');

const navSlide = () => {
  navElementsContainer.classList.toggle('active');
};

window.addEventListener('DOMContentLoaded', () => {
  hamBurgerBtn.addEventListener('click', navSlide);
});
