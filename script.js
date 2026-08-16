/* =========================================
   JAMES ANDANJE PORTFOLIO
   Interactivity
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const siteHeader = document.getElementById("siteHeader");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

/* Mobile navigation */
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* Rotating hero text */
const rotatingText = document.getElementById("rotatingText");

const rotatingWords = [
  "Executive Operations",
  "Calendar & Inbox Support",
  "Travel Coordination",
  "Research & Briefing",
  "CRM & Follow-Ups",
  "Logistics"
];

let rotatingIndex = 0;

if (rotatingText) {
  rotatingText.style.transition = "opacity 0.25s ease, transform 0.25s ease";

  setInterval(() => {
    rotatingText.style.opacity = "0";
    rotatingText.style.transform = "translateY(6px)";

    setTimeout(() => {
      rotatingIndex = (rotatingIndex + 1) % rotatingWords.length;
      rotatingText.textContent = rotatingWords[rotatingIndex];
      rotatingText.style.opacity = "1";
      rotatingText.style.transform = "translateY(0)";
    }, 240);
  }, 2600);
}

/* Reveal on scroll */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

/* Animated counters */
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target || 0);
      const suffix = counter.dataset.suffix || "";
      const duration = 1400;
      const stepTime = 20;
      const increment = target / (duration / stepTime);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
          counter.textContent = `${target}${suffix}`;
          clearInterval(timer);
        } else {
          counter.textContent = `${Math.floor(current)}${suffix}`;
        }
      }, stepTime);

      observer.unobserve(counter);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

/* Active section navigation */
const sections = document.querySelectorAll("main .section-anchor[id]");

function updateActiveNavigation() {
  let currentId = "home";

  sections.forEach((section) => {
    const top = section.offsetTop - 170;

    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`
    );
  });
}

/* Scroll header, progress bar and back to top */
function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }

  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", scrollTop > 20);
  }

  if (backToTop) {
    backToTop.classList.toggle("visible", scrollTop > 650);
  }

  updateActiveNavigation();
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("load", updateScrollUI);

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* Project filtering */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const matches =
        filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !matches);
    });
  });
});

/* Modals */
const modalTriggers = document.querySelectorAll("[data-modal]");
const modalCloseControls = document.querySelectorAll("[data-close-modal]");
const modals = document.querySelectorAll(".modal");

function openModal(modal) {
  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const modal = document.getElementById(trigger.dataset.modal);
    openModal(modal);
  });
});

modalCloseControls.forEach((control) => {
  control.addEventListener("click", () => {
    const modal = control.closest(".modal");
    closeModal(modal);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modals.forEach((modal) => {
      if (modal.classList.contains("open")) {
        closeModal(modal);
      }
    });
  }
});

/* Copy email */
const copyEmailButton = document.getElementById("copyEmail");
const copyFeedback = document.getElementById("copyFeedback");
const emailAddress = "okelloandanje@gmail.com";

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);

      if (copyFeedback) {
        copyFeedback.textContent = "Email copied to clipboard.";
      }
    } catch {
      if (copyFeedback) {
        copyFeedback.textContent = emailAddress;
      }
    }

    setTimeout(() => {
      if (copyFeedback) copyFeedback.textContent = "";
    }, 2600);
  });
}

/* Gentle 3D tilt effect */
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -5;
    const rotateY = ((x / rect.width) - 0.5) * 5;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* Current year */
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
