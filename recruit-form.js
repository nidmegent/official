/*==================================================
NIDMEGENT ESPORTS
RECRUIT FORM
EMAILJS
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

    console.log("RECRUIT FORM JS LOADED");


    /*==================================================
    EMAILJS INIT
    ==================================================*/

    if (typeof emailjs === "undefined") {

        console.error("EmailJS is not loaded.");

        return;

    }

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

    console.log("EmailJS initialized");


    /*==================================================
    FORM
    ==================================================*/

    const form = document.getElementById("contactForm");

    if (!form) {

        console.error("contactForm not found.");

        return;

    }


    /*==================================================
    SUBMIT
    ==================================================*/

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        console.log("FORM SUBMIT START");


        /*==================================================
        BUTTON
        ==================================================*/

        const button =
            form.querySelector(".contact-submit");


        if (!button) {

            console.error("Submit button not found.");

            return;

        }


        /*==================================================
        VALIDATION
        ==================================================*/

        if (!form.checkValidity()) {

            form.reportValidity();

            return;

        }


        /*==================================================
        ORIGINAL BUTTON
        ==================================================*/

        const originalHTML =
            button.innerHTML;


        button.disabled = true;

        button.innerHTML = `
            <span>送信中...</span>
            <i class="ri-loader-4-line"></i>
        `;


        button.classList.add("is-loading");


        /*==================================================
        GET FORM VALUES
        ==================================================*/

        const name =
            document.getElementById("name")?.value.trim() || "";

        const email =
            document.getElementById("email")?.value.trim() || "";

        const dv =
            document.getElementById("dv")?.value || "";

        const xid =
            document.getElementById("xid")?.value.trim() || "";

        const discoid =
            document.getElementById("discoid")?.value.trim() || "";

        const sp =
            document.getElementById("sp")?.value.trim() || "";

        const co =
            document.getElementById("co")?.value || "";

        const ar =
            document.getElementById("ar")?.value.trim() || "";

        const message =
            document.getElementById("message")?.value.trim() || "";


        /*==================================================
        EMAILJS PARAMS
        ==================================================*/

        const templateParams = {

            name: name,

            email: email,

            dv: dv,

            xid: xid,

            discoid: discoid,

            sp: sp,

            co: co,

            ar: ar,

            message: message,

            time: new Date().toLocaleString("ja-JP")

        };


        /*==================================================
        DEBUG
        ==================================================*/

        console.log(
            "Sending EmailJS:",
            templateParams
        );


        /*==================================================
        SEND
        ==================================================*/

        try {

            const result = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );


            console.log(
                "EmailJS SUCCESS:",
                result
            );


            /*==================================================
            SUCCESS
            ==================================================*/

            button.classList.remove(
                "is-loading"
            );

            button.innerHTML = `
                <span>送信完了</span>
                <i class="ri-check-line"></i>
            `;


            /*==================================================
            SUCCESS MESSAGE
            ==================================================*/

            const success =
                document.createElement("div");


            success.className =
                "form-success";


            success.innerHTML = `
                <div class="form-success__icon">
                    <i class="ri-check-line"></i>
                </div>

                <div>
                    <strong>THANK YOU.</strong>

                    <p>
                        ご応募ありがとうございます。<br>
                        内容を確認のうえ、
                        担当者よりご連絡いたします。
                    </p>
                </div>
            `;


            form.appendChild(success);


            /*==================================================
            RESET
            ==================================================*/

            form.reset();


            /*==================================================
            RESTORE
            ==================================================*/

            setTimeout(() => {

                button.disabled = false;

                button.classList.remove(
                    "is-loading"
                );

                button.innerHTML =
                    originalHTML;

            }, 3000);


        } catch (error) {

            console.error(
                "EmailJS ERROR:",
                error
            );


            /*==================================================
            ERROR
            ==================================================*/

            button.disabled = false;

            button.classList.remove(
                "is-loading"
            );

            button.innerHTML =
                originalHTML;


            const oldError =
                form.querySelector(".submit-error");


            if (oldError) {
                oldError.remove();
            }


            const errorBox =
                document.createElement("div");


            errorBox.className =
                "submit-error";


            errorBox.innerHTML = `
                送信に失敗しました。<br>
                もう一度お試しください。
            `;


            form.appendChild(
                errorBox
            );

        }

    });

});
