const faqTitles = document.querySelectorAll('.faq__title');
const faqLinks = document.querySelectorAll('.user_FAQ');

var currentLocation = window.location.hash;

faqLinks.forEach((faqLink) => {
  const faqLinkValue = faqLink.hash;
  if(currentLocation === faqLinkValue){
    const anctag = document.querySelector(`a[href="${faqLinkValue}"]`);
    const faqNode = anctag.parentNode.parentNode;
    faqNode.classList.toggle('show');
    const faqText = faqNode.nextElementSibling;
    faqNode.childNodes[3].innerHTML = '-';
    faqText.style.maxHeight = faqText.scrollHeight + 'px';
  }
});

faqTitles.forEach((faqTitle) => {
  faqTitle.addEventListener('click', (event) => {
    const currentlyActiveFaqTitle = document.querySelector('.faq__title.show');
    if (currentlyActiveFaqTitle && currentlyActiveFaqTitle !== faqTitle) {
      currentlyActiveFaqTitle.classList.toggle('show');
      currentlyActiveFaqTitle.nextElementSibling.style.maxHeight = 0;
    }

    faqTitle.classList.toggle('show');
    const faqText = faqTitle.nextElementSibling;
    if (faqTitle.classList.contains('show')) {
      faqTitles.forEach((faqTitle) => {
        faqTitle.childNodes[3].innerHTML = '+';
      });
      faqTitle.childNodes[3].innerHTML = '-';
      faqText.style.maxHeight = faqText.scrollHeight + 'px';
    } else {
      faqText.style.maxHeight = 0;
      faqTitle.childNodes[3].innerHTML = '+';
    }
  });
});
