/* =========================================================
   NIDMEGENT FAN LETTER
   fanletter.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const form = document.getElementById("fanLetterForm");

    if (!form) return;

    const recipient = document.getElementById("recipient");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const agree = document.getElementById("agree");

    const characterCount = document.getElementById("characterCount");

    const submitButton = document.getElementById("submitButton");

    const formStatus = document.getElementById("formStatus");

    const thankYou = document.getElementById("thankYou");



    /* =====================================================
       EMAILJS SETTINGS
    ===================================================== */

    const EMAILJS_PUBLIC_KEY = "WeWC6-HJ6YzhiZ5Rv";

    const EMAILJS_SERVICE_ID = "service_xcdqqfc";

    const EMAILJS_TEMPLATE_ID = "template_y3czbck";


    /* =====================================================
       EMAILJS INITIALIZE
    ===================================================== */

    if (typeof emailjs !== "undefined") {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

    } else {

        console.error("EmailJS could not be loaded.");

    }



    /* =====================================================
       CHARACTER COUNT
    ===================================================== */

    const updateCharacterCount = () => {

        const length = message.value.length;

        characterCount.textContent = length;

    };


    message.addEventListener(
        "input",
        updateCharacterCount
    );


    updateCharacterCount();



    /* =====================================================
       STATUS
    ===================================================== */

    const showStatus = (text, type = "") => {

        formStatus.textContent = text;

        formStatus.className = "form-status";

        if (type) {
            formStatus.classList.add(type);
        }

    };


    /* =====================================================
       VALIDATION
    ===================================================== */

    const validateForm = () => {

        showStatus("");


        if (!recipient.value) {

            showStatus(
                "送信先を選択してください。",
                "error"
            );

            recipient.focus();

            return false;
        }


        if (!name.value.trim()) {

            showStatus(
                "お名前を入力してください。",
                "error"
            );

            name.focus();

            return false;
        }


        if (!email.value.trim()) {

            showStatus(
                "メールアドレスを入力してください。",
                "error"
            );

            email.focus();

            return false;
        }


        /* Email format */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email.value.trim())) {

            showStatus(
                "正しいメールアドレスを入力してください。",
                "error"
            );

            email.focus();

            return false;
        }


        if (!message.value.trim()) {

            showStatus(
                "ファンレターを入力してください。",
                "error"
            );

            message.focus();

            return false;
        }


        if (message.value.trim().length < 5) {

            showStatus(
                "ファンレターは5文字以上で入力してください。",
                "error"
            );

            message.focus();

            return false;
        }


        if (message.value.length > 2000) {

            showStatus(
                "ファンレターは2000文字以内で入力してください。",
                "error"
            );

            message.focus();

            return false;
        }


        if (!agree.checked) {

            showStatus(
                "注意事項を確認してください。",
                "error"
            );

            agree.focus();

            return false;
        }


        return true;

    };



    /* =====================================================
       LOADING STATE
    ===================================================== */

    const setLoading = (loading) => {

        submitButton.disabled = loading;


        if (loading) {

            submitButton.querySelector("span").textContent =
                "SENDING...";

            submitButton.querySelector("b").textContent =
                "•••";

        } else {

            submitButton.querySelector("span").textContent =
                "SEND YOUR LETTER";

            submitButton.querySelector("b").textContent =
                "→";

        }

    };



    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        /* Validate */

        if (!validateForm()) {
            return;
        }


        /* Check EmailJS */

        if (typeof emailjs === "undefined") {

            showStatus(
                "送信システムを読み込めませんでした。時間を置いて再度お試しください。",
                "error"
            );

            return;
        }


        /* Loading */

        setLoading(true);

        showStatus(
            "ファンレターを送信しています..."
        );


        /* =================================================
           TEMPLATE PARAMETERS
        ================================================= */

        const templateParams = {

            recipient:
                recipient.value.trim(),

            name:
                name.value.trim(),

            email:
                email.value.trim(),

            message:
                message.value.trim(),

            time:
                new Date().toLocaleString(
                    "ja-JP",
                    {
                        timeZone: "Asia/Tokyo"
                    }
                ),

            form_type:
                "FAN LETTER"

        };


        try {

            /* =============================================
               SEND
            ============================================= */

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );


            /* =============================================
               SUCCESS
            ============================================= */

            showStatus(
                "ファンレターを送信しました。",
                "success"
            );


            form.reset();

            updateCharacterCount();


            /* =============================================
               SHOW THANK YOU
            ============================================= */

            setTimeout(() => {

                const formSection =
                    document.querySelector(
                        ".fanletter-form-section"
                    );


                if (formSection) {

                    formSection.style.display = "none";

                }


                if (thankYou) {

                    thankYou.classList.add(
                        "is-visible"
                    );

                    thankYou.setAttribute(
                        "aria-hidden",
                        "false"
                    );


                    /* Scroll */

                    setTimeout(() => {

                        thankYou.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 100);

                }

            }, 700);


        } catch (error) {

            console.error(
                "FAN LETTER SEND ERROR:",
                error
            );


            showStatus(
                "送信に失敗しました。時間を置いてもう一度お試しください。",
                "error"
            );

        } finally {

            setLoading(false);

        }

    });



    /* =====================================================
       INPUT ERROR CLEAR
    ===================================================== */

    [
        recipient,
        name,
        email,
        message
    ].forEach((element) => {

        element.addEventListener(
            "input",
            () => {

                if (
                    formStatus.classList.contains(
                        "error"
                    )
                ) {

                    showStatus("");

                }

            }
        );

    });


    recipient.addEventListener(
        "change",
        () => {

            if (
                formStatus.classList.contains(
                    "error"
                )
            ) {

                showStatus("");

            }

        }
    );


    agree.addEventListener(
        "change",
        () => {

            if (
                formStatus.classList.contains(
                    "error"
                )
            ) {

                showStatus("");

            }

        }
    );


});
