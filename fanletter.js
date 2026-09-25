document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("fanLetterForm");

    if (!form) {
        console.error("fanLetterForm が見つかりません");
        return;
    }

    const recipient = document.getElementById("recipient");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const agree = document.getElementById("agree");

    const characterCount = document.getElementById("characterCount");
    const submitButton = document.getElementById("submitButton");
    const formStatus = document.getElementById("formStatus");
    const thankYou = document.getElementById("thankYou");


    /* ================================
       EmailJS
    ================================= */

    const EMAILJS_PUBLIC_KEY = "WeWC6-HJ6YzhiZ5Rv";
    const EMAILJS_SERVICE_ID = "service_xcdqqfc";
    const EMAILJS_TEMPLATE_ID = "template_3em57wc";


    if (typeof emailjs !== "undefined") {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

        console.log("EmailJS initialized");

    } else {

        console.error("EmailJSが読み込まれていません");

    }


    /* ================================
       文字数
    ================================= */

    function updateCharacterCount() {

        if (!characterCount || !message) return;

        characterCount.textContent = message.value.length;

    }

    if (message) {

        message.addEventListener("input", updateCharacterCount);

        updateCharacterCount();

    }


    /* ================================
       ステータス
    ================================= */

    function showStatus(text, type = "") {

        if (!formStatus) return;

        formStatus.textContent = text;

        formStatus.className = "form-status";

        if (type) {

            formStatus.classList.add(type);

        }

    }


    /* ================================
       バリデーション
    ================================= */

    function validateForm() {

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

    }


    /* ================================
       ボタン状態
    ================================= */

    function setLoading(loading) {

        if (!submitButton) return;

        if (loading) {

            submitButton.classList.add("is-loading");

            submitButton.setAttribute(
                "aria-disabled",
                "true"
            );

            submitButton.querySelector("span").textContent =
                "SENDING...";

            submitButton.querySelector("b").textContent =
                "•••";

        } else {

            submitButton.classList.remove("is-loading");

            submitButton.removeAttribute(
                "aria-disabled"
            );

            submitButton.querySelector("span").textContent =
                "SEND YOUR LETTER";

            submitButton.querySelector("b").textContent =
                "→";

        }

    }


    /* ================================
       送信
    ================================= */

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        console.log("FAN LETTER submit");

        if (!validateForm()) {

            return;

        }


        /* EmailJSチェック */

        if (typeof emailjs === "undefined") {

            showStatus(
                "送信システムを読み込めませんでした。時間を置いて再度お試しください。",
                "error"
            );

            console.error(
                "EmailJS is undefined"
            );

            return;

        }


        setLoading(true);

        showStatus(
            "ファンレターを送信しています..."
        );


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


        console.log(
            "Sending:",
            templateParams
        );


        try {

            const result = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );


            console.log(
                "EmailJS success:",
                result
            );


            showStatus(
                "ファンレターを送信しました。",
                "success"
            );


            form.reset();

            updateCharacterCount();


            setTimeout(() => {

                const formSection =
                    document.querySelector(
                        ".fanletter-form-section"
                    );

                if (formSection) {

                    formSection.style.display =
                        "none";

                }


                if (thankYou) {

                    thankYou.classList.add(
                        "is-visible"
                    );

                    thankYou.setAttribute(
                        "aria-hidden",
                        "false"
                    );


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
                "送信に失敗しました。送信設定を確認してください。",
                "error"
            );

        } finally {

            setLoading(false);

        }

    });


    /* ================================
       入力時エラー解除
    ================================= */

    [
        recipient,
        name,
        email,
        message
    ].forEach((element) => {

        if (!element) return;

        element.addEventListener(
            "input",
            () => {

                if (
                    formStatus &&
                    formStatus.classList.contains("error")
                ) {

                    showStatus("");

                }

            }
        );

    });


    if (recipient) {

        recipient.addEventListener(
            "change",
            () => {

                if (
                    formStatus &&
                    formStatus.classList.contains("error")
                ) {

                    showStatus("");

                }

            }
        );

    }


    if (agree) {

        agree.addEventListener(
            "change",
            () => {

                if (
                    formStatus &&
                    formStatus.classList.contains("error")
                ) {

                    showStatus("");

                }

            }
        );

    }


});
