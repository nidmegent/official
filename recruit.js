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

    if (menuButton && mobileMenu) {

        const icon =
            menuButton.querySelector("i");

        menuButton.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("active");

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            /* アイコン変更 */

            if (icon) {

                if (isOpen) {

                    icon.classList.remove(
                        "ri-menu-3-line"
                    );

                    icon.classList.add(
                        "ri-close-line"
                    );

                } else {

                    icon.classList.remove(
                        "ri-close-line"
                    );

                    icon.classList.add(
                        "ri-menu-3-line"
                    );

                }

            }

            /* アクセシビリティ */

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* ==================================================
           MOBILE MENU CLOSE
        ================================================== */

        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                    if (icon) {

                        icon.classList.remove(
                            "ri-close-line"
                        );

                        icon.classList.add(
                            "ri-menu-3-line"
                        );

                    }

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

            });

    }


    /* ==================================================
       SCROLL REVEAL
    ================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "show"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }

            );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* ==================================================
       RECRUIT POSITION CARDS
    ================================================== */

    const positionCards =
        document.querySelectorAll(
            ".recruit-position-card"
        );

    if (
        "IntersectionObserver" in window &&
        positionCards.length
    ) {

        const positionObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "show"
                        );

                        positionObserver.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }

            );

        positionCards.forEach(card => {

            positionObserver.observe(card);

        });

    } else {

        positionCards.forEach(card => {

            card.classList.add("show");

        });

    }


    /* ==================================================
       HEADER SCROLL
    ================================================== */

    const header =
        document.querySelector(
            ".recruit-header"
        );

    if (header) {

        const updateHeader =
            () => {

                if (window.scrollY > 30) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

            };

        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );

        /* 初期状態 */

        updateHeader();

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
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* ==================================================
       CURRENT YEAR
       ※ HTMLに .current-year がある場合のみ
    ================================================== */

    document
        .querySelectorAll(".current-year")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });

});
