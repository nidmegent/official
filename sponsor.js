/*==================================================
SPONSOR PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
    FADE UP
    ==================================================*/

    const fadeElements =
        document.querySelectorAll(".fade-up");


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if(entry.isIntersecting){

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold:.12
            }

        );


    fadeElements.forEach(element => {

        observer.observe(element);

    });


    /*==================================================
    MOBILE MENU
    ==================================================*/

    const menu =
        document.querySelector(".menu");

    const nav =
        document.querySelector(".nav");


    if(menu && nav){

        menu.addEventListener("click", () => {

            nav.classList.toggle("active");

        });

    }

});
