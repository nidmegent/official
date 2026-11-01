/* =====================================================
   NIDMEGENT ESPORTS
   ABOUT PAGE JAVASCRIPT
===================================================== */

"use strict";


/* =====================================================
   CONFIG
===================================================== */

// GASのウェブアプリURLを設定
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbyu9Pp9wFQf2fQbpSmnz_jNrp2J7qgBbLZN57a9FPDmmtVrptMrs3PKymGalMoR8B-L0Q/exec";


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initAchievements();
  initNumberCounters();
  initBirthdaySection();
  initSmoothScroll();
});


/* =====================================================
   HEADER
===================================================== */

function initHeader() {
  const header = document.querySelector(".about-page .header");

  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });
}


/* =====================================================
   MOBILE MENU
===================================================== */

function initMobileMenu() {
  const button = document.querySelector(".about-menu-toggle");
  const nav = document.querySelector(".about-page .nav");

  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("about-nav-open");

    button.setAttribute("aria-expanded", String(isOpen));
    button.innerHTML = isOpen
      ? '<i class="ri-close-line"></i>'
      : '<i class="ri-menu-line"></i>';
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("about-nav-open");

      button.setAttribute("aria-expanded", "false");
      button.innerHTML = '<i class="ri-menu-line"></i>';
    });
  });

  document.addEventListener("click", event => {
    if (
      !nav.contains(event.target)
      && !button.contains(event.target)
    ) {
      nav.classList.remove("about-nav-open");
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = '<i class="ri-menu-line"></i>';
    }
  });
}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function initScrollReveal() {
  const targets = document.querySelectorAll(".about-page .reveal");

  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(element => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  targets.forEach((element, index) => {
    element.style.transitionDelay =
      `${Math.min(index % 4, 3) * 70}ms`;

    observer.observe(element);
  });
}


/* =====================================================
   ACHIEVEMENTS ACCORDION
===================================================== */

function initAchievements() {
  const items = document.querySelectorAll(
    ".about-page .achievement-item"
  );

  items.forEach(item => {
    const button = item.querySelector(".achievement-header");

    if (!button) return;

    button.addEventListener("click", () => {
      const wasOpen = item.classList.contains("active");

      items.forEach(otherItem => {
        otherItem.classList.remove("active");

        const otherButton = otherItem.querySelector(
          ".achievement-header"
        );

        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
        }
      });

      if (!wasOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}


/* =====================================================
   NUMBER COUNTERS
===================================================== */

function initNumberCounters() {
  const counters = document.querySelectorAll(
    ".about-page .number-card h3[data-count]"
  );

  if (!counters.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    counters.forEach(counter => {
      const value = Number(counter.dataset.count);

      counter.textContent = value.toLocaleString("ja-JP")
        + (counter.textContent.includes("+") ? "+" : "");
    });

    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);

      animateCounter(element, target);

      observer.unobserve(element);
    });
  }, {
    threshold: 0.6
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
}


function animateCounter(element, target) {
  const duration = 1400;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min(
      (now - startTime) / duration,
      1
    );

    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(target * eased);

    const suffix = element.textContent.includes("+") ? "+" : "";

    element.textContent =
      current.toLocaleString("ja-JP") + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

function initSmoothScroll() {
  document.querySelectorAll(
    '.about-page a[href^="#"]'
  ).forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.querySelector(id);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });
    });
  });
}


/* =====================================================
   BIRTHDAY API
===================================================== */

async function initBirthdaySection() {
  const grid = document.getElementById("birthdays-grid");
  const status = document.getElementById("birthdays-status");
  const empty = document.getElementById("birthdays-empty");

  if (!grid || !status || !empty) return;

  if (!GAS_API_URL) {
    showBirthdayEmpty(
      "誕生日データの接続設定を準備しています。",
      status,
      empty
    );

    return;
  }

  try {
    const result = await fetchBirthdays();

    if (!result || result.success !== true) {
      throw new Error(
        result?.message || "誕生日情報を取得できませんでした。"
      );
    }

    const birthdays = Array.isArray(result.birthdays)
      ? result.birthdays
      : [];

    status.hidden = true;

    if (!birthdays.length) {
      showBirthdayEmpty(
        "メンバーの誕生日情報を準備しています。",
        status,
        empty
      );

      return;
    }

    renderBirthdays(birthdays, grid);
  } catch (error) {
    console.error("Birthday API error:", error);

    showBirthdayEmpty(
      "誕生日情報を読み込めませんでした。時間をおいて再度お試しください。",
      status,
      empty
    );
  }
}


/*
 * GASのJSONP APIから取得する。
 * GAS_API_URLには /exec まで含めたURLを設定する。
 */

function fetchBirthdays() {
  return new Promise((resolve, reject) => {
    const callbackName =
      "nidBirthdayCallback_" + Date.now() + "_"
      + Math.random().toString(36).slice(2);

    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();

      reject(new Error("誕生日情報の取得がタイムアウトしました。"));
    }, 12000);

    function cleanup() {
      window.clearTimeout(timeout);
      script.remove();

      try {
        delete window[callbackName];
      } catch (_) {
        window[callbackName] = undefined;
      }
    }

    window[callbackName] = data => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();

      reject(new Error("GAS APIに接続できませんでした。"));
    };

    const url = new URL(GAS_API_URL);

    url.searchParams.set("action", "list");
    url.searchParams.set("callback", callbackName);

    script.src = url.toString();

    document.head.appendChild(script);
  });
}


