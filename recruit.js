/*==================================================
NIDMEGENT RECRUIT PAGE
==================================================*/


/*==================================================
DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initRecruitAnimations();
    initPositionHover();
    initPageFade();

});


/*==================================================
RECRUITMENT POSITION ANIMATION
==================================================*/

function initRecruitAnimations(){

    const positions = document.querySelectorAll(
        ".recruit-position"
    );

    if(!positions.length) return;


    /* Reduced Motion */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if(reduceMotion){

        positions.forEach(position => {

            position.classList.add("show");

        });

        return;

    }


    /* Intersection Observer */

    const observer = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if(!entry.isIntersecting) return;


                const position = entry.target;


                /*
                カードごとに少しずつ
                表示タイミングをずらす
                */

                const index =
                    [...positions].indexOf(position);


                setTimeout(() => {

                    position.classList.add("show");

                }, index * 100);


                observer.unobserve(position);

            });

        },

        {
            threshold:0.15,

            rootMargin:"0px 0px -60px 0px"

        }

    );


    positions.forEach(position => {

        observer.observe(position);

    });

}


/*==================================================
POSITION HOVER
==================================================*/

function initPositionHover(){

    const positions = document.querySelectorAll(
        ".recruit-position"
    );

    if(!positions.length) return;


    positions.forEach(position => {


        position.addEventListener(
            "mouseenter",
            () => {

                position.classList.add("is-hover");

            }
        );


        position.addEventListener(
            "mouseleave",
            () => {

                position.classList.remove("is-hover");

            }
        );


    });

}


/*==================================================
PAGE FADE
==================================================*/

function initPageFade(){

    document.body.classList.add(
        "recruit-page-loaded"
    );

}


/*==================================================
POSITION NUMBER CHECK
==================================================*/

document.querySelectorAll(
    ".recruit-position"
).forEach((position, index) => {

    /*
    data-numberが設定されていない場合は
    自動で番号を設定
    */

    if(!position.dataset.number){

        position.dataset.number =
            String(index + 1).padStart(2, "0");

    }

});


/*==================================================
SMOOTH POSITION LINK
==================================================*/

document.querySelectorAll(
    ".recruit-position"
).forEach(position => {

    const icon =
        position.querySelector(
            ".recruit-position__top i"
        );


    if(!icon) return;


    position.addEventListener(
        "click",
        () => {

            /*
            現時点ではクリック時の
            詳細ページ遷移は設定しない。

            将来的に募集詳細ページを作る場合は
            ここにリンク処理を追加できます。
            */

        }
    );

});


/*==================================================
WINDOW RESIZE
==================================================*/

let recruitResizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            recruitResizeTimer
        );


        recruitResizeTimer = setTimeout(
            () => {

                /*
                Resize時にレイアウトを
                再計算するための処理
                */

                document
                    .querySelectorAll(
                        ".recruit-position"
                    )
                    .forEach(position => {

                        position.style.removeProperty(
                            "transition"
                        );

                    });

            },
            200
        );

    }
);


/*==================================================
PAGE VISIBILITY
==================================================*/

document.addEventListener(
    "visibilitychange",
    () => {

        if(
            document.visibilityState ===
            "visible"
        ){

            document.body.classList.add(
                "recruit-page-active"
            );

        }

    }
);
