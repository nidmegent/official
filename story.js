document.addEventListener("DOMContentLoaded", () => {


    /* ==================================================
    REVEAL
    ================================================== */

    const revealTargets = document.querySelectorAll(
        ".story-section, " +
        ".story-question-section__inner, " +
        ".story-profile__body, " +
        ".other-story-card, " +
        ".story-final__inner"
    );


    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold:0.12
        }
    );


    revealTargets.forEach((element) => {

        element.classList.add("story-reveal");

        observer.observe(element);

    });



    /* ==================================================
    PARALLAX COVER
    ================================================== */

    const coverImage = document.querySelector(
        ".story-cover__image img"
    );


    if (coverImage) {

        window.addEventListener("scroll", () => {

            const rect =
                coverImage.getBoundingClientRect();

            const windowHeight =
                window.innerHeight;


            if (
                rect.bottom > 0 &&
                rect.top < windowHeight
            ) {

                const progress =
                    (windowHeight - rect.top) /
                    (windowHeight + rect.height);

                const movement =
                    (progress - 0.5) * 20;

                coverImage.style.transform =
                    `scale(1.04) translateY(${movement}px)`;

            }

        });

    }



    /* ==================================================
    SMOOTH SCROLL
    ================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

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


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            });

        });

});
