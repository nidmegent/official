/*==================================================

NIDMEGENT OFFICIAL WEBSITE

==================================================*/


/*==================================================

GSAP

==================================================*/

gsap.registerPlugin(ScrollTrigger);



/*==================================================

LENIS

==================================================*/

const lenis = new Lenis({

    duration:1.2,

    smoothWheel:true,

    touchMultiplier:1.4

});

function raf(time){

    lenis.raf(time);

    requestAnimationFrame(raf);

}

requestAnimationFrame(raf);



lenis.on("scroll",ScrollTrigger.update);



gsap.ticker.add((time)=>{

    lenis.raf(time*1000);

});

gsap.ticker.lagSmoothing(0);



/*==================================================

LOADER

==================================================*/

window.addEventListener("load",()=>{

    const tl = gsap.timeline();

    tl.to(".loader__text",{

        opacity:0,

        y:-40,

        duration:.8,

        ease:"power3.out"

    })

    .to(".loader",{

        opacity:0,

        duration:.7

    })

    .set(".loader",{

        display:"none"

    });

});



/*==================================================

HEADER

==================================================*/

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        header.classList.add("active");

    }

    else{

        header.classList.remove("active");

    }

});



/*==================================================

CUSTOM CURSOR

==================================================*/

const cursor=document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{

    gsap.to(cursor,{

        x:e.clientX,

        y:e.clientY,

        duration:.18,

        ease:"power2.out"

    });

});



document.querySelectorAll("a,button,.team-card,.member-card,.news-card").forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        gsap.to(cursor,{

            scale:2,

            duration:.25

        });

    });

    item.addEventListener("mouseleave",()=>{

        gsap.to(cursor,{

            scale:1,

            duration:.25

        });

    });

});



/*==================================================

HERO INTRO

==================================================*/

const heroTl=gsap.timeline({

    delay:.4

});

heroTl

.from(".hero__eyebrow",{

    y:40,

    opacity:0,

    duration:.8

})

.from(".hero__title",{

    y:80,

    opacity:0,

    duration:1

},"-=.5")

.from(".hero__subtitle",{

    y:60,

    opacity:0,

    duration:1

},"-=.7")

.from(".hero__description",{

    y:40,

    opacity:0,

    duration:.8

},"-=.6")

.from(".hero__buttons",{

    y:30,

    opacity:0,

    duration:.8

},"-=.6")

.from(".hero__bottom",{

    opacity:0,

    y:30,

    duration:.8

},"-=.5");

/*==================================================

SECTION ANIMATION

==================================================*/

gsap.utils.toArray(".section").forEach((section)=>{

    gsap.from(section,{

        opacity:0,

        y:80,

        duration:1,

        ease:"power3.out",

        scrollTrigger:{

            trigger:section,

            start:"top 80%",

            toggleActions:"play none none none"

        }

    });

});


/*==================================================

ABOUT

==================================================*/

gsap.from(".about__background",{

    scale:.6,

    opacity:0,

    duration:1.5,

    ease:"power4.out",

    scrollTrigger:{

        trigger:".about",

        start:"top 70%"

    }

});

gsap.from(".about__title",{

    x:80,

    opacity:0,

    duration:1,

    scrollTrigger:{

        trigger:".about",

        start:"top 70%"

    }

});

gsap.from(".about__text",{

    y:40,

    opacity:0,

    duration:1,

    delay:.2,

    scrollTrigger:{

        trigger:".about",

        start:"top 70%"

    }

});


/*==================================================

VALUE CARDS

==================================================*/

gsap.from(".value-card",{

    y:70,

    opacity:0,

    duration:.8,

    stagger:.15,

    ease:"power3.out",

    scrollTrigger:{

        trigger:".values",

        start:"top 75%"

    }

});


/*==================================================

TEAM CARDS

==================================================*/

gsap.from(".team-card",{

    y:100,

    opacity:0,

    stagger:.18,

    duration:1,

    ease:"power4.out",

    scrollTrigger:{

        trigger:".teams",

        start:"top 75%"

    }

});


/*==================================================

MEMBERS

==================================================*/

gsap.from(".member-card",{

    opacity:0,

    y:70,

    stagger:.18,

    duration:1,

    ease:"power3.out",

    scrollTrigger:{

        trigger:".members",

        start:"top 75%"

    }

});


/*==================================================

STATS

==================================================*/

