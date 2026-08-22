/* ==================================================
   NIDMEGENT ESPORTS
   GLOBAL SCRIPT
================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ==================================================
       MOBILE MENU
    ================================================== */

    const menuButton = document.querySelector(".menu");
    const mobileMenu = document.querySelector(".mobile-menu");


    if (menuButton && mobileMenu) {


        /* ==================================================
           MENU TOGGLE
        ================================================== */

        menuButton.addEventListener("click", () => {

            const isOpen =
                menuButton.classList.toggle("active");

            mobileMenu.classList.toggle(
                "active",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* ==================================================
           CLOSE MENU WHEN LINK IS CLICKED
        ================================================== */

        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                closeMobileMenu();

            });

        });


        /* ==================================================
           ESC KEY
        ================================================== */

        document.addEventListener("keydown", event => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("active")
            ) {

                closeMobileMenu();

            }

        });


        /* ==================================================
           CLOSE FUNCTION
        ================================================== */

        function closeMobileMenu() {

            menuButton.classList.remove("active");

            mobileMenu.classList.remove("active");

            document.body.classList.remove("menu-open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* ==================================================
           RESIZE
        ================================================== */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {

                closeMobileMenu();

            }

        });

    }



    /* ==================================================
       HEADER SCROLL
================================================== */

    const header =
        document.querySelector(".header");


    if (header) {

        let lastScroll = 0;


        window.addEventListener(
            "scroll",
            () => {

                const currentScroll =
                    window.scrollY;


                if (currentScroll > 50) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }


                lastScroll = currentScroll;

            },
            { passive: true }
        );

    }



    /* ==================================================
       FADE / REVEAL ANIMATION
================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .fade-up"
        );


    if (revealElements.length) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

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
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    }



    /* ==================================================
       SMOOTH SCROLL
================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


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


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });



    /* ==================================================
       ACTIVE NAV
================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const navLinks =
        document.querySelectorAll(
            ".nav a"
        );


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        const linkPage =
            href.split("#")[0];


        if (
            linkPage &&
            linkPage === currentPage
        ) {

            link.classList.add("active");

        }

    });



});
