/* =====================================================
   NIDMEGENT ESPORTS | BIRTHDAYS
   今月誕生日を迎えるメンバーのみ表示
===================================================== */

"use strict";

/* =====================================================
   CONFIGURATION
===================================================== */

// Google Apps ScriptのウェブアプリURLに変更する
const BIRTHDAY_API_URL =
  "https://script.google.com/macros/s/AKfycbyu9Pp9wFQf2fQbpSmnz_jNrp2J7qgBbLZN57a9FPDmmtVrptMrs3PKymGalMoR8B-L0Q/exec";


/* =====================================================
   DOM
===================================================== */

const birthdayGrid = document.getElementById("birthdays-grid");
const birthdayFeature = document.getElementById("birthday-feature");
const birthdayStatus = document.getElementById("birthdays-status");
const birthdayEmpty = document.getElementById("birthdays-empty");


/* =====================================================
   DATE
===================================================== */

// 日本時間を基準に現在の年月を取得
function getJapanDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const result = {};

  parts.forEach(part => {
    result[part.type] = part.value;
  });

  return {
    year: Number(result.year),
    month: Number(result.month),
    day: Number(result.day)
  };
}


// 誕生日データから月日を取り出す
function parseBirthday(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  // 日付を文字列として処理
  const text = String(value).trim();

  /*
   * 対応形式
   * 2000-11-15
   * 2000/11/15
   * 11-15
   * 11/15
   * 11月15日
   */

  let match = text.match(
    /^(?:\d{4}[-/])?(\d{1,2})[-/](\d{1,2})(?:$|T|\s)/
  );

  if (!match) {
    match = text.match(
      /^(\d{1,2})月(\d{1,2})日?$/
    );
  }

  if (!match) {
    return null;
  }

  const month = Number(match[1]);
  const day = Number(match[2]);

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  return {
    month,
    day
  };
}


// 月日を表示用に整形
function formatBirthday(value) {
  const birthday = parseBirthday(value);

  if (!birthday) {
    return "誕生日未設定";
  }

  return `${birthday.month} / ${birthday.day}`;
}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeBirthdayHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[char];
  });
}


/* =====================================================
   API: JSONP
===================================================== */

// Google Apps Scriptから誕生日データを取得
function fetchBirthdayData() {
  return new Promise((resolve, reject) => {
    if (
      !BIRTHDAY_API_URL.startsWith(
        "https://script.google.com/macros/s/"
      )
    ) {
      reject(
        new Error(
          "BIRTHDAY_API_URLにApps ScriptのウェブアプリURLを設定してください。"
        )
      );

      return;
    }

    const callbackName =
      "birthdayCallback_" +
      Date.now() +
      "_" +
      Math.random().toString(36).slice(2, 10);

    const script = document.createElement("script");

    const timeout = setTimeout(() => {
      cleanup();

      reject(
        new Error(
          "誕生日データの取得がタイムアウトしました。"
        )
      );
    }, 15000);

    function cleanup() {
      clearTimeout(timeout);

      delete window[callbackName];

      script.remove();
    }

    window[callbackName] = data => {
      cleanup();

      if (!data || data.success !== true) {
        reject(
          new Error(
            data?.message ||
            "誕生日データの取得に失敗しました。"
          )
        );

        return;
      }

      if (!Array.isArray(data.birthdays)) {
        reject(
          new Error(
            "誕生日データの形式が正しくありません。"
          )
        );

        return;
      }

      resolve(data.birthdays);
    };

    script.onerror = () => {
      cleanup();

      reject(
        new Error(
          "Apps Scriptに接続できませんでした。"
        )
      );
    };

    const params = new URLSearchParams({
      action: "list",
      callback: callbackName
    });

    script.src =
      BIRTHDAY_API_URL +
      "?" +
      params.toString();

    document.head.appendChild(script);
  });
}


/* =====================================================
   FILTER
===================================================== */

// 今月が誕生日のメンバーだけを抽出
function getThisMonthBirthdays(birthdays) {
  const today = getJapanDate();

  return birthdays
    .filter(member => {
      // 非公開・無効なメンバーは除外
      if (
        member.active === false ||
        String(member.active).toLowerCase() === "false" ||
        String(member.active) === "0"
      ) {
        return false;
      }

      const birthday = parseBirthday(member.birthday);

      if (!birthday) {
        return false;
      }

      // 現在の月と誕生日の月が一致する人だけ
      return birthday.month === today.month;
    })
    .sort((a, b) => {
      const birthdayA = parseBirthday(a.birthday);
      const birthdayB = parseBirthday(b.birthday);

      // 誕生日の日付順
      if (birthdayA.day !== birthdayB.day) {
        return birthdayA.day - birthdayB.day;
      }

      // 同じ日なら表示順
      return (
        Number(a.displayOrder || 9999) -
        Number(b.displayOrder || 9999)
      );
    });
}


