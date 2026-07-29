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
