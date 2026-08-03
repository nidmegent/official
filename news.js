/*==================================================
NIDMEGENT NEWS PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
    HEADER
    ==================================================*/

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("active");

        } else {

            header.classList.remove("active");

        }

    });

    /*==================================================
    MOBILE MENU
    ==================================================*/

    const menuBtn = document.querySelector(".menu");
    const nav = document.querySelector(".nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

        });

    }

    /*==================================================
    CLOSE MOBILE MENU
    ==================================================*/

    document.querySelectorAll(".nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

        });

    });

    /*==================================================
    FADE UP
    ==================================================*/

    const fadeItems = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    fadeItems.forEach(item => observer.observe(item));

    /*==================================================
    NEWS FILTER
    ==================================================*/

    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".news-item");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const filter = button.dataset.filter;

            items.forEach(item => {

                const category = item.dataset.category;

                if (filter === "all" || category === filter) {

                    item.style.display = "block";

                    setTimeout(() => {

                        item.classList.remove("hide");

                    },20);

                } else {

                    item.classList.add("hide");

                    setTimeout(() => {

                        item.style.display = "none";

                    },300);

                }

            });

        });

    });

        /*==================================================
    GSAP
    ==================================================*/

    if (typeof gsap !== "undefined") {

        gsap.registerPlugin(ScrollTrigger);

        /*==============================
        HERO
        ==============================*/

        gsap.from(".news-hero__eyebrow",{

            opacity:0,
            y:30,
            duration:.8,
            ease:"power3.out"

        });

        gsap.from(".news-hero__title",{

            opacity:0,
            y:70,
            duration:1,
            delay:.15,
            ease:"power4.out"

        });

        gsap.from(".news-hero__text",{

            opacity:0,
            y:30,
            duration:.8,
            delay:.35,
            ease:"power3.out"

        });

        gsap.from(".news-hero__line",{

            width:0,
            duration:.8,
            delay:.55,
            ease:"power2.out"

        });

        /*==============================
        FEATURED CARD
        ==============================*/

        gsap.from(".featured-card",{

            opacity:0,
            y:80,
            duration:1,
            delay:.4,
            ease:"power3.out",

            scrollTrigger:{

                trigger:".featured-card",

                start:"top 80%",

                toggleActions:"play none none reverse"

            }

        });

        /*==============================
        NEWS ITEMS
        ==============================*/

        gsap.utils.toArray(".news-item").forEach((item,index)=>{

            gsap.from(item,{

                opacity:0,
                y:50,

                duration:.8,

                delay:index*.08,

                ease:"power3.out",

                scrollTrigger:{

                    trigger:item,

                    start:"top 90%",

                    toggleActions:"play none none reverse"

                }

            });

        });

        /*==============================
        JOIN BOX
        ==============================*/

        gsap.from(".join-box",{

            opacity:0,

            y:80,

            duration:1,

            ease:"power3.out",

            scrollTrigger:{

                trigger:".join-box",

                start:"top 85%"

            }

        });

    }

        /*==================================================
    SMOOTH SCROLL
    ==================================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            const targetId = this.getAttribute("href");

            if(targetId === "#") return;

            const target = document.querySelector(targetId);

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });

    /*==================================================
    PAGE READY
    ==================================================*/

    window.addEventListener("load",()=>{

        document.body.classList.add("loaded");

        if(typeof ScrollTrigger !== "undefined"){

            ScrollTrigger.refresh();

        }

        console.log(
            "%cNEWS PAGE READY",
            "color:#2962FF;font-size:16px;font-weight:bold;"
        );

    });

    /*==================================================
    WINDOW RESIZE
    ==================================================*/

    window.addEventListener("resize",()=>{

        if(typeof ScrollTrigger !== "undefined"){

            ScrollTrigger.refresh();

        }

    });

    /*==================================================
    PAGE SHOW
    ==================================================*/

    window.addEventListener("pageshow",()=>{

        if(window.scrollY <= 50){

            header.classList.remove("active");

        }

    });

    /*==================================================
    NEWS COUNT
    ==================================================*/

    const newsCount = document.querySelectorAll(".news-item").length;

    console.log(`NEWS : ${newsCount}`);

    /*==================================================
    FILTER COUNT
    ==================================================*/

    document.querySelectorAll(".filter-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            const filter = button.dataset.filter;

            const visibleNews = [...document.querySelectorAll(".news-item")]

                .filter(item=>{

                    return filter==="all" ||

                           item.dataset.category===filter;

                });

            console.log(`${filter} : ${visibleNews.length}`);

        });

    });

    /*==================================================
    ACCESSIBILITY
    ==================================================*/

    document.querySelectorAll(".news-item").forEach(item=>{

        item.setAttribute("tabindex","0");

        item.addEventListener("keydown",(e)=>{

            if(e.key==="Enter"){

                const link = item.querySelector("a");

                if(link){

                    link.click();

                }

            }

        });

    });

});
