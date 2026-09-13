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
description: "Nidmegent Esports 代表",
results: [
{date: "大会出場：",title: "StreamerValorantCustom 1",rank: "3位"},
{date: "大会出場：",title: "第1回うちゃカス",rank: ""},
{date: "大会出場：",title: "CHILLCUSTOM",rank: "Best.18"},
{date: "大会出場：",title: "シルバー以下限定VALORANTカスタム",rank: ""},
{date: "大会運営：",title: "UpStageCup",rank: ""},
{date: "大会運営：",title: "VELCUP",rank: ""},
{date: "大会運営：",title: "StreamerValorantCustom 1",rank: ""},
{date: "大会運営：",title: "StreamerValorantCustom 2",rank: ""},
{date: "大会運営：",title: "NovaCup Vol.1",rank: ""},
{date: "大会運営：",title: "NovaCup Vol.2",rank: ""},
{date: "大会運営：",title: "STELLA CUP Vol.1",rank: ""}
]},
hati: {
role: "CREATOR",
name: "hati",
realName: "JOIND：2025.3",
birthday: "BIRTHDAY：04/08",
image: "player/hati.png",
x: "https://x.com/hati3974",
youtube: "#",
twitch: "#",
description: "自由気ままな暇人",
results: []
},
yuiri: {
role: "CREATOR",
name: "MinatoYuiri",
realName: "JOIND：2026.8",
birthday: "BIRTHDAY：03/18",
image: "player/yuiri.png",
x: "https://x.com/yuiri_minato",
youtube: "https://www.youtube.com/@yuiriminato",
twitch: "https://www.twitch.tv/yuiri00",
description: "かわいいものに囲まれていたいかわいい大好きゲーマー",
results: [
{date: "大会出場：",title: "桜珂杯",rank: "2位"}
]},
kanzaki: {
role: "CREATOR",
name: "KanzakiAyaka",
realName: "JOIND：2026.6",
birthday: "BIRTHDAY：09/21",
image: "player/kanzaki.png",
x: "https://x.com/kknzkk1129",
youtube: "https://www.youtube.com/@knzk_09",
twitch: "https://www.twitch.tv/knzk_09",
description: "ポジション思考？なゲーマー",
results: [
{date: "大会運営：",title: "STELLA CUP",rank: ""}
]},
nade: {
role: "CREATOR",
name: "Nade",
realName: "JOIND：2026.8",
birthday: "BIRTHDAY：07/21",
image: "player/nade.png",
x: "#",
youtube: "#",
twitch: "#",
description: "Nidmegentイメージキャラクター",
results: []
}

}; // playerstats end

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
if (!player) {
    document.title =
        "PLAYER NOT FOUND | Nidmegent Esports";
    document.getElementById("playerName").textContent =
        "PLAYER NOT FOUND";
} else {
    /*============================================
    TITLE
    ============================================*/
    document.title =
        ${player.name} | Nidmegent Esports;
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
        .href = player.youtube || "#";
    document.getElementById("playerTwitch")
        .href = player.twitch || "#";
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
    if (player.results && player.results.length > 0) {
        player.results.forEach(result => {
            const item =
                document.createElement("div");
            item.className =
                "result-item";
            item.innerHTML =
                <span class="result-date">
                    ${result.date}
                </span>
                <span class="result-title">
                    ${result.title}
                    ${result.rank}
                </span>
            ;
            results.appendChild(item);
        });
    }
}
