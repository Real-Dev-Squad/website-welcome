const faqLinks = document.querySelectorAll('.faq_link');
const currentLocation = window.location.hash;

faqLinks.forEach((faqLink) => {
  faqLink.addEventListener('click', (event) => {
    const currentlyActiveFaqLink = document.querySelector('.faq_link.show');
    if (currentlyActiveFaqLink && currentlyActiveFaqLink !== faqLink) {
      currentlyActiveFaqLink.classList.toggle('show');
      currentlyActiveFaqLink.nextElementSibling.style.maxHeight = 0;
    }
    faqLink.classList.toggle('show');
    const faqText = faqLink.nextElementSibling;
    if (faqLink.classList.contains('show')) {
      faqLinks.forEach((faqLink) => {
        faqLink.firstElementChild.lastElementChild.innerHTML = '+';
      });
      faqLink.firstElementChild.lastElementChild.innerHTML = '-';
      faqText.style.maxHeight = faqText.scrollHeight + 'px';
    } else {
      faqText.style.maxHeight = 0;
      faqLink.firstElementChild.lastElementChild.innerHTML = '+';
    }
  });
  const faqLinkValue = faqLink.hash;
  if (currentLocation === faqLinkValue) {
    const ancTag = document.querySelector(`a[href="${faqLinkValue}"]`);
    ancTag.click();
  }
});