document.querySelectorAll(".stat-card h2").forEach(stat=>{

    const text=stat.innerText;

    const number=parseInt(text);

    if(isNaN(number)) return;

    gsap.fromTo(stat,

    {

        innerText:0

    },

    {

        innerText:number,

        duration:2,

        ease:"power1.out",

        snap:{innerText:1},

        scrollTrigger:{

            trigger:stat,

            start:"top 85%"

        },

        onUpdate:function(){

            stat.innerHTML=Math.floor(stat.innerText)+"+";

        }

    });

});


/*==================================================

TIMELINE

==================================================*/

gsap.from(".timeline-card",{

    x:-60,

    opacity:0,

    stagger:.25,

    duration:.8,

    ease:"power2.out",

    scrollTrigger:{

        trigger:".results",

        start:"top 75%"

    }

});


/*==================================================

NEWS

==================================================*/

gsap.from(".news-card",{

    y:80,

    opacity:0,

    stagger:.15,

    duration:.9,

    ease:"power3.out",

    scrollTrigger:{

        trigger:".news",

        start:"top 75%"

    }

});


/*==================================================

JOIN

==================================================*/

gsap.from(".join__box",{

    scale:.92,

    opacity:0,

    duration:1,

    ease:"power4.out",

    scrollTrigger:{

        trigger:".join",

        start:"top 75%"

    }

});


/*==================================================

FOOTER

==================================================*/

gsap.from(".footer__top",{

    opacity:0,

    y:60,

    duration:1,

    scrollTrigger:{

        trigger:".footer",

        start:"top 85%"

    }

});

/*==================================================

SWIPER

==================================================*/

const memberSwiper = new Swiper(".memberSwiper",{

    slidesPerView:1.2,

    spaceBetween:30,

    speed:900,

    grabCursor:true,

    loop:true,

    autoplay:{

        delay:3500,

        disableOnInteraction:false

    },

    breakpoints:{

        768:{

            slidesPerView:2

        },

        1200:{

            slidesPerView:3

        }

    }

});


/*==================================================

MOBILE MENU

==================================================*/

const menuBtn = document.querySelector(".menu");
const nav = document.querySelector(".nav");

if(menuBtn && nav){

    menuBtn.addEventListener("click",()=>{

        nav.classList.toggle("show");

        menuBtn.classList.toggle("active");

    });

    document.querySelectorAll(".nav a").forEach(link=>{

        link.addEventListener("click",()=>{

            nav.classList.remove("show");
            menuBtn.classList.remove("active");

        });

    });

}


/*==================================================

ESC CLOSE MENU

==================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        nav.classList.remove("show");
        menuBtn.classList.remove("active");

    }

});


/*==================================================

HERO PARALLAX

==================================================*/

const hero=document.querySelector(".hero");

if(hero){

    hero.addEventListener("mousemove",(e)=>{

        const x=(e.clientX/window.innerWidth-.5)*30;

        const y=(e.clientY/window.innerHeight-.5)*30;

        gsap.to(".hero__gradient",{

            x,

            y,

            duration:1.2,

            ease:"power3.out"

        });

        gsap.to(".hero__video",{

            x:x*.3,

            y:y*.3,

            scale:1.05,

            duration:1.5,

            ease:"power3.out"

        });

    });

}


/*==================================================

SCROLL PROGRESS

==================================================*/

const progress=document.createElement("div");

progress.className="scroll-progress";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

    const scrollTop=window.scrollY;

    const height=document.documentElement.scrollHeight-window.innerHeight;

    const value=(scrollTop/height)*100;

    progress.style.width=value+"%";

});


/*==================================================

ACTIVE NAVIGATION

==================================================*/

const sections=document.querySelectorAll("section[id]");
const navLinks=document.querySelectorAll(".nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;
        const height=section.offsetHeight;

        if(window.scrollY>=top){

            current=section.getAttribute("id");
        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});


/*==================================================

REVEAL ON SCROLL (Fallback)

==================================================*/

const revealElements=document.querySelectorAll(

".team-card,.member-card,.news-card,.value-card"

);

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{

    threshold:.15

});

revealElements.forEach(el=>observer.observe(el));


/*==================================================

WINDOW RESIZE

==================================================*/

window.addEventListener("resize",()=>{

    ScrollTrigger.refresh();

});


/*==================================================

CONSOLE

==================================================*/

console.log("%cNIDMEGENT","font-size:32px;font-weight:bold;color:#2962FF;");
console.log("%cCREATE THE NEXT ERA","font-size:14px;color:#555;");
