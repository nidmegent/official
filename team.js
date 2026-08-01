/*==================================================
NIDMEGENT TEAM PAGE
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

    const menu = document.querySelector(".menu");
    const nav = document.querySelector(".nav");

    if (menu && nav) {

        menu.addEventListener("click", () => {

            nav.classList.toggle("active");

        });

    }

    /*==================================================
    PLAYER FILTER
    ==================================================*/

    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".player-card");

    filterBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;

            cards.forEach(card => {

                if (
                    filter === "all" ||
                    card.dataset.category === filter
                ) {

                    card.style.display = "flex";

                    requestAnimationFrame(() => {

                        card.classList.remove("hide");

                    });

                } else {

                    card.classList.add("hide");

                    setTimeout(() => {

                        card.style.display = "none";

                    }, 250);

                }

            });

        });

    });

    /*==================================================
    TEAM RESULT FILTER
    ==================================================*/

    const resultBtns = document.querySelectorAll(".results-btn");
    const resultContents = document.querySelectorAll(".results-content");

    resultBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            resultBtns.forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            const target = btn.dataset.team;

            resultContents.forEach(content => {

                if (
                    target === "all" ||
                    content.dataset.team === target
                ) {

                    content.classList.add("active");

                } else {

                    content.classList.remove("active");

                }

            });

        });

    });

});

/*==================================================
FADE UP
==================================================*/

const fadeItems = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

fadeItems.forEach(item=>observer.observe(item));

/*==================================================
PLAYER CARD GLOW
==================================================*/

document.querySelectorAll(".player-card").forEach(card=>{

    const glow = card.querySelector(".player-glow");

    if(!glow) return;

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        glow.style.left = `${e.clientX-rect.left}px`;

        glow.style.top = `${e.clientY-rect.top}px`;

    });

});

/*==================================================
COUNT UP
==================================================*/

const stats = document.querySelectorAll(".stat-number");

const countObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const el = entry.target;

        const target = parseInt(el.dataset.count);

        let current = 0;

        const speed = target/60;

        const timer = setInterval(()=>{

            current += speed;

            if(current >= target){

                current = target;

                clearInterval(timer);

            }

            el.textContent = Math.floor(current);

        },20);

        countObserver.unobserve(el);

    });

},{
    threshold:.4
});

stats.forEach(stat=>countObserver.observe(stat));

/*==================================================
PLAYER HOVER
==================================================*/

document.querySelectorAll(".player-card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.zIndex="5";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.zIndex="1";

    });

});

/*==================================================
CLOSE MOBILE MENU
==================================================*/

document.querySelectorAll(".nav a").forEach(link=>{

    link.addEventListener("click",()=>{

        const nav=document.querySelector(".nav");

        nav.classList.remove("active");

    });

});

/*==================================================
GSAP ANIMATION
==================================================*/

if (typeof gsap !== "undefined") {

    gsap.registerPlugin(ScrollTrigger);

    /*==================================================
    HERO
    ==================================================*/

    gsap.from(".team-hero__eyebrow", {

        opacity: 0,
        y: 30,
        duration: .8

    });

    gsap.from(".team-hero__title", {

        opacity: 0,
        y: 70,
        duration: 1,
        delay: .15,
        ease: "power3.out"

    });

    gsap.from(".team-hero__subtitle", {

        opacity: 0,
        y: 30,
        duration: .8,
        delay: .35

    });

    gsap.from(".team-hero__line", {

        width: 0,
        duration: .8,
        delay: .6

    });

    /*==================================================
    PLAYER CARD
    ==================================================*/

    gsap.utils.toArray(".player-card").forEach((card, index) => {

        gsap.from(card, {

            opacity: 0,
            y: 70,
            duration: .8,
            delay: index * .05,
            ease: "power3.out",

            scrollTrigger: {

                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse"

            }

        });

    });

    /*==================================================
    RESULT CARD
    ==================================================*/

    gsap.utils.toArray(".results-card").forEach(card => {

        gsap.from(card, {

            opacity: 0,
            y: 50,
            duration: .8,

            scrollTrigger: {

                trigger: card,
                start: "top 85%"

            }

        });

    });

    /*==================================================
    STATS
    ==================================================*/

    gsap.utils.toArray(".stat-card").forEach((card, i) => {

        gsap.from(card, {

            opacity: 0,
            y: 40,
            duration: .6,
            delay: i * .08,

            scrollTrigger: {

                trigger: card,
                start: "top 90%"

            }

        });

    });

    /*==================================================
    HISTORY
    ==================================================*/

    gsap.utils.toArray(".history-item").forEach(item => {

        gsap.from(item, {

            opacity: 0,
            x: -50,
            duration: .8,

            scrollTrigger: {

                trigger: item,
                start: "top 85%"

            }

        });

    });

}

/*==================================================
SMOOTH SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const id = this.getAttribute("href");

        if (id === "#") return;

        const target = document.querySelector(id);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});

/*==================================================
WINDOW RESIZE
==================================================*/

window.addEventListener("resize", () => {

    if (typeof ScrollTrigger !== "undefined") {

        ScrollTrigger.refresh();

    }

});

/*==================================================
PAGE READY
==================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    if (typeof ScrollTrigger !== "undefined") {

        ScrollTrigger.refresh();

    }

    console.log(
        "%cNIDMEGENT TEAM PAGE READY",
        "color:#2962FF;font-size:16px;font-weight:bold;"
    );

});

/*==================================================
PLAYER COUNT
==================================================*/

const playerCount = document.querySelectorAll(".player-card").length;

console.log(`Players Loaded : ${playerCount}`);
