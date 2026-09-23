document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");

    if (!header) return;

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

});
