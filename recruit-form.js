/*==================================================
NIDMEGENT ESPORTS
RECRUIT FORM - EMAILJS
==================================================*/


/*==================================================
EMAILJS SETTINGS
==================================================*/

const EMAILJS_PUBLIC_KEY = "WeWC6-HJ6YzhiZ5Rv";

const EMAILJS_SERVICE_ID = "service_xcdqqfc";

const EMAILJS_TEMPLATE_ID = "template_3em57wc";


/*==================================================
DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
    EMAILJS INIT
    ==================================================*/

    if (typeof emailjs !== "undefined") {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

        console.log(
            "%cEmailJS initialized",
            "color:#2962FF;font-weight:bold;"
        );

    } else {

        console.error("EmailJS is not loaded.");

    }


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
            updateHeader
        );

    }


    /*==================================================
    MOBILE MENU
    ==================================================*/

    const menuButton =
        document.querySelector(".menu");

    const nav =
        document.querySelector(".nav");

    if (menuButton && nav) {

        menuButton.addEventListener(
            "click",
            () => {

                nav.classList.toggle("active");

                const isOpen =
                    nav.classList.contains("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );


        document
            .querySelectorAll(".nav a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove("active");

                    }
                );

            });

    }


    /*==================================================
    FORM
    ==================================================*/

    const form =
        document.querySelector("#contactForm");

    if (form) {

        form.addEventListener(
            "submit",
            handleFormSubmit
        );

    }


    /*==================================================
    CLEAR ERRORS
    ==================================================*/

    document
        .querySelectorAll(
            "#contactForm input, #contactForm select, #contactForm textarea"
        )
        .forEach(field => {

            field.addEventListener(
                "input",
                () => clearFieldError(field)
            );

            field.addEventListener(
                "change",
                () => clearFieldError(field)
            );

        });


    console.log(
        "%cNIDMEGENT RECRUIT PAGE READY",
        "color:#2962FF;font-size:16px;font-weight:800;"
    );

});


/*==================================================
FORM SUBMIT
==================================================*/

async function handleFormSubmit(event) {

    event.preventDefault();

    const form = event.currentTarget;

    const submitButton =
        form.querySelector(".contact-submit");


    if (!submitButton) {
        return;
    }


    /*==================================================
    CLEAR OLD ERRORS
    ==================================================*/

    form
        .querySelectorAll(".form-error, .submit-error, .form-success")
        .forEach(element => {
            element.remove();
        });

    form
        .querySelectorAll(".error")
        .forEach(field => {
            field.classList.remove("error");
        });


    /*==================================================
    GET FIELDS
    ==================================================*/

    const name =
        form.querySelector('[name="name"]');

    const email =
        form.querySelector('[name="email"]');

    const dv =
        form.querySelector('[name="dv"]');

    const xid =
        form.querySelector('[name="xid"]');

    const discoid =
        form.querySelector('[name="discoid"]');

    const sp =
        form.querySelector('[name="sp"]');

    const co =
        form.querySelector('[name="co"]');

    const ar =
        form.querySelector('[name="ar"]');

    const message =
        form.querySelector('[name="message"]');


    let valid = true;


    /*==================================================
    NAME
    ==================================================*/

    if (!name || name.value.trim() === "") {

        if (name) {

            showFieldError(
                name,
                "お名前を入力してください。"
            );

        }

        valid = false;

    }


    /*==================================================
    EMAIL
    ==================================================*/

    if (!email || email.value.trim() === "") {

        if (email) {

            showFieldError(
                email,
                "メールアドレスを入力してください。"
            );

        }

        valid = false;

    } else if (!isValidEmail(email.value.trim())) {

        showFieldError(
            email,
            "正しいメールアドレスを入力してください。"
        );

        valid = false;

    }


    /*==================================================
    DIVISION
    ==================================================*/

    if (!dv || dv.value === "") {

        if (dv) {

            showFieldError(
                dv,
                "希望部門を選択してください。"
            );

        }

        valid = false;

    }


    /*==================================================
    X ID
    ==================================================*/

    if (!xid || xid.value.trim() === "") {

        if (xid) {

            showFieldError(
                xid,
                "X IDを入力してください。"
            );

        }

        valid = false;

    }


    /*==================================================
    DISCORD ID
    ==================================================*/

    if (!discoid || discoid.value.trim() === "") {

        if (discoid) {

            showFieldError(
                discoid,
                "Discord IDを入力してください。"
            );

        }

        valid = false;

    }


    /*==================================================
    STATE / PROVINCE
    ==================================================*/

    if (!sp || sp.value.trim() === "") {

        if (sp) {

            showFieldError(
                sp,
                "お住まいの都道府県を入力してください。"
            );

        }

        valid = false;

    }


    /*==================================================
    CURRENT OCCUPATION
    ==================================================*/

    if (!co || co.value === "") {

        if (co) {

            showFieldError(
                co,
                "現在のご職業を選択してください。"
            );

        }

        valid = false;

    }


    /*==================================================
    ACTIVITY RESULTS
    ==================================================*/

    if (!ar || ar.value.trim() === "") {

        if (ar) {

            showFieldError(
                ar,
                "活動実績を入力してください。"
            );

        }

        valid = false;

    }


    /*==================================================
    SELF PR
    ==================================================*/

    if (!message || message.value.trim() === "") {

        if (message) {

            showFieldError(
                message,
                "自己PRを入力してください。"
            );

        }

        valid = false;

    } else if (message.value.trim().length < 10) {

        showFieldError(
            message,
            "自己PRを10文字以上入力してください。"
        );

        valid = false;

    }


    /*==================================================
    VALIDATION ERROR
    ==================================================*/

    if (!valid) {

        const firstError =
            form.querySelector(".error");

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
    EMAILJS CHECK
    ==================================================*/

    if (typeof emailjs === "undefined") {

        showSubmitError(
            form,
            "メール送信システムを読み込めませんでした。"
        );

        return;

    }


    /*==================================================
    LOADING
    ==================================================*/

    const originalHTML =
        submitButton.innerHTML;

    submitButton.disabled = true;

    submitButton.innerHTML = `
        <span>送信中...</span>
        <i class="ri-loader-4-line"></i>
    `;

    submitButton.classList.add("is-loading");


    /*==================================================
    EMAILJS PARAMETERS
    ==================================================*/

    const templateParams = {

        name:
            name ? name.value.trim() : "",

        email:
            email ? email.value.trim() : "",

        dv:
            dv ? dv.value : "",

        xid:
            xid ? xid.value.trim() : "",

        discoid:
            discoid ? discoid.value.trim() : "",

        sp:
            sp ? sp.value.trim() : "",

        co:
            co ? co.value : "",

        ar:
            ar ? ar.value.trim() : "",

        message:
            message ? message.value.trim() : "",

        time:
            new Date().toLocaleString("ja-JP")

    };


    /*==================================================
    DEBUG
    ==================================================*/

    console.log(
        "EmailJS Template Params:",
        templateParams
    );


    /*==================================================
    SEND
    ==================================================*/

    try {

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );


        console.log(
            "EmailJS Success:",
            response
        );


        /*==================================================
        SUCCESS
        ==================================================*/

        submitButton.classList.remove(
            "is-loading"
        );

        submitButton.innerHTML = `
            <span>送信完了</span>
            <i class="ri-check-line"></i>
        `;


        showSuccessMessage(form);


        /*==================================================
        RESET
        ==================================================*/

        form.reset();


        /*==================================================
        RESTORE BUTTON
        ==================================================*/

        setTimeout(() => {

            submitButton.disabled = false;

            submitButton.innerHTML =
                originalHTML;

        }, 3000);


    } catch (error) {

        console.error(
            "EmailJS Error:",
            error
        );


        /*==================================================
        ERROR
        ==================================================*/

        submitButton.classList.remove(
            "is-loading"
        );

        submitButton.disabled = false;

        submitButton.innerHTML =
            originalHTML;


        showSubmitError(
            form,
            "送信に失敗しました。時間をおいて再度お試しください。"
        );

    }

}


