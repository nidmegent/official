/*==================================================
NIDMEGENT NEWS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
    NEWS FILTER
    ==================================================*/

    const filterButtons = document.querySelectorAll(".news-filter__btn");
    const newsCards = document.querySelectorAll(".news-card");

    if (!filterButtons.length || !newsCards.length) {
        console.warn("News filter: buttons or cards not found.");
        return;
    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            /*------------------------------------------
            ACTIVE BUTTON
            ------------------------------------------*/

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            /*------------------------------------------
            GET CATEGORY
            ------------------------------------------*/

            const filter = button.dataset.filter;


            /*------------------------------------------
            FILTER CARDS
            ------------------------------------------*/

            newsCards.forEach(card => {

                const category = card.dataset.category;

                const match =
                    filter === "all" ||
                    category === filter;

                if (match) {

                    card.classList.remove("is-hidden");

                    // 少し遅らせて表示
                    setTimeout(() => {
                        card.classList.add("is-visible");
                    }, 20);

                } else {

                    card.classList.remove("is-visible");
                    card.classList.add("is-hidden");

                }

            });

        });

    });


    /*==================================================
    INITIAL STATE
    ==================================================*/

    newsCards.forEach(card => {

        card.classList.add("is-visible");

    });


    /*==================================================
    FADE UP
    ==================================================*/

    const fadeElements = document.querySelectorAll(".fade-up");

    if (fadeElements.length) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


        fadeElements.forEach(element => {

            observer.observe(element);

        });

    }

});
