document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");

    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

});
