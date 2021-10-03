const faqTitles = document.querySelectorAll('.faq__title');
const faqLinks = document.querySelectorAll('.faq_link');

const currentLocation = window.location.hash;

function showAnswer(faqTitle) {
  faqTitle.classList.toggle('show');
  var faqText = faqTitle.nextElementSibling;
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
}

faqLinks.forEach((faqLink) => {
  const faqLinkValue = faqLink.hash;
  if (currentLocation === faqLinkValue) {
    const ancTag = document.querySelector(`a[href="${faqLinkValue}"]`);
    const faqTitle = ancTag.parentNode.parentNode;
    showAnswer(faqTitle);
  }
});

faqTitles.forEach((faqTitle) => {
  faqTitle.addEventListener('click', (event) => {
    const currentlyActiveFaqTitle = document.querySelector('.faq__title.show');
    if (currentlyActiveFaqTitle && currentlyActiveFaqTitle !== faqTitle) {
      currentlyActiveFaqTitle.classList.toggle('show');
      currentlyActiveFaqTitle.nextElementSibling.style.maxHeight = 0;
    }
    showAnswer(faqTitle);
  });
});