/* =====================================================
   BIRTHDAY RENDERING
===================================================== */

function renderBirthdays(birthdays, grid) {
  const today = getTodayMonthDay();

  const normalized = birthdays
    .map(item => ({
      ...item,
      monthDay: normalizeBirthday(item.birthday)
    }))
    .filter(item => {
      return item.name && item.monthDay;
    });

  normalized.sort((a, b) => {
    const dateA = daysUntilBirthday(a.monthDay);
    const dateB = daysUntilBirthday(b.monthDay);

    return dateA - dateB
      || (Number(a.displayOrder) || 0)
      - (Number(b.displayOrder) || 0);
  });

  grid.replaceChildren();

  normalized.forEach(item => {
    const days = daysUntilBirthday(item.monthDay);
    const isToday = item.monthDay === today;
    const isSoon = !isToday && days <= 7;

    const card = document.createElement("article");

    card.className = "birthday-card";

    if (isToday) {
      card.classList.add("birthday-card--today");
    }

    const top = document.createElement("div");
    top.className = "birthday-card__top";

    const icon = document.createElement("i");
    icon.className = "ri-cake-3-line birthday-card__icon";
    icon.setAttribute("aria-hidden", "true");

    top.appendChild(icon);

    if (isToday || isSoon) {
      const badge = document.createElement("span");
      badge.className = "birthday-card__badge";
      badge.textContent = isToday
        ? "TODAY!"
        : `あと${days}日`;

      top.appendChild(badge);
    }

    const date = document.createElement("span");
    date.className = "birthday-card__date";
    date.textContent = formatMonthDay(item.monthDay);

    const name = document.createElement("h3");
    name.className = "birthday-card__name";
    name.textContent = item.name;

    card.appendChild(top);
    card.appendChild(date);
    card.appendChild(name);

    if (item.division) {
      const division = document.createElement("span");
      division.className = "birthday-card__division";
      division.textContent = item.division;

      card.appendChild(division);
    }

    if (item.role) {
      const role = document.createElement("p");
      role.className = "birthday-card__role";
      role.textContent = item.role;

      card.appendChild(role);
    }

    grid.appendChild(card);
  });

  if (!normalized.length) {
    const status = document.getElementById("birthdays-status");
    const empty = document.getElementById("birthdays-empty");

    showBirthdayEmpty(
      "表示できる誕生日情報がありません。",
      status,
      empty
    );

    return;
  }

  const feature = normalized.find(
    item => item.monthDay === today
  );

  renderBirthdayFeature(feature);

  if (!feature) {
    const featureElement = document.getElementById(
      "birthday-feature"
    );

    if (featureElement) {
      featureElement.hidden = true;
    }
  }
}


function renderBirthdayFeature(item) {
  const feature = document.getElementById("birthday-feature");
  const name = document.getElementById("birthday-feature-name");
  const text = document.getElementById("birthday-feature-text");

  if (!feature || !name || !text) return;

  if (!item) {
    feature.hidden = true;
    return;
  }

  name.textContent = item.name + " さん";
  text.textContent = "お誕生日おめでとうございます！";

  feature.hidden = false;
}


/* =====================================================
   BIRTHDAY DATE HELPERS
===================================================== */

function normalizeBirthday(value) {
  const text = String(value || "").trim();

  const match = text.match(/^(\d{1,2})-(\d{1,2})$/);

  if (!match) return null;

  const month = Number(match[1]);
  const day = Number(match[2]);

  const check = new Date(Date.UTC(2000, month - 1, day));

  if (
    check.getUTCMonth() !== month - 1
    || check.getUTCDate() !== day
  ) {
    return null;
  }

  return String(month).padStart(2, "0")
    + "-"
    + String(day).padStart(2, "0");
}


function getTodayMonthDay() {
  const now = new Date();

  return String(now.getMonth() + 1).padStart(2, "0")
    + "-"
    + String(now.getDate()).padStart(2, "0");
}


function formatMonthDay(monthDay) {
  const [month, day] = monthDay.split("-");

  return `${Number(month)}月${Number(day)}日`;
}


function daysUntilBirthday(monthDay) {
  const [month, day] = monthDay.split("-").map(Number);
  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  let nextBirthday = new Date(
    now.getFullYear(),
    month - 1,
    day
  );

  if (nextBirthday < today) {
    nextBirthday = new Date(
      now.getFullYear() + 1,
      month - 1,
      day
    );
  }

  return Math.round(
    (nextBirthday.getTime() - today.getTime())
    / 86400000
  );
}


/* =====================================================
   BIRTHDAY EMPTY / ERROR
===================================================== */

function showBirthdayEmpty(message, status, empty) {
  if (status) {
    status.hidden = true;
  }

  if (empty) {
    empty.hidden = false;

    const paragraph = empty.querySelector("p");

    if (paragraph) {
      paragraph.textContent = message;
    }
  }
}
