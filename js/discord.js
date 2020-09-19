const discord = document.querySelectorAll('.category');
const category = document.querySelectorAll('.discord');
discord.forEach( function(btn){
    btn.addEventListener('click', function (e) {
        const faq = e.target.closest('.discord');
        console.log(faq)
        category.forEach(function (item) {
          console.log(item)
            if (item !== faq) {
                item.classList.remove('show');
            }
        });
        faq.classList.toggle('show');
    })
   
})