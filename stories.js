document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       STORIES PAGE
       ========================================= */

    const header = document.querySelector(".header");

    /* -----------------------------------------
       Header Scroll
       ----------------------------------------- */

    if (header) {
        const updateHeader = () => {
            if (window.scrollY > 40) {
                header.classList.add("active");
            } else {
                header.classList.remove("active");
            }
        };

        updateHeader();
        window.addEventListener("scroll", updateHeader, {
            passive: true
        });
    }


    /* -----------------------------------------
       Scroll Reveal
       ----------------------------------------- */

    const revealItems = document.querySelectorAll(
        ".stories-intro, .story-card, .stories-difference, .stories-final, .stories-section"
    );

    if (revealItems.length) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );

        revealItems.forEach(item => {
            item.classList.add("reveal");
            observer.observe(item);
        });
    }


    /* -----------------------------------------
       Story Card Hover
       ----------------------------------------- */

    const storyCards = document.querySelectorAll(".story-card");

    storyCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("is-hover");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("is-hover");
        });

    });


    /* -----------------------------------------
       Smooth Anchor Scroll
       ----------------------------------------- */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
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

        });

    });


    /* -----------------------------------------
       Story Image Loading
       ----------------------------------------- */

    const storyImages = document.querySelectorAll(
        ".story-card img"
    );

    storyImages.forEach(img => {

        img.addEventListener("load", () => {
            img.classList.add("loaded");
        });

        img.addEventListener("error", () => {
            img.classList.add("image-error");
        });

        if (img.complete) {

            if (img.naturalWidth > 0) {
                img.classList.add("loaded");
            } else {
                img.classList.add("image-error");
            }

        }

    });


    /* -----------------------------------------
       Current Page
       ----------------------------------------- */

    const currentPath =
        window.location.pathname;

    const storyLinks =
        document.querySelectorAll(".story-card a");

    storyLinks.forEach(link => {

        const linkPath =
            new URL(link.href, window.location.origin)
                .pathname;

        if (linkPath === currentPath) {
            link.classList.add("current");
        }

    });

});
