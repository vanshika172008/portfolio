// =========================================================
// EDIT YOUR TYPING EFFECT PHRASES HERE
// =========================================================
const typingPhrases = [
  "SQL & Data Modeling",
  "Python & Exploratory Analysis",
  "Power BI & Tableau Dashboards",
  "Excel & Business Insights"
];

// =========================================================
// 1. TYPING EFFECT IN HERO SECTION
// =========================================================
const typingTextEl = document.getElementById("typingText");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function runTypingEffect() {
  if (!typingTextEl) return;

  const currentPhrase = typingPhrases[phraseIndex];

  if (isDeleting) {
    typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 45 : 85;

  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = 1600;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    delay = 350;
  }

  setTimeout(runTypingEffect, delay);
}

// =========================================================
// 2. MOBILE NAVIGATION TOGGLE & SMOOTH CLOSE
// =========================================================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const allNavLinks = document.querySelectorAll(".nav-link");

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    const icon = mobileMenuBtn.querySelector("i");
    if (icon) {
      icon.className = isOpen ? "fas fa-xmark" : "fas fa-bars";
    }
  });

  allNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      const icon = mobileMenuBtn.querySelector("i");
      if (icon) icon.className = "fas fa-bars";
    });
  });
}

// =========================================================
// 3. NAVBAR SCROLL STATE & ACTIVE LINK HIGHLIGHT
// =========================================================
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("main section[id]");

function handleScroll() {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  }

  const scrollPos = window.scrollY + 130;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      allNavLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });

// =========================================================
// 4. PROJECT FILTERING BY TOOL
// =========================================================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedFilter = btn.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const cardTools = (card.getAttribute("data-tools") || "").toLowerCase();
      const shouldShow =
        selectedFilter === "all" || cardTools.includes(selectedFilter.toLowerCase());

      card.style.display = shouldShow ? "flex" : "none";
    });
  });
});

// =========================================================
// 5. SCROLL REVEAL OBSERVER
// =========================================================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

// =========================================================
// 6. DYNAMIC FOOTER YEAR
// =========================================================
const yearEl = document.getElementById("currentYear");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Start typing animation on load
document.addEventListener("DOMContentLoaded", () => {
  runTypingEffect();
  handleScroll();
});