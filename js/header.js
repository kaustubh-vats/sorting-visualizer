const navSlide = () =>{
    const burger = document.querySelector('.burger');  
    const nav = document.querySelectorAll('.lis');
    const bar = document.querySelector('.nav-links');
    burger.addEventListener('click',()=>{
        bar.classList.toggle('nav-active');
        nav.forEach((link,index) => {
            if(link.style.animation){
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.5}s`;
            }
        });
        burger.classList.toggle('toggle');
    });
}
function selectthis(e, params){
    document.querySelector('.'+params+' button').innerHTML = e.innerHTML+' <i class="fas fa-angle-down"></i>';
    document.querySelector("."+params+" ul").classList.toggle('visible-links');
    document.querySelector("."+params+" ul").classList.toggle('invisible-links');
}
function showDropDown(params){
    document.querySelector("."+params+" ul").classList.toggle('visible-links');
    document.querySelector("."+params+" ul").classList.toggle('invisible-links');
}
navSlide();