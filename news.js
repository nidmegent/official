/*==================================================
NIDMEGENT NEWS PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {


    /*==================================================
    HEADER
    ==================================================*/

    const header = document.querySelector(".header");


    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 50) {

                header.classList.add("active");

            } else {

                header.classList.remove("active");

            }

        };


        updateHeader();


        window.addEventListener(
            "scroll",
            updateHeader,
            { passive:true }
        );

    }



    /*==================================================
    MOBILE MENU
    ==================================================*/

    const menuBtn =
        document.querySelector(".menu");

    const nav =
        document.querySelector(".nav");


    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

        });


        /* Close menu */

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

            });

        });

    }



    /*==================================================
    FADE UP
    ==================================================*/

    const fadeItems =
        document.querySelectorAll(".fade-up");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add("show");


                        observer.unobserve(
                            entry.target
                        );

                    });

                },

                {

                    threshold:.12,

                    rootMargin:"0px 0px -50px 0px"

                }

            );


        fadeItems.forEach(item => {

            observer.observe(item);

        });

    } else {

        fadeItems.forEach(item => {

            item.classList.add("show");

        });

    }



    /*==================================================
    NEWS FILTER
    ==================================================*/

    const filterButtons =
        document.querySelectorAll(
            ".news-filter__btn"
        );


    const newsItems =
        document.querySelectorAll(
            ".news-item"
        );


    filterButtons.forEach(button => {


        button.addEventListener("click", () => {


            /* Active button */

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            /* Filter */

            const filter =
                button.dataset.filter;


            newsItems.forEach(item => {


                const category =
                    item.dataset.category;


                const shouldShow =
                    filter === "all" ||
                    category === filter;


                if (shouldShow) {


                    item.style.display = "grid";


                    requestAnimationFrame(() => {

                        item.classList.remove(
                            "hide"
                        );

                    });


                } else {


                    item.classList.add(
                        "hide"
                    );


                    setTimeout(() => {

                        if (
                            item.classList.contains(
                                "hide"
                            )
                        ) {

                            item.style.display =
                                "none";

                        }

                    }, 350);

                }

            });


        });

    });



    /*==================================================
    NEWS ITEM HOVER
    ==================================================*/

    newsItems.forEach(item => {


        item.addEventListener(
            "mouseenter",
            () => {

                item.classList.add(
                    "is-hover"
                );

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                item.classList.remove(
                    "is-hover"
                );

            }
        );

    });



    /*==================================================
    KEYBOARD ACCESSIBILITY
    ==================================================*/

    newsItems.forEach(item => {


        item.setAttribute(
            "tabindex",
            "0"
        );


        item.addEventListener(
            "keydown",
            event => {


                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {


                    event.preventDefault();


                    const link =
                        item.querySelector(
                            ".news-item__link"
                        );


                    if (link) {

                        link.click();

                    }

                }

            }
        );

    });



    /*==================================================
    SMOOTH ANCHOR
    ==================================================*/

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {


            anchor.addEventListener(
                "click",
                function(event) {


                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:"smooth",

                        block:"start"

                    });

                }
            );

        });



    /*==================================================
    NEWS COUNT
    ==================================================*/

    const newsCount =
        newsItems.length;


    console.log(
        `%cNIDMEGENT NEWS: ${newsCount}`,
        "color:#2962FF;font-weight:800;"
    );



    /*==================================================
    FILTER COUNT
    ==================================================*/

    filterButtons.forEach(button => {


        button.addEventListener(
            "click",
            () => {


                const filter =
                    button.dataset.filter;


                const visible =
                    [...newsItems].filter(item => {


                        return (
                            filter === "all" ||
                            item.dataset.category ===
                            filter
                        );

                    });


                console.log(
                    `${filter}: ${visible.length} news`
                );

            }
        );

    });



    /*==================================================
    PAGE READY
    ==================================================*/

    document.body.classList.add(
        "loaded"
    );


    console.log(
        "%cNEWS PAGE READY",
        "color:#2962FF;font-size:16px;font-weight:bold;"
    );

});



/*==================================================
WINDOW RESIZE
==================================================*/

window.addEventListener(
    "resize",
    () => {

        /*

        Reserved for future
        responsive functions.

        */

    }
);



/*==================================================
PAGE SHOW
==================================================*/

window.addEventListener(
    "pageshow",
    () => {


        const header =
            document.querySelector(
                ".header"
            );


        if (!header) {

            return;

        }


        if (window.scrollY <= 50) {

            header.classList.remove(
                "active"
            );

        }

    }
);