/*==================================================
EMAIL VALIDATION
==================================================*/

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}


/*==================================================
FIELD ERROR
==================================================*/

function showFieldError(
    field,
    message
) {

    field.classList.add("error");

    const error =
        document.createElement("p");

    error.className =
        "form-error";

    error.textContent =
        message;

    field.insertAdjacentElement(
        "afterend",
        error
    );

}


/*==================================================
CLEAR FIELD ERROR
==================================================*/

function clearFieldError(field) {

    field.classList.remove("error");

    const error =
        field.nextElementSibling;

    if (
        error &&
        error.classList.contains("form-error")
    ) {

        error.remove();

    }

}


/*==================================================
SUCCESS
==================================================*/

function showSuccessMessage(form) {

    const success =
        document.createElement("div");

    success.className =
        "form-success";

    success.innerHTML = `

        <div class="form-success__icon">
            <i class="ri-check-line"></i>
        </div>

        <div>

            <strong>
                THANK YOU.
            </strong>

            <p>
                ご応募ありがとうございます。<br>
                内容を確認のうえ、
                担当者よりご連絡いたします。
            </p>

        </div>

    `;


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

    form.appendChild(success);


    setTimeout(() => {

        success.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 100);

}


/*==================================================
SUBMIT ERROR
==================================================*/

function showSubmitError(
    form,
    message
) {

    const old =
        form.querySelector(".submit-error");

    if (old) {
        old.remove();
    }


    const error =
        document.createElement("div");

    error.className =
        "submit-error";

    error.textContent =
        message;

    error.style.marginTop =
        "25px";

    error.style.padding =
        "18px 20px";

    error.style.border =
        "1px solid rgba(255,59,48,.25)";

    error.style.borderRadius =
        "8px";

    error.style.background =
        "rgba(255,59,48,.04)";

    error.style.color =
        "#ff3b30";

    error.style.fontSize =
        ".85rem";

    form.appendChild(error);

}


/*==================================================
WINDOW RESIZE
==================================================*/

window.addEventListener(
    "resize",
    () => {

        const nav =
            document.querySelector(".nav");

        if (
            window.innerWidth > 900 &&
            nav
        ) {

            nav.classList.remove("active");

        }

    }
);


/*==================================================
ESC KEY
==================================================*/

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        const nav =
            document.querySelector(".nav");

        if (nav) {
            nav.classList.remove("active");
        }

    }
);
