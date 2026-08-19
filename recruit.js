/* ==================================================
   NIDMEGENT RECRUIT JS
================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ==================================================
       MOBILE MENU
    ================================================== */

    const menuButton =
        document.querySelector(".recruit-menu");

    const mobileMenu =
        document.querySelector(".recruit-mobile-menu");


    if(menuButton && mobileMenu){

        menuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            const icon =
                menuButton.querySelector("i");


            if(mobileMenu.classList.contains("active")){

                icon.classList.remove(
                    "ri-menu-3-line"
                );

                icon.classList.add(
                    "ri-close-line"
                );

            }else{

                icon.classList.remove(
                    "ri-close-line"
                );

                icon.classList.add(
                    "ri-menu-3-line"
                );

            }

        });


        /* CLOSE MENU */

        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                    const icon =
                        menuButton.querySelector("i");

                    icon.classList.remove(
                        "ri-close-line"
                    );

                    icon.classList.add(
                        "ri-menu-3-line"
                    );

                });

            });

    }


    /* ==================================================
       SCROLL REVEAL
    ================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if("IntersectionObserver" in window){

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if(entry.isIntersecting){

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold:.12,
                    rootMargin:"0px 0px -50px 0px"
                }

            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    }else{

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* ==================================================
       POSITION HOVER
    ================================================== */

    const positions =
        document.querySelectorAll(
            ".position-card"
        );


    positions.forEach(position => {

        position.addEventListener(
            "mouseenter",
            () => {

                position.classList.add(
                    "is-hover"
                );

            }
        );


        position.addEventListener(
            "mouseleave",
            () => {

                position.classList.remove(
                    "is-hover"
                );

            }
        );

    });


    /* ==================================================
       HEADER SCROLL
    ================================================== */

    const header =
        document.querySelector(
            ".recruit-header"
        );


    if(header){

        let lastScroll = 0;


        window.addEventListener(
            "scroll",
            () => {

                const currentScroll =
                    window.scrollY;


                if(currentScroll > 30){

                    header.classList.add(
                        "scrolled"
                    );

                }else{

                    header.classList.remove(
                        "scrolled"
                    );

                }


                lastScroll = currentScroll;

            },
            {
                passive:true
            }
        );

    }


    /* ==================================================
       SMOOTH ANCHOR
    ================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if(
                        !targetId ||
                        targetId === "#"
                    ){
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if(target){

                        event.preventDefault();


                        target.scrollIntoView({

                            behavior:"smooth",

                            block:"start"

                        });

                    }

                }
            );

        });

});
