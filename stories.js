/* =========================================================
   NID STORIES
   stories.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const hero = document.querySelector(".stories-hero");

    const heroBackground =
        document.querySelector(".stories-hero__background");

    const revealElements = document.querySelectorAll(
        ".stories-intro__grid > div, " +
        ".stories-section-head, " +
        ".featured-story, " +
        ".story-card, " +
        ".difference-box, " +
        ".stories-final .container"
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       HEADER
    ===================================================== */

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 30) {
                header.classList.add("active");
            } else {
                header.classList.remove("active");
            }

        };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

    };


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("active");

            menuButton.classList.toggle(
                "active",
                isOpen
            );

            body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* ---------------------------------------------
           CLOSE MENU WHEN LINK IS CLICKED
        --------------------------------------------- */

        const navLinks =
            nav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuButton.classList.remove("active");

                body.classList.remove("menu-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* ---------------------------------------------
           CLOSE MENU WITH ESC
        --------------------------------------------- */

        document.addEventListener("keydown", event => {

            if (
                event.key === "Escape" &&
                nav.classList.contains("active")
            ) {

                nav.classList.remove("active");

                menuButton.classList.remove("active");

                body.classList.remove("menu-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       HERO INTRO ANIMATION
    ===================================================== */

    if (hero) {

        hero.classList.add("is-ready");

        if (!reduceMotion) {

            requestAnimationFrame(() => {

                setTimeout(() => {

                    hero.classList.add("is-visible");

                }, 120);

            });

        } else {

            hero.classList.add("is-visible");

        }

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if (
        "IntersectionObserver" in window &&
        !reduceMotion
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold:0.12,
                    rootMargin:"0px 0px -70px 0px"
                }
            );


        revealElements.forEach(element => {

            element.classList.add(
                "stories-reveal"
            );

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "is-visible"
            );

        });

    }


    /* =====================================================
       STORY CARD STAGGER
    ===================================================== */

    const storyCards =
        document.querySelectorAll(".story-card");

    storyCards.forEach((card, index) => {

        card.style.setProperty(
            "--story-index",
            index
        );

    });


    /* =====================================================
       FEATURED STORY IMAGE PARALLAX
    ===================================================== */

    const featuredImage =
        document.querySelector(
            ".featured-story__image img"
        );

    if (
        featuredImage &&
        !reduceMotion &&
        window.innerWidth > 768
    ) {

        let ticking = false;

        const updateParallax = () => {

            if (!hero) {
                ticking = false;
                return;
            }

            const rect =
                featuredImage.getBoundingClientRect();

            const windowHeight =
                window.innerHeight;

            if (
                rect.bottom > 0 &&
                rect.top < windowHeight
            ) {

                const progress =
                    (
                        windowHeight - rect.top
                    ) /
                    (
                        windowHeight + rect.height
                    );

                const offset =
                    (progress - 0.5) * 20;

                featuredImage.style.transform =
                    `scale(1.03) translateY(${offset}px)`;

            }

            ticking = false;

        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateParallax
                    );

                    ticking = true;

                }

            },
            { passive:true }
        );

    }


    /* =====================================================
       HERO BACKGROUND PARALLAX
    ===================================================== */

    if (
        heroBackground &&
        !reduceMotion &&
        window.innerWidth > 768
    ) {

        let heroTicking = false;

        const updateHeroParallax = () => {

            const scrollY =
                window.scrollY;

            if (scrollY <= window.innerHeight) {

                const offset =
                    scrollY * 0.12;

                heroBackground.style.transform =
                    `translateY(${offset}px)`;

            }

            heroTicking = false;

        };


        window.addEventListener(
            "scroll",
            () => {

                if (!heroTicking) {

                    window.requestAnimationFrame(
                        updateHeroParallax
                    );

                    heroTicking = true;

                }

            },
            { passive:true }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({

                top:targetPosition,

                behavior:
                    reduceMotion
                        ? "auto"
                        : "smooth"

            });

        });

    });


    /* =====================================================
       STORY CARD HOVER
    ===================================================== */

    if (!reduceMotion) {

        storyCards.forEach(card => {

            const arrow =
                card.querySelector(
                    ".story-card__arrow"
                );

            if (!arrow) {
                return;
            }

            card.addEventListener(
                "mouseenter",
                () => {

                    arrow.style.transform =
                        "translateX(5px)";

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    arrow.style.transform =
                        "translateX(0)";

                }
            );

        });

    }


    /* =====================================================
       FEATURED STORY HOVER
    ===================================================== */

    const featuredStory =
        document.querySelector(
            ".featured-story"
        );

    if (
        featuredStory &&
        !reduceMotion
    ) {

        featuredStory.addEventListener(
            "mouseenter",
            () => {

                featuredStory.classList.add(
                    "story-hover"
                );

            }
        );

        featuredStory.addEventListener(
            "mouseleave",
            () => {

                featuredStory.classList.remove(
                    "story-hover"
                );

            }
        );

    }


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.documentElement.classList.add(
                "stories-loaded"
            );

        }
    );

});
