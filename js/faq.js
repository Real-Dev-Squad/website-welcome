const faqTitles = document.querySelectorAll(".faq__title");

faqTitles.forEach((faqTitle) => {
  faqTitle.addEventListener("click", (event) => {
    const currentlyActiveFaqTitle = document.querySelector(".faq__title.show");
    if (currentlyActiveFaqTitle && currentlyActiveFaqTitle !== faqTitle) {
      currentlyActiveFaqTitle.classList.toggle("show");
      currentlyActiveFaqTitle.nextElementSibling.style.maxHeight = 0;
    }

    faqTitle.classList.toggle("show");
    const faqText = faqTitle.nextElementSibling;
    if (faqTitle.classList.contains("show")) {
      faqTitle.childNodes[3].innerHTML="-";
      faqText.style.maxHeight = faqText.scrollHeight + "px";
    } else {
      faqText.style.maxHeight = 0;
      faqTitle.childNodes[3].innerHTML="+";
    }
  });
});
