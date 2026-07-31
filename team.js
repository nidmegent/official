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

    const menuBtn = document.querySelector(".menu");
    const nav = document.querySelector(".nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

        });

    }

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
    PLAYER FILTER
    ==================================================*/

    const buttons = document.querySelectorAll(".filter-btn");

    const cards = document.querySelectorAll(".player-card");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const filter = button.dataset.filter;

            cards.forEach(card => {

                const category = card.dataset.category;

                if (filter === "all" || filter === category) {

                    card.style.display = "flex";

                    setTimeout(() => {

                        card.classList.remove("hide");

                    }, 20);

                } else {

                    card.classList.add("hide");

                    setTimeout(() => {

                        card.style.display = "none";

                    }, 250);

                }

            });

        });

    });

});

/*==================================================
MOUSE GLOW
==================================================*/

const playerCards = document.querySelectorAll(".player-card");

playerCards.forEach(card => {

    const glow = card.querySelector(".player-glow");

    if (!glow) return;

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;

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

    gsap.from(".team-hero__eyebrow", {

        opacity: 0,
        y: 30,
        duration: .8

    });

    gsap.from(".team-hero__title", {

        opacity: 0,
        y: 60,
        duration: 1,
        delay: .15

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

    /*==============================
    PLAYER CARDS
    ==============================*/

    gsap.utils.toArray(".player-card").forEach((card, index) => {

        gsap.from(card, {

            opacity: 0,
            y: 60,
            duration: .8,

            delay: index * .08,

            ease: "power3.out",

            scrollTrigger: {

                trigger: card,

                start: "top 85%",

                toggleActions: "play none none reverse"

            }

        });

    });

}

`/*==================================================
AUTO CLOSE MOBILE MENU
==================================================*/

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (nav.classList.contains("active")) {

            nav.classList.remove("active");

        }

    });

});

/*==================================================
SMOOTH SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (targetId.length > 1) {

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        }

    });

});

/*==================================================
KEYBOARD ACCESSIBILITY
==================================================*/

playerCards.forEach(card => {

    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            const link = card.querySelector(".player-link");

            if (link) link.click();

        }

    });

});

/*==================================================
SCROLL TO TOP EFFECT
==================================================*/

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 120) {

        header.style.transform = "translateY(-100%)";

    } else {

        header.style.transform = "translateY(0)";

    }

    lastScroll = currentScroll;

});

/*==================================================
REFRESH ON RESIZE
==================================================*/

window.addEventListener("resize", () => {

    if (typeof ScrollTrigger !== "undefined") {

        ScrollTrigger.refresh();

    }

});

/*==================================================
SAFE CHECKS
==================================================*/

window.addEventListener("error", (e) => {

    console.warn("TEAM PAGE ERROR:", e.message);

});

/*==================================================
READY
==================================================*/

console.log("%cNIDMEGENT TEAM PAGE READY",
"color:#2962FF;font-size:14px;font-weight:bold;");

document.body.classList.add("page-loaded");`
