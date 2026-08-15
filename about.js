^/*==================================================
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

/*==================================================
ABOUT CONTENT
==================================================*/

gsap.utils.toArray(".about-content").forEach(content=>{

    gsap.from(content,{

        opacity:0,

        x:-80,

        duration:1,

        ease:"power3.out",

        scrollTrigger:{

            trigger:content,

            start:"top 80%"

        }

    });

});

gsap.utils.toArray(".about-card").forEach(card=>{

    gsap.from(card,{

        opacity:0,

        x:80,

        duration:1,

        ease:"power3.out",

        scrollTrigger:{

            trigger:card,

            start:"top 82%"

        }

    });

});

/*==================================================
TIMELINE
==================================================*/

gsap.utils.toArray(".timeline-item").forEach((item,index)=>{

    gsap.from(item,{

        opacity:0,

        y:70,

        duration:.9,

        delay:index*.08,

        ease:"power3.out",

        scrollTrigger:{

            trigger:item,

            start:"top 85%"

        }

    });

});

gsap.utils.toArray(".timeline-year").forEach(year=>{

    gsap.from(year,{

        scale:0,

        rotation:180,

        duration:.8,

        ease:"back.out(1.7)",

        scrollTrigger:{

            trigger:year,

            start:"top 85%"

        }

    });

});

/*==================================================
MISSION
==================================================*/

gsap.from(".mission-content",{

    opacity:0,

    x:-80,

    duration:1,

    ease:"power3.out",

    scrollTrigger:{

        trigger:".mission",

        start:"top 80%"

    }

});

gsap.from(".mission-box",{

    opacity:0,

    x:80,

    duration:1,

    delay:.2,

    ease:"power3.out",

    scrollTrigger:{

        trigger:".mission",

        start:"top 80%"

    }

});

/*==================================================
VALUES
==================================================*/

gsap.utils.toArray(".value-card").forEach((card,index)=>{

    gsap.from(card,{

        opacity:0,

        y:80,

        duration:.9,

        delay:index*.12,

        ease:"power3.out",

        scrollTrigger:{

            trigger:card,

            start:"top 85%"

        }

    });

});

/*==================================================
DIVISION
==================================================*/

gsap.utils.toArray(".division-card").forEach((card,index)=>{

    gsap.from(card,{

        opacity:0,

        y:60,

        duration:.9,

        delay:index*.1,

        ease:"power3.out",

        scrollTrigger:{

            trigger:card,

            start:"top 85%"

        }

    });

});

/*==================================================
IN NUMBERS
==================================================*/

gsap.utils.toArray(".number-card").forEach((card,index)=>{

    gsap.from(card,{

        opacity:0,

        y:80,

        duration:.9,

        delay:index*.12,

        ease:"power3.out",

        scrollTrigger:{

            trigger:card,

            start:"top 85%"

        }

    });

});

/*==================================================
COUNT UP
==================================================*/

document.querySelectorAll(".number-card h3").forEach(number=>{

    const text = number.textContent.trim();

    const value = parseInt(text);

    if(isNaN(value)) return;

    gsap.fromTo(number,

        {

            innerText:0

        },

        {

            innerText:value,

            duration:2,

            ease:"power1.out",

            snap:{innerText:1},

            scrollTrigger:{

                trigger:number,

                start:"top 85%"

            },

            onUpdate:function(){

                number.textContent=Math.floor(number.innerText);

            },

            onComplete:function(){

                if(text.includes("+")){

                    number.textContent=value+"+";

                }

            }

        }

    );

});

/*==================================================
PARTNERS
==================================================*/

gsap.utils.toArray(".partner-card").forEach((card,index)=>{

    gsap.from(card,{

        opacity:0,

        scale:.9,

        y:40,

        duration:.8,

        delay:index*.12,

        ease:"power3.out",

        scrollTrigger:{

            trigger:card,

            start:"top 85%"

        }

    });

});

/*==================================================
JOIN SECTION
==================================================*/

gsap.from(".join-box",{

    opacity:0,

    scale:.95,

    y:60,

    duration:1,

    ease:"power3.out",

    scrollTrigger:{

        trigger:".join",

        start:"top 80%"

    }

});

/*==================================================
MOUSE GLOW
==================================================*/

document.querySelectorAll(".value-card,.division-card,.partner-card,.number-card").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        card.style.setProperty("--x",`${x}px`);

        card.style.setProperty("--y",`${y}px`);

    });

});

/*==================================================
PARALLAX TITLE
==================================================*/

gsap.utils.toArray(".section-title").forEach(title=>{

    gsap.to(title,{

        y:-40,

        ease:"none",

        scrollTrigger:{

            trigger:title,

            scrub:true,

            start:"top bottom",

            end:"bottom top"

        }

    });

});

} // GSAP END

/*==================================================
WINDOW RESIZE
==================================================*/

window.addEventListener("resize",()=>{

    if(typeof ScrollTrigger!=="undefined"){

        ScrollTrigger.refresh();

    }

});

/*==================================================
PAGE READY
==================================================*/

window.addEventListener("load",()=>{

    if(typeof ScrollTrigger!=="undefined"){

        ScrollTrigger.refresh();

    }

    document.body.classList.add("loaded");

    console.log(

        "%cABOUT PAGE READY",

        "color:#2962ff;font-size:16px;font-weight:bold;"

    );

});

});

/*==================================================
ACHIEVEMENTS ACCORDION
==================================================*/

document.querySelectorAll(".achievement-header").forEach(header => {

    header.addEventListener("click", () => {

        const item = header.closest(".achievement-item");

        if (!item) return;

        const isActive = item.classList.contains("active");


        /* 他を閉じる */

        document
            .querySelectorAll(".achievement-item")
            .forEach(otherItem => {

                otherItem.classList.remove("active");

            });


        /* 押したものだけ開く */

        if (!isActive) {

            item.classList.add("active");

        }

    });

});
