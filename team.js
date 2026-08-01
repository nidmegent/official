/*==================================================
NIDMEGENT PLAYERS PAGE
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

if(menu){

    menu.addEventListener("click",()=>{

        nav.classList.toggle("active");

    });

}

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

document.querySelectorAll(".fade-up").forEach(el=>{

    observer.observe(el);

});

/*==================================================
GSAP
==================================================*/

if(typeof gsap !== "undefined"){

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".team-hero__eyebrow",{

        y:30,
        opacity:0,
        duration:.8

    });

    gsap.from(".team-hero__title",{

        y:60,
        opacity:0,
        duration:1,
        delay:.2

    });

    gsap.from(".team-hero__subtitle",{

        y:30,
        opacity:0,
        duration:.8,
        delay:.45

    });

    gsap.from(".team-hero__line",{

        width:0,
        duration:.8,
        delay:.7

    });

}

/*==================================================
PLAYER FILTER
==================================================*/

const filterButtons = document.querySelectorAll(".filter-btn");
const playerCards = document.querySelectorAll(".player-card");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        playerCards.forEach(card=>{

            const category = card.dataset.category;

            if(filter==="all" || category===filter){

                card.style.display="flex";

                requestAnimationFrame(()=>{

                    card.classList.remove("hide");

                });

            }else{

                card.classList.add("hide");

                setTimeout(()=>{

                    card.style.display="none";

                },300);

            }

        });

    });

});

/*==================================================
PLAYER CARD ANIMATION
==================================================*/

if(typeof gsap !== "undefined"){

    gsap.utils.toArray(".player-card").forEach((card,index)=>{

        gsap.from(card,{

            opacity:0,

            y:60,

            duration:.8,

            ease:"power3.out",

            delay:index*0.08,

            scrollTrigger:{

                trigger:card,

                start:"top 88%",

                toggleActions:"play none none reverse"

            }

        });

    });

}

/*==================================================
PLAYER GLOW
==================================================*/

document.querySelectorAll(".player-card").forEach(card=>{

    const glow = card.querySelector(".player-glow");

    if(!glow) return;

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        glow.style.left = x + "px";
        glow.style.top = y + "px";

    });

    card.addEventListener("mouseenter",()=>{

        glow.style.opacity="1";

    });

    card.addEventListener("mouseleave",()=>{

        glow.style.opacity="0";

    });

});

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
ACCESSIBILITY
==================================================*/

document.querySelectorAll(".player-card").forEach(card=>{

    card.setAttribute("tabindex","0");

    card.addEventListener("keydown",(e)=>{

        if(e.key === "Enter"){

            const link = card.querySelector("a");

            if(link){

                link.click();

            }

        }

    });

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
PAGE LOAD
==================================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

    setTimeout(()=>{

        if(typeof ScrollTrigger !== "undefined"){

            ScrollTrigger.refresh();

        }

    },300);

});

/*==================================================
PLAYER COUNT
==================================================*/

const count = document.querySelectorAll(".player-card").length;

console.log(

    `%cNIDMEGENT PLAYERS : ${count}`,

    "color:#2962ff;font-size:15px;font-weight:bold;"

);

/*==================================================
READY
==================================================*/

console.log(

`%c
███╗   ██╗██╗██████╗
████╗  ██║██║██╔══██╗
██╔██╗ ██║██║██║  ██║
██║╚██╗██║██║██║  ██║
██║ ╚████║██║██████╔╝
╚═╝  ╚═══╝╚═╝╚═════╝

NIDMEGENT PLAYERS READY
`,

"color:#2962ff;font-weight:bold;"

);

});
