function mousecursor() {
    const cursor =  document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    const body  = document.querySelector('body');
    const linkCourser = document.querySelectorAll('a');
window.onmousemove = function (e) {

    cursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    cursorInner.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
   // cursor.classList.add('mam');
}

linkCourser.forEach(function (link) {
    link.addEventListener('mouseenter', function (el) {
        console.log(el.currentTarget.innerText);
        cursorInner.classList.add('cursor-hover');
        cursor.classList.add('cursor-hover');
    });
    link.addEventListener('mouseleave', function (el) {
        console.log(el.currentTarget.innerText);
        cursorInner.classList.remove('cursor-hover');
        cursor.classList.remove('cursor-hover');
    })
       
})


}
(function(){
    mousecursor()
}())