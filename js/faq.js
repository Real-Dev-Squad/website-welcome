const faqLinks = document.querySelectorAll('.faq_link');
const currentLocation = window.location.hash;

window.addEventListener("keydown", (e)=>{
  // console.log("event", e);
  if (e.key === " ") { 
console.log(e);
    // e.stopPropagation();  
  } 
  // console.log(e.target.attributes.href.value);
  const ancTag = document.querySelector(`a[href="${e?.target?.attributes?.href?.value}"]`);
  if (e.key === " " && ancTag){
    ancTag?.click();
    e.stopPropagation();
  }
  
  
  // console.log(ancTag);
    
})

const removeForOthers = (target) => {
  faqLinks.forEach((faqLink) => {
    if (faqLink.getAttribute("href") != target.getAttribute("href")) {
      const faqText = faqLink.nextElementSibling;
      const ancTag = faqText.querySelectorAll(`a`);
      // console.log("others: ", ancTag);
      ancTag.forEach((element) => {

        element.setAttribute("tabindex", "-1");
      })
    }
  })
}
    
faqLinks.forEach((faqLink) => {

  const faqText = faqLink.nextElementSibling;
  const faqExpandIcon = faqLink.firstElementChild.lastElementChild;

  faqLink.addEventListener('click', (event) => {

    const tabIndexing = faqLink.nextElementSibling.querySelectorAll('a')
    //  console.log(tabIndexing);
    const currentlyActiveFaqLink = document.querySelector('.faq_link.show');
    const currentlyActiveFaqButton = document.querySelector('.faq-btn.show');


    if (currentlyActiveFaqLink && currentlyActiveFaqLink !== faqLink) {
      currentlyActiveFaqLink.classList.toggle('show');
      currentlyActiveFaqButton.classList.toggle('show');
      currentlyActiveFaqLink.nextElementSibling.style.maxHeight = 0;
    }

    faqLink.classList.toggle('show');
    faqExpandIcon.classList.toggle('show');
    tabIndexing.forEach((element) => {
      const previousTabIndex = element.getAttribute("tabindex")
      // console.log(previousTabIndex);
      element.setAttribute("tabindex", previousTabIndex == "1" ? "-1" : "1")
    })

    if (
      faqLink.classList.contains('show') &&
      faqExpandIcon.classList.contains('show')
    ) {
      faqText.style.maxHeight = faqText.scrollHeight + 'px';
      // faqLists.forEach((element)=>{
      //   element.setAttribute("tabindex","1")
      // })

    } else {
      faqText.style.maxHeight = 0;
    }

    removeForOthers(faqLink);
  });

  const faqLinkValue = faqLink.hash;

  if (currentLocation === faqLinkValue) {
    const ancTag = document.querySelector(`a[href="${faqLinkValue}"]`);
    ancTag.click();
  }

  // faqLink.addEventListener("keyup", (e) => {
  //   if (e.code === "Space" || e.key == 32) {
  //   console.log("space pressed", e.code);
  //     // e.preventDefault();
  //     console.log(e.target);
  //     e.target.classList.toggle('show');
  //     faqText.style.maxHeight = faqText.scrollHeight + 'px';
  //     // removeEvent();
  //     // faqLink.classList.remove('show');
  //   }
  //   // function removeEvent(e){
  //   //   faqLink.removeEventListener('click', e);
  //   //   faqText.style.maxHeight = 0 + 'px';
  //   //   e.preventDefault();
  //   //   faqLink.classList.remove('show');
  //   // }
  // })
});
