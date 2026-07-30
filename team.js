/*==================================================

NIDMEGENT TEAM PAGE

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

        duration: .6

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

HERO ANIMATION

==================================================*/

if(document.querySelector(".team-hero")){

    const tl = gsap.timeline({
        delay:.3
    });

    tl.from(".team-hero__eyebrow",{

        y:40,
        opacity:0,
        duration:.8

    })

    .from(".team-hero__title",{

        y:70,
        opacity:0,
        duration:1

    },"-=0.4")

    .from(".team-hero__subtitle",{

        y:70,
        opacity:0,
        duration:1

    },"-=0.6")

    .from(".team-hero p",{

        y:40,
        opacity:0,
        duration:.8

    },"-=0.6")

    .from(".btn",{

        y:30,
        opacity:0,
        duration:.6

    },"-=0.5");

}


/*==================================================

PARALLAX

==================================================*/

const hero = document.querySelector(".team-hero");

if(hero){

    hero.addEventListener("mousemove",(e)=>{

        const x = (e.clientX / window.innerWidth - .5) * 20;

        const y = (e.clientY / window.innerHeight - .5) * 20;

        gsap.to(".team-hero__gradient",{

            x,

            y,

            duration:1

        });

    });

}


/*==================================================

SCROLL PROGRESS

==================================================*/

const progress = document.createElement("div");

progress.className = "scroll-progress";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

    const total =
        document.documentElement.scrollHeight
        - window.innerHeight;

    const percent =
        (window.scrollY / total) * 100;

    progress.style.width =
        percent + "%";

});


/*==================================================

REFRESH

==================================================*/

window.addEventListener("resize",()=>{

    ScrollTrigger.refresh();

});

console.log("TEAM PAGE READY");

/*==================================================

PLAYER FILTER

==================================================*/

const filterButtons = document.querySelectorAll(".filter-btn");
const playerCards = document.querySelectorAll(".player-card");

if (filterButtons.length && playerCards.length) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Active Button
            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter = button.dataset.filter;

            playerCards.forEach(card => {

                const category = card.dataset.category;

                // 一度消す
                gsap.to(card, {

                    opacity: 0,

                    y: 20,

                    duration: .25,

                    onComplete: () => {

                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            card.style.display = "block";

                            gsap.fromTo(card,

                                {
                                    opacity: 0,
                                    y: 30,
                                    scale: .98
                                },

                                {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    duration: .45,
                                    ease: "power3.out"
                                }

                            );

                        } else {

                            card.style.display = "none";

                        }

                    }

                });

            });

        });

    });

}

/*==================================================

TEAM STATS

==================================================*/

document.querySelectorAll(".stat-box h2").forEach(counter => {

    const target = Number(counter.dataset.target);

    if (!target) return;

    ScrollTrigger.create({

        trigger: counter,

        start: "top 85%",

        once: true,

        onEnter: () => {

            gsap.fromTo(counter,

                {
                    innerText: 0
                },

                {

                    innerText: target,

                    duration: 2,

                    snap: {
                        innerText: 1
                    },

                    ease: "power2.out",

                    onUpdate() {

                        counter.innerText =
                            Math.floor(counter.innerText);

                    }

                }

            );

        }

    });

});

/*==================================================

GALLERY

==================================================*/

gsap.utils.toArray(".gallery-item").forEach((item,index)=>{

    gsap.from(item,{

        opacity:0,

        y:60,

        duration:.8,

        delay:index*0.05,

        ease:"power3.out",

        scrollTrigger:{

            trigger:item,

            start:"top 90%"

        }

    });

});

/*==================================================

SECTION TITLE

==================================================*/

gsap.utils.toArray(".section-title").forEach(title=>{

    gsap.from(title,{

        y:80,

        opacity:0,

        duration:1,

        ease:"power4.out",

        scrollTrigger:{

            trigger:title,

            start:"top 90%"

        }

    });

});

/*==================================================

MAGNET BUTTON

==================================================*/

document.querySelectorAll(".btn").forEach(button=>{

    button.addEventListener("mousemove",e=>{

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width/2;

        const y = e.clientY - rect.top - rect.height/2;

        gsap.to(button,{

            x:x*0.18,

            y:y*0.18,

            duration:.35

        });

    });

    button.addEventListener("mouseleave",()=>{

        gsap.to(button,{

            x:0,

            y:0,

            duration:.35

        });

    });

});

/*==================================================

MOUSE LIGHT

==================================================*/

const light = document.createElement("div");

light.className = "mouse-light";

document.body.appendChild(light);

document.addEventListener("mousemove",e=>{

    gsap.to(light,{

        x:e.clientX,

        y:e.clientY,

        duration:.3,

        ease:"power2.out"

    });

});

/*==================================================

REVEAL

==================================================*/

gsap.utils.toArray(".fade-up").forEach(el=>{

    gsap.from(el,{

        y:70,

        opacity:0,

        duration:1,

        ease:"power3.out",

        scrollTrigger:{

            trigger:el,

            start:"top 85%"

        }

    });

});

/*==================================================

READY

==================================================*/

window.addEventListener("load",()=>{

    ScrollTrigger.refresh();

});

console.log("%cTEAM PAGE READY",
"color:#2962FF;font-size:18px;font-weight:bold;");

/*==================================================

FOOTER

==================================================*/

.footer{

    background:#111;
    color:#ffffff;

    border-top:1px solid var(--line);

}

.footer__top{

    display:grid;

    grid-template-columns:1.3fr 2fr;

    gap:80px;

    padding:90px 0;

}

.footer__brand img{

    height:42px;

    width:auto;

    margin-bottom:20px;

}

.footer__brand p{

    color:var(--text-light);

    max-width:340px;

    line-height:1.8;

}

.footer__menu{

    display:grid;

    grid-template-columns:repeat(3,1fr);

    gap:50px;

}

.footer__menu h4{

    margin-bottom:20px;

    font-size:14px;

    letter-spacing:3px;

    color:var(--blue);

}

.footer__menu a{

    display:block;

    margin-bottom:16px;

    color:var(--text-light);

    transition:var(--transition);

}

.footer__menu a:hover{

    color:var(--blue);

    transform:translateX(5px);

}

.footer__bottom{

    border-top:1px solid var(--line);

    padding:28px 0;

    display:flex;

    justify-content:space-between;

    align-items:center;

    color:var(--text-light);

    font-size:14px;

}
