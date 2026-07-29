/*==================================================

NIDMEGENT OFFICIAL WEBSITE

==================================================*/


/*==================================================

GSAP

==================================================*/

gsap.registerPlugin(ScrollTrigger);


/*==================================================

LOADER

==================================================*/

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    const tl = gsap.timeline();

    tl.to(".loader__text", {
        opacity: 0,
        y: -40,
        duration: .8,
        ease: "power3.out"
    })

    .to(loader, {
        opacity: 0,
        duration: .7
    })

    .set(loader, {
        display: "none"
    });

});


/*==================================================

HEADER

==================================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("active");

    } else {

        header.classList.remove("active");

    }

});


/*==================================================

CUSTOM CURSOR

==================================================*/

const cursor = document.querySelector(".cursor");

if (cursor) {

    document.addEventListener("mousemove", (e) => {

        gsap.to(cursor, {

            x: e.clientX,

            y: e.clientY,

            duration: .18,

            ease: "power2.out"

        });

    });

    document.querySelectorAll("a,button,.team-card,.member-card,.news-card").forEach(item => {

        item.addEventListener("mouseenter", () => {

            gsap.to(cursor, {

                scale: 2,

                duration: .25

            });

        });

        item.addEventListener("mouseleave", () => {

            gsap.to(cursor, {

                scale: 1,

                duration: .25

            });

        });

    });

}


/*==================================================

HERO

==================================================*/

if (document.querySelector(".hero")) {

    gsap.timeline({ delay: .4 })

    .from(".hero__eyebrow", {

        y: 40,

        opacity: 0,

        duration: .8

    })

    .from(".hero__title", {

        y: 80,

        opacity: 0,

        duration: 1

    }, "-=.5")

    .from(".hero__subtitle", {

        y: 60,

        opacity: 0,

        duration: 1

    }, "-=.7")

    .from(".hero__description", {

        y: 40,

        opacity: 0,

        duration: .8

    }, "-=.6")

    .from(".hero__buttons", {

        y: 30,

        opacity: 0,

        duration: .8

    }, "-=.6");

}


/*==================================================

SCROLL ANIMATION

==================================================*/

gsap.utils.toArray(".fade-up").forEach(el => {

    gsap.from(el, {

        y: 80,

        opacity: 0,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {

            trigger: el,

            start: "top 85%"

        }

    });

});

gsap.utils.toArray(".fade-left").forEach(el => {

    gsap.from(el, {

        x: -80,

        opacity: 0,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {

            trigger: el,

            start: "top 85%"

        }

    });

});

gsap.utils.toArray(".fade-right").forEach(el => {

    gsap.from(el, {

        x: 80,

        opacity: 0,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {

            trigger: el,

            start: "top 85%"

        }

    });

});


/*==================================================

TEAM CARD

==================================================*/

gsap.from(".team-card", {

    y: 80,

    opacity: 0,

    stagger: .2,

    duration: 1,

    scrollTrigger: {

        trigger: ".teams",

        start: "top 75%"

    }

});


/*==================================================

MEMBER

==================================================*/

if (document.querySelector(".memberSwiper")) {

    new Swiper(".memberSwiper", {

        slidesPerView: 1.2,

        spaceBetween: 30,

        loop: true,

        speed: 900,

        autoplay: {

            delay: 3500,

            disableOnInteraction: false

        },

        breakpoints: {

            768: {

                slidesPerView: 2

            },

            1200: {

                slidesPerView: 3

            }

        }

    });

}


/*==================================================

COUNTER

==================================================*/

document.querySelectorAll(".stat-card h2").forEach(counter => {

    const target = parseInt(counter.dataset.target);

    if (isNaN(target)) return;

    ScrollTrigger.create({

        trigger: counter,

        start: "top 85%",

        once: true,

        onEnter: () => {

            gsap.fromTo(counter,

                { innerText: 0 },

                {

                    innerText: target,

                    duration: 2,

                    snap: { innerText: 1 },

                    onUpdate() {

                        counter.innerText = Math.floor(counter.innerText);

                    }

                }

            );

        }

    });

});


/*==================================================

HERO PARALLAX

==================================================*/

const hero = document.querySelector(".hero");

if (hero) {

    hero.addEventListener("mousemove", (e) => {

        const x = (e.clientX / window.innerWidth - .5) * 20;

        const y = (e.clientY / window.innerHeight - .5) * 20;

        gsap.to(".hero__gradient", {

            x,

            y,

            duration: 1

        });

    });

}


/*==================================================

SCROLL PROGRESS

==================================================*/

const progress = document.createElement("div");

progress.className = "scroll-progress";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const h = document.documentElement.scrollHeight - window.innerHeight;

    const percent = (window.scrollY / h) * 100;

    progress.style.width = percent + "%";

});


/*==================================================

MENU

==================================================*/

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");

if (menu && nav) {

    menu.addEventListener("click", () => {

        menu.classList.toggle("active");

        nav.classList.toggle("show");

    });

}


/*==================================================

REFRESH

==================================================*/

window.addEventListener("resize", () => {

    ScrollTrigger.refresh();

});


console.log("NIDMEGENT WEBSITE READY");

/*==================================================

TEAM 2

==================================================*/

const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".team-card");

filterBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        filterBtns.forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        cards.forEach(card=>{

            if(filter==="all"){

                card.style.display="block";

                return;

            }

            if(card.dataset.category===filter){

                card.style.display="block";

            }else{

                card.style.display="none";

            }

        });

    });

});

/*==============================
TEAM FILTER
==============================*/

const filterButtons = document.querySelectorAll(".filter-btn");
const teamCards = document.querySelectorAll(".team-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // ボタンのアクティブ切り替え
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        teamCards.forEach(card => {

            const category = card.dataset.category;

            if (filter === "all" || category === filter) {

                card.style.display = "block";

                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 30
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4
                    }
                );

            } else {

                card.style.display = "none";

            }

        });

    });

});
