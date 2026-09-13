/*==================================================
NIDMEGENT PLAYER DATA
==================================================*/
const players = {
    m1yun: {
        role: "CREATOR",
        name: "M1yuN",
        realName: "JOIND：2018.7",
        birthday: "BIRTHDAY：09/25",
        image: "player/m1yun.png",
        x: "https://x.com/komuhana1216",
        youtube: "https://www.youtube.com/@komuhana1216",
        twitch: "https://www.twitch.tv/komuhana1216",
        description:"Nidmegent Esportsのクリエイター。映像制作・デザイン・イベント制作など、チームのクリエイティブを支える。",
        results: [
            {
                date: "2026.09",
                title: "Nidmegent Esports Creative Event",
                rank: "1位"
            },
            {
                date: "2026.08",
                title: "VALORANT Community Event",
                rank: "3位"
            }
        ]
    },
    /*========================================
       新しい選手はここに追加
    ========================================*/

    player2: {

        role: "ATHLETE",

        name: "PLAYER",

        realName: "Real Name",

        birthday: "2000/00/00",

        image: "assets/images/players/player2.png",

        x: "#",

        youtube: "#",

        twitch: "#",

        description:
            "Player description.",

        results: []

    }

};



/*==================================================
GET PLAYER ID
==================================================*/
const params = new URLSearchParams(
    window.location.search
);
const playerId = params.get("id");
/*==================================================
PLAYER
==================================================*/
const player = players[playerId];
/*==================================================
ERROR
==================================================*/
if(!player){
    document.title =
        "PLAYER NOT FOUND | Nidmegent Esports";
    document.getElementById("playerName").textContent =
        "PLAYER NOT FOUND";
}else{
    /*============================================
       TITLE
    ============================================*/
    document.title =
        `${player.name} | Nidmegent Esports`;
    /*============================================
       BASIC
    ============================================*/
    document.getElementById("playerRole")
        .textContent = player.role;
    document.getElementById("playerName")
        .textContent = player.name;
    document.getElementById("playerRealName")
        .textContent = player.realName;
    document.getElementById("playerBirthday")
        .textContent = player.birthday;
    /*============================================
       IMAGE
    ============================================*/
    const image =
        document.getElementById("playerImage");
    image.src = player.image;
    image.alt = player.name;
    /*============================================
       SOCIAL
    ============================================*/
    document.getElementById("playerX")
        .href = player.x;
    document.getElementById("playerYoutube")
        .href = player.youtube;
    document.getElementById("playerTwitch")
        .href = player.twitch;
    /*============================================
       DESCRIPTION
    ============================================*/
    document.getElementById("playerDescription")
        .textContent = player.description;
    /*============================================
       RESULTS
    ============================================*/
    const results =
        document.getElementById("playerResults");
    results.innerHTML = "";
    player.results.forEach(result => {
        const item =
            document.createElement("div");
        item.className =
            "result-item";
        item.innerHTML = `
            <span class="result-date">
                ${result.date}
            </span>
            <span class="result-title">
                ${result.title}
                ${result.rank}
            </span>
        `;
        results.appendChild(item);
    });
}
