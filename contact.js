/*==================================================
NIDMEGENT ESPORTS
CONTACT PAGE SCRIPT
==================================================*/


/*==================================================
DOM READY
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

        window.addEventListener("scroll", updateHeader);

    }


    /*==================================================
    MOBILE MENU
    ==================================================*/

    const menuButton = document.querySelector(".menu");
    const nav = document.querySelector(".nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("active");

            const isOpen = nav.classList.contains("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /*==============================
        CLOSE MENU
        ==============================*/

        document.querySelectorAll(".nav a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /*==================================================
    SCROLL FADE
    ==================================================*/

    const fadeItems = document.querySelectorAll(
        ".fade-up, .contact-note, .contact-cta__box"
    );

    if ("IntersectionObserver" in window) {

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
                threshold: 0.12
            }

        );


        fadeItems.forEach(item => {

            observer.observe(item);

        });

    } else {

        fadeItems.forEach(item => {

            item.classList.add("show");

        });

    }


    /*==================================================
    CONTACT FORM
    ==================================================*/

    const form = document.querySelector(".contact-form");

    if (form) {

        form.addEventListener("submit", handleFormSubmit);

    }


    /*==================================================
    INPUT REAL-TIME ERROR CLEAR
    ==================================================*/

    const inputs = document.querySelectorAll(
        ".contact-form input, .contact-form select, .contact-form textarea"
    );

    inputs.forEach(input => {

        input.addEventListener("input", () => {

            clearFieldError(input);

        });

        input.addEventListener("change", () => {

            clearFieldError(input);

        });

    });


    /*==================================================
    SMOOTH SCROLL
    ==================================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {

                return;

            }

            const target = document.querySelector(targetId);

            if (!target) {

                return;

            }

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });


    /*==================================================
    PAGE LOAD
    ==================================================*/

    window.addEventListener("load", () => {

        document.body.classList.add("loaded");

    });


    console.log(
        "%cNIDMEGENT CONTACT PAGE READY",
        "color:#2962FF;font-size:16px;font-weight:800;"
    );

});


/*==================================================
FORM SUBMIT
==================================================*/

function handleFormSubmit(event) {

    event.preventDefault();

    const form = event.currentTarget;

    const submitButton = form.querySelector(".contact-submit");

    if (!submitButton) {

        return;

    }


    /*==================================================
    CLEAR OLD ERRORS
    ==================================================*/

    form.querySelectorAll(".form-error").forEach(error => {

        error.remove();

    });

    form.querySelectorAll(".error").forEach(field => {

        field.classList.remove("error");

    });


    /*==================================================
    GET VALUES
    ==================================================*/

    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const category = form.querySelector('[name="category"]');
    const message = form.querySelector('[name="message"]');


    let isValid = true;


    /*==================================================
    NAME VALIDATION
    ==================================================*/

    if (name) {

        if (name.value.trim() === "") {

            showFieldError(
                name,
                "お名前を入力してください。"
            );

            isValid = false;

        }

    }


    /*==================================================
    EMAIL VALIDATION
    ==================================================*/

    if (email) {

        const emailValue = email.value.trim();

        if (emailValue === "") {

            showFieldError(
                email,
                "メールアドレスを入力してください。"
            );

            isValid = false;

        } else if (!isValidEmail(emailValue)) {

            showFieldError(
                email,
                "正しいメールアドレスを入力してください。"
            );

            isValid = false;

        }

    }


    /*==================================================
    CATEGORY VALIDATION
    ==================================================*/

    if (category) {

        if (category.value === "") {

            showFieldError(
                category,
                "お問い合わせ内容を選択してください。"
            );

            isValid = false;

        }

    }


    /*==================================================
    MESSAGE VALIDATION
    ==================================================*/

    if (message) {

        if (message.value.trim() === "") {

            showFieldError(
                message,
                "お問い合わせ内容を入力してください。"
            );

            isValid = false;

        } else if (message.value.trim().length < 10) {

            showFieldError(
                message,
                "お問い合わせ内容を10文字以上入力してください。"
            );

            isValid = false;

        }

    }


    /*==================================================
    INVALID
    ==================================================*/

    if (!isValid) {

        const firstError = form.querySelector(".error");

        if (firstError) {

            firstError.focus();

            firstError.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }

        return;

    }


    /*==================================================
    SUBMIT LOADING
    ==================================================*/

    const originalHTML = submitButton.innerHTML;

    submitButton.disabled = true;

    submitButton.style.pointerEvents = "none";

    submitButton.innerHTML = `
        <span>送信中...</span>
        <i class="ri-loader-4-line"></i>
    `;


    submitButton.classList.add("is-loading");


    /*==================================================
    DEMO SUBMIT
    ==================================================*/

    setTimeout(() => {

        submitButton.classList.remove("is-loading");

        submitButton.innerHTML = `
            <span>送信完了</span>
            <i class="ri-check-line"></i>
        `;


        /*==============================
        SUCCESS
        ==============================*/

        showSuccessMessage(form);


        /*==============================
        RESET
        ==============================*/

        form.reset();


        /*==============================
        RESTORE BUTTON
        ==============================*/

        setTimeout(() => {

            submitButton.disabled = false;

            submitButton.style.pointerEvents = "";

            submitButton.innerHTML = originalHTML;

        }, 3000);


    }, 1200);

}


