const faqTitles = document.querySelectorAll('.faq__title');
const faqLinks = document.querySelectorAll('.faq_link');
const currentLocation = window.location.hash;

faqTitles.forEach((faqTitle) => {
  faqTitle.addEventListener('click', (event) => {
    var currentlyActiveFaqTitle = document.querySelector('.faq__title.show');
    console.log(faqTitle);
    console.log(currentlyActiveFaqTitle);
    if (currentlyActiveFaqTitle && currentlyActiveFaqTitle !== faqTitle) {
      currentlyActiveFaqTitle.classList.toggle('show');
      currentlyActiveFaqTitle.parentElement.nextElementSibling.style.maxHeight = 0;
    }

    faqTitle.classList.toggle('show');
    const faqNode = faqTitle.parentNode;
    const faqText = faqNode.nextElementSibling;
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

faqLinks.forEach((faqLink) => {
  const faqLinkValue = faqLink.hash;
  if (currentLocation === faqLinkValue) {
    const ancTag = document.querySelector(`a[href="${faqLinkValue}"]`);
    const faqTitle = ancTag.firstElementChild;
    faqTitle.click();
  }
});
