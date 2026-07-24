// Header

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

header.classList.toggle(

"active",

window.scrollY>50

);

});

const lenis=new Lenis();

function raf(time){

lenis.raf(time);

requestAnimationFrame(raf);

}

requestAnimationFrame(raf);

gsap.from(".hero-title",{

y:80,

opacity:0,

duration:1.2

});
