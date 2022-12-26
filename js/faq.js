const faqLinks = document.querySelectorAll('.faq_link');
const currentLocation = window.location.hash;

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
    tabIndexing.forEach((element)=>{
      const previousTabIndex = element.getAttribute("tabindex")
      // console.log(previousTabIndex);
      element.setAttribute("tabindex", previousTabIndex=="1"?"-1":"1")
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
  });

  const faqLinkValue = faqLink.hash;

  if (currentLocation === faqLinkValue) {
    const ancTag = document.querySelector(`a[href="${faqLinkValue}"]`);
    ancTag.click();
  }
  //   faqLink.addEventListener("keyup", (e)=>{
  //   // console.log("space pressed", e.code);
  //   if(e.code==="Space"){
  //     faqLink.classList.add('show');
  //     faqText.style.maxHeight = faqText.scrollHeight + 'px';
      
  //     removeEvent();
  //     // faqLink.classList.remove('show');
  //   }
  //   function removeEvent(){
  //     faqLink.removeEventListener('keyup', e);
  //     faqText.style.maxHeight = 0 + 'px';
  //     // e.preventDefault();
  //     faqLink.classList.remove('show');
  //   }
  // })
});
