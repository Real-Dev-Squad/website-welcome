const faqButtons = document.querySelectorAll('.faq__btn');
const faqs = document.querySelectorAll('.faq');
faqButtons.forEach( function(btn){
    btn.addEventListener('click', function (e) {
        const faq = e.target.closest('.faq');
        faqs.forEach(function (item) {
            if (item !== faq) {
                item.classList.remove('faq--show');
            }
        });
        faq.classList.toggle('faq--show');
    })
   
})