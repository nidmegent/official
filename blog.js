/* ==================================================
   NIDMEGENT BLOG
   blog.js
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       HEADER
    ================================================== */

    const header = document.querySelector(".header");

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 40) {

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

    }


    /* ==================================================
       CATEGORY FILTER
    ================================================== */

    const categoryButtons =
        document.querySelectorAll(".blog-category");

    const blogCards =
        document.querySelectorAll(".blog-card");


    if (
        categoryButtons.length > 0 &&
        blogCards.length > 0
    ) {

        categoryButtons.forEach((button) => {

            button.addEventListener("click", () => {

                const filter =
                    button.dataset.filter;


                /* ------------------------------
                   ACTIVE BUTTON
                ------------------------------ */

                categoryButtons.forEach((item) => {

                    item.classList.remove("active");

                });

                button.classList.add("active");


                /* ------------------------------
                   FILTER CARDS
                ------------------------------ */

                blogCards.forEach((card) => {

                    const category =
                        card.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.style.display = "";

                        requestAnimationFrame(() => {

                            card.style.opacity = "1";

                            card.style.transform =
                                "translateY(0)";

                        });

                    } else {

                        card.style.opacity = "0";

                        card.style.transform =
                            "translateY(15px)";

                        setTimeout(() => {

                            card.style.display =
                                "none";

                        }, 300);

                    }

                });

            });

        });

    }


    /* ==================================================
       CARD INITIAL STATE
    ================================================== */

    blogCards.forEach((card) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(25px)";

        card.style.transition =
            "opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1)";

    });


    /* ==================================================
       INTERSECTION OBSERVER
    ================================================== */

    const revealElements =
        document.querySelectorAll(
            ".blog-card, .featured-blog, .blog-intro__grid, .blog-category"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length > 0
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        if (
                            entry.target.classList.contains(
                                "blog-card"
                            )
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                        }


                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    } else {

        /* ------------------------------
           FALLBACK
        ------------------------------ */

        revealElements.forEach((element) => {

            element.classList.add(
                "is-visible"
            );

            if (
                element.classList.contains(
                    "blog-card"
                )
            ) {

                element.style.opacity = "1";

                element.style.transform =
                    "translateY(0)";

            }

        });

    }


    /* ==================================================
       CATEGORY SCROLL
    ================================================== */

    const categoryLink =
        document.querySelector(
            ".blog-all-link"
        );


    if (categoryLink) {

        categoryLink.addEventListener(
            "click",
            (event) => {

                const target =
                    document.querySelector(
                        "#categories"
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

    }


    /* ==================================================
       FEATURED IMAGE
    ================================================== */

    const featuredImage =
        document.querySelector(
            ".featured-blog__image img"
        );


    if (featuredImage) {

        featuredImage.addEventListener(
            "error",
            () => {

                featuredImage.style.opacity =
                    "0";

            }
        );

    }


    /* ==================================================
       BLOG CARD IMAGES
    ================================================== */

    document
        .querySelectorAll(".blog-card__image img")
        .forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    image.style.opacity =
                        "0";

                }
            );

        });


    /* ==================================================
       CATEGORY HOVER
    ================================================== */

    document
        .querySelectorAll(".blog-category")
        .forEach((category) => {

            category.addEventListener(
                "mouseenter",
                () => {

                    category.classList.add(
                        "is-hover"
                    );

                }
            );


            category.addEventListener(
                "mouseleave",
                () => {

                    category.classList.remove(
                        "is-hover"
                    );

                }
            );

        });


    /* ==================================================
       FEATURED HOVER
    ================================================== */

    const featured =
        document.querySelector(
            ".featured-blog"
        );


    if (featured) {

        featured.addEventListener(
            "mouseenter",
            () => {

                featured.classList.add(
                    "is-hover"
                );

            }
        );


        featured.addEventListener(
            "mouseleave",
            () => {

                featured.classList.remove(
                    "is-hover"
                );

            }
        );

    }


    /* ==================================================
       CURRENT PAGE
    ================================================== */

    const currentPath =
        window.location.pathname;


    document
        .querySelectorAll(".nav__list a")
        .forEach((link) => {

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }


            if (
                href === "blog.html" &&
                currentPath.endsWith(
                    "blog.html"
                )
            ) {

                link.classList.add(
                    "current"
                );

            }

        });


    /* ==================================================
       PAGE READY
    ================================================== */

    document.body.classList.add(
        "blog-ready"
    );


    console.log(
        "Nidmegent Blog initialized."
    );

});
