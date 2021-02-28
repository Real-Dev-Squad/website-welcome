const faqTitles = document.querySelectorAll(".faq__title");
const plusIcon = document.querySelectorAll('.plus-img');
const minusIcon = document.querySelectorAll('.minus-img');

faqTitles.forEach(function (eachBtn) {
  eachBtn.addEventListener('click', function(e) {
    const target = e.currentTarget.childNodes[3].childNodes[1];
    target.classList.toggle('plus-hidden');
    const target2 = e.currentTarget.childNodes[3].childNodes[3];
    target2.classList.toggle('minus-hidden');
  })
})
    const currentlyActiveFaqTitle = document.querySelector(".faq__title.show");
    if (currentlyActiveFaqTitle && currentlyActiveFaqTitle !== faqTitle) {
      currentlyActiveFaqTitle.classList.toggle("show");
      currentlyActiveFaqTitle.nextElementSibling.style.maxHeight = 0;
    }

    faqTitle.classList.toggle("show");
    const faqText = faqTitle.nextElementSibling;
    if (faqTitle.classList.contains("show")) {
      faqText.style.maxHeight = faqText.scrollHeight + "px";
    } else {
      faqText.style.maxHeight = 0;
    }
  });
});