/* =====================================================
   RENDER
===================================================== */

function renderBirthdayCard(member, featured = false) {
  const birthday = parseBirthday(member.birthday);

  return `
    <article class="birthday-card ${
      featured ? "birthday-card-featured" : ""
    }">

      <div class="birthday-card-date">
        <span class="birthday-card-month">
          ${birthday ? String(birthday.month).padStart(2, "0") : ""}
        </span>

        <span class="birthday-card-day">
          ${birthday ? String(birthday.day).padStart(2, "0") : ""}
        </span>
      </div>

      <div class="birthday-card-info">

        <p class="birthday-card-label">
          ${featured ? "BIRTHDAY OF THE MONTH" : "BIRTHDAY"}
        </p>

        <h3 class="birthday-card-name">
          ${escapeBirthdayHTML(member.name || "名前未設定")}
        </h3>

        ${
          member.division
            ? `
              <p class="birthday-card-division">
                ${escapeBirthdayHTML(member.division)}
              </p>
            `
            : ""
        }

        ${
          member.role
            ? `
              <p class="birthday-card-role">
                ${escapeBirthdayHTML(member.role)}
              </p>
            `
            : ""
        }

      </div>

    </article>
  `;
}


// 今月の誕生日を表示
function renderBirthdays(birthdays) {
  const today = getJapanDate();

  const monthLabel = `${today.month}月`;

  if (birthdayStatus) {
    birthdayStatus.textContent =
      `${monthLabel}の誕生日メンバー`;
  }

  if (!birthdayGrid || !birthdayFeature) {
    console.error(
      "誕生日表示用のHTML要素が見つかりません。"
    );

    return;
  }

  const monthlyBirthdays =
    getThisMonthBirthdays(birthdays);

  // 表示領域を初期化
  birthdayFeature.innerHTML = "";
  birthdayGrid.innerHTML = "";

  // 今月の誕生日がない場合
  if (monthlyBirthdays.length === 0) {
    birthdayFeature.hidden = true;
    birthdayGrid.hidden = true;

    if (birthdayEmpty) {
      birthdayEmpty.hidden = false;

      birthdayEmpty.textContent =
        `今月（${monthLabel}）誕生日を迎えるメンバーはいません。`;
    }

    return;
  }

  if (birthdayEmpty) {
    birthdayEmpty.hidden = true;
  }

  // 最初のメンバーをピックアップ表示
  birthdayFeature.hidden = false;

  birthdayFeature.innerHTML =
    renderBirthdayCard(monthlyBirthdays[0], true);

  // 2人目以降のメンバーを一覧表示
  const remainingBirthdays =
    monthlyBirthdays.slice(1);

  birthdayGrid.hidden =
    remainingBirthdays.length === 0;

  birthdayGrid.innerHTML =
    remainingBirthdays
      .map(member => renderBirthdayCard(member))
      .join("");
}


/* =====================================================
   LOAD
===================================================== */

async function loadMonthlyBirthdays() {
  if (birthdayStatus) {
    birthdayStatus.textContent =
      "誕生日データを読み込み中...";
  }

  if (birthdayEmpty) {
    birthdayEmpty.hidden = true;
  }

  try {
    const birthdays = await fetchBirthdayData();

    renderBirthdays(birthdays);

    console.log(
      "誕生日データを読み込みました。",
      birthdays.length
    );

  } catch (error) {
    console.error(
      "誕生日データの取得エラー:",
      error
    );

    if (birthdayStatus) {
      birthdayStatus.textContent =
        "誕生日データを取得できませんでした。";
    }

    if (birthdayFeature) {
      birthdayFeature.hidden = true;
    }

    if (birthdayGrid) {
      birthdayGrid.hidden = true;
    }

    if (birthdayEmpty) {
      birthdayEmpty.hidden = false;

      birthdayEmpty.textContent =
        "誕生日データを読み込めませんでした。時間をおいて再度アクセスしてください。";
    }
  }
}


/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  loadMonthlyBirthdays();

  // 日付が変わったあとも表示を更新する
  // ※月が変わった場合も最新の誕生日データを取得
  setInterval(() => {
    const today = getJapanDate();

    const currentMonthKey =
      `${today.year}-${today.month}`;

    if (
      window._birthdayMonthKey !== currentMonthKey
    ) {
      window._birthdayMonthKey = currentMonthKey;

      loadMonthlyBirthdays();
    }
  }, 60 * 1000);

  const today = getJapanDate();

  window._birthdayMonthKey =
    `${today.year}-${today.month}`;
});
