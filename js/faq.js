const faqLinks = document.querySelectorAll('.faq_link');
const currentLocation = window.location.hash;

faqLinks.forEach((faqLink) => {
  faqLink.addEventListener('click', (event) => {
    const currentlyActiveFaqLink = document.querySelector('.faq_link.show');
    const currentlyActiveFaqButton = document.querySelector('.faq-btn.show');

    if (currentlyActiveFaqLink && currentlyActiveFaqLink !== faqLink) {
      currentlyActiveFaqLink.classList.toggle('show');
      currentlyActiveFaqButton.classList.toggle('show');
      currentlyActiveFaqLink.nextElementSibling.style.maxHeight = 0;
    }

    const faqExpandIcon = faqLink.firstElementChild.lastElementChild;

    faqLink.classList.toggle('show');
    faqExpandIcon.classList.toggle('show');
    const faqText = faqLink.nextElementSibling;

    if (
      faqLink.classList.contains('show') &&
      faqExpandIcon.classList.contains('show')
    ) {
      faqText.style.maxHeight = faqText.scrollHeight + 'px';
    } else {
      faqText.style.maxHeight = 0;
    }
  });

  const faqLinkValue = faqLink.hash;

  if (currentLocation === faqLinkValue) {
    const ancTag = document.querySelector(`a[href="${faqLinkValue}"]`);
    ancTag.click();
  }
});
