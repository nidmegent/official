/*==================================================
NIDMEGENT ABOUT PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

/*==================================================
HEADER
==================================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.classList.add("active");

    }else{

        header.classList.remove("active");

    }

});

/*==================================================
MOBILE MENU
==================================================*/

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");

if(menu && nav){

    menu.addEventListener("click",()=>{

        nav.classList.toggle("active");

    });

}

/*==================================================
CLOSE MENU
==================================================*/

document.querySelectorAll(".nav a").forEach(link=>{

    link.addEventListener("click",()=>{

        nav.classList.remove("active");

    });

});

/*==================================================
FADE UP
==================================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(".fade-up,.fade").forEach(item=>{

    observer.observe(item);

});

/*==================================================
GSAP
==================================================*/

if(typeof gsap !== "undefined"){

    gsap.registerPlugin(ScrollTrigger);
