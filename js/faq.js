const buttonAndQuestion = document.querySelectorAll('.faq__btn,.question');
const faqs = document.querySelectorAll('.faq');
buttonAndQuestion.forEach( function(btnq){
    btnq.addEventListener('click', function (e) {
        const faq = e.target.closest('.faq');
        faqs.forEach(function (item) {
            if (item !== faq) {
                item.classList.remove('faq--show');
            }
        });
        faq.classList.toggle('faq--show');
    })
   
})