/*==================================================
EMAIL VALIDATION
==================================================*/

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


/*==================================================
SHOW FIELD ERROR
==================================================*/

function showFieldError(field, message) {

    if (!field) {

        return;

    }


    field.classList.add("error");


    const error = document.createElement("p");

    error.className = "form-error";

    error.textContent = message;


    field.insertAdjacentElement(
        "afterend",
        error
    );

}


/*==================================================
CLEAR FIELD ERROR
==================================================*/

function clearFieldError(field) {

    if (!field) {

        return;

    }


    field.classList.remove("error");


    const next = field.nextElementSibling;

    if (
        next &&
        next.classList.contains("form-error")
    ) {

        next.remove();

    }

}


/*==================================================
SUCCESS MESSAGE
==================================================*/

function showSuccessMessage(form) {

    /*==================================================
    REMOVE EXISTING MESSAGE
    ==================================================*/

    const oldMessage =
        form.querySelector(".form-success");

    if (oldMessage) {

        oldMessage.remove();

    }


    /*==================================================
    CREATE MESSAGE
    ==================================================*/

    const success = document.createElement("div");

    success.className = "form-success";


    success.innerHTML = `

        <div class="form-success__icon">

            <i class="ri-check-line"></i>

        </div>

        <div>

            <strong>THANK YOU.</strong>

            <p>
                お問い合わせありがとうございます。<br>
                内容を確認のうえ、担当者よりご連絡いたします。
            </p>

        </div>

    `;


    /*==================================================
    STYLE
    ==================================================*/

    success.style.display = "flex";

    success.style.alignItems = "center";

    success.style.gap = "25px";

    success.style.marginTop = "35px";

    success.style.padding = "25px";

    success.style.border =
        "1px solid rgba(41,98,255,.25)";

    success.style.borderRadius = "10px";

    success.style.background =
        "rgba(41,98,255,.04)";

    success.style.opacity = "0";

    success.style.transform =
        "translateY(15px)";


    /*==================================================
    ICON
    ==================================================*/

    const icon = success.querySelector(
        ".form-success__icon"
    );

    icon.style.width = "50px";

    icon.style.height = "50px";

    icon.style.minWidth = "50px";

    icon.style.display = "flex";

    icon.style.alignItems = "center";

    icon.style.justifyContent = "center";

    icon.style.borderRadius = "50%";

    icon.style.background =
        "#2962FF";

    icon.style.color =
        "#fff";

    icon.style.fontSize =
        "1.4rem";


    /*==================================================
    TEXT
    ==================================================*/

    const strong = success.querySelector("strong");

    strong.style.display = "block";

    strong.style.marginBottom = "5px";

    strong.style.fontSize = ".85rem";

    strong.style.letterSpacing = ".15em";


    const paragraph = success.querySelector("p");

    paragraph.style.margin = "0";

    paragraph.style.color = "#777";

    paragraph.style.fontSize = ".85rem";

    paragraph.style.lineHeight = "1.8";


    /*==================================================
    INSERT
    ==================================================*/

    form.appendChild(success);


    /*==================================================
    ANIMATION
    ==================================================*/

    requestAnimationFrame(() => {

        success.style.transition =
            "opacity .5s ease, transform .5s ease";

        success.style.opacity = "1";

        success.style.transform =
            "translateY(0)";

    });


    /*==================================================
    SCROLL
    ==================================================*/

    setTimeout(() => {

        success.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }, 100);

}


/*==================================================
WINDOW RESIZE
==================================================*/

window.addEventListener("resize", () => {

    const nav = document.querySelector(".nav");

    if (
        window.innerWidth > 768 &&
        nav &&
        nav.classList.contains("active")
    ) {

        nav.classList.remove("active");

    }

});


/*==================================================
ESCAPE KEY
==================================================*/

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") {

        return;

    }


    const nav = document.querySelector(".nav");

    if (nav) {

        nav.classList.remove("active");

    }

});


/*==================================================
END
==================================================*/
