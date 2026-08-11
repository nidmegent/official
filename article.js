/*==================================================
NIDMEGENT ARTICLE JS
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

    const menu = document.querySelector(".menu");

    const nav = document.querySelector(".nav");

    if (menu && nav) {

        menu.addEventListener("click", () => {

            nav.classList.toggle("active");

        });


        document.querySelectorAll(".nav a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

            });

        });

    }



    /*==================================================
    ARTICLE FADE
    ==================================================*/

    const fadeItems = document.querySelectorAll(
        ".article-body > *"
    );


    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("article-visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold:.1
        }

    );


    fadeItems.forEach(item => {

        item.classList.add("article-fade");

        observer.observe(item);

    });



    /*==================================================
    COPY LINK
    ==================================================*/

    const copyButton =
        document.querySelector(".copy-link");


    if (copyButton) {

        copyButton.addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );


                copyButton.innerHTML =
                    '<i class="ri-check-line"></i>';


                setTimeout(() => {

                    copyButton.innerHTML =
                        '<i class="ri-link"></i>';

                }, 1800);


            } catch (error) {

                console.log(
                    "Copy failed:",
                    error
                );

            }

        });

    }



    /*==================================================
    PAGE READY
    ==================================================*/

    document.body.classList.add("article-loaded");


    console.log(
        "%cNIDMEGENT ARTICLE READY",
        "color:#2962FF;font-size:16px;font-weight:bold;"
    );

});
