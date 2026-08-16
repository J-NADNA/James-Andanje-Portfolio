/* =========================================
   JAMES ANDANJE PORTFOLIO
   Interactive JavaScript
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  navMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

}



/* =========================================
   ROTATING HERO TEXT
========================================= */

const rotatingText =
  document.getElementById("rotatingText");


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

  rotatingText.style.transition =
    "opacity 0.25s ease, transform 0.25s ease";


  setInterval(() => {

    rotatingText.style.opacity = "0";

    rotatingText.style.transform =
      "translateY(6px)";


    setTimeout(() => {

      rotatingIndex =
        (rotatingIndex + 1)
        % rotatingWords.length;


      rotatingText.textContent =
        rotatingWords[rotatingIndex];


      rotatingText.style.opacity = "1";

      rotatingText.style.transform =
        "translateY(0)";

    }, 240);

  }, 2600);

}



/* =========================================
   REVEAL ELEMENTS ON SCROLL
========================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );


          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});



/* =========================================
   ANIMATED COUNTERS
========================================= */

const counters =
  document.querySelectorAll(".counter");


const counterObserver =
  new IntersectionObserver(

    (entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }


        const counter =
          entry.target;


        const target =
          Number(
            counter.dataset.target || 0
          );


        const suffix =
          counter.dataset.suffix || "";


        const duration = 1400;

        const stepTime = 20;

        const increment =
          target / (duration / stepTime);


        let current = 0;


        const timer =
          setInterval(() => {

            current += increment;


            if (current >= target) {

              counter.textContent =
                `${target}${suffix}`;

              clearInterval(timer);

            } else {

              counter.textContent =
                `${Math.floor(current)}${suffix}`;

            }

          }, stepTime);


        observer.unobserve(counter);

      });

    },

    {
      threshold: 0.5
    }

  );


counters.forEach(counter => {

  counterObserver.observe(counter);

});



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const navLinks =
  document.querySelectorAll(".nav-link");


const sections =
  document.querySelectorAll(
    "main .section-anchor[id]"
  );


function updateActiveNavigation() {

  let currentId = "home";


  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 170;


    if (
      window.scrollY >= sectionTop
    ) {

      currentId =
        section.id;

    }

  });


  navLinks.forEach(link => {

    const href =
      link.getAttribute("href");


    link.classList.toggle(

      "active",

      href === `#${currentId}`

    );

  });

}



/* =========================================
   HEADER EFFECT
========================================= */

const siteHeader =
  document.getElementById(
    "siteHeader"
  );


function updateHeader() {

  if (!siteHeader) {
    return;
  }


  siteHeader.classList.toggle(

    "scrolled",

    window.scrollY > 20

  );

}



/* =========================================
   SCROLL PROGRESS BAR
========================================= */

const scrollProgress =
  document.getElementById(
    "scrollProgress"
  );


function updateScrollProgress() {

  if (!scrollProgress) {
    return;
  }


  const scrollTop =
    window.scrollY;


  const documentHeight =
    document.documentElement.scrollHeight
    - window.innerHeight;


  const progress =
    documentHeight > 0

      ? (scrollTop / documentHeight) * 100

      : 0;


  scrollProgress.style.width =
    `${progress}%`;

}



/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
  document.getElementById(
    "backToTop"
  );


function updateBackToTop() {

  if (!backToTop) {
    return;
  }


  backToTop.classList.toggle(

    "visible",

    window.scrollY > 650

  );

}


if (backToTop) {

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );

}



/* =========================================
   MAIN SCROLL HANDLER
========================================= */

function updateScrollUI() {

  updateHeader();

  updateScrollProgress();

  updateBackToTop();

  updateActiveNavigation();

}


window.addEventListener(

  "scroll",

  updateScrollUI,

  {
    passive: true
  }

);


window.addEventListener(

  "load",

  updateScrollUI

);



/* =========================================
   PROJECT FILTERING
========================================= */

const filterButtons =
  document.querySelectorAll(
    ".filter-btn"
  );


const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


filterButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      filterButtons.forEach(btn => {

        btn.classList.remove(
          "active"
        );

      });


      button.classList.add(
        "active"
      );


      const filter =
        button.dataset.filter;


      projectCards.forEach(card => {

        const category =
          card.dataset.category;


        const shouldShow =

          filter === "all"

          ||

          category === filter;


        card.classList.toggle(

          "hidden",

          !shouldShow

        );

      });

    }
  );

});



/* =========================================
   PROJECT DETAIL MODALS
========================================= */

const modalTriggers =
  document.querySelectorAll(
    "[data-modal]"
  );


const modalCloseControls =
  document.querySelectorAll(
    "[data-close-modal]"
  );


const modals =
  document.querySelectorAll(
    ".modal"
  );


function openModal(modal) {

  if (!modal) {
    return;
  }


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "modal-open"
  );


  const closeButton =
    modal.querySelector(
      ".modal-close"
    );


  if (closeButton) {

    closeButton.focus();

  }

}


function closeModal(modal) {

  if (!modal) {
    return;
  }


  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "modal-open"
  );

}


modalTriggers.forEach(trigger => {

  trigger.addEventListener(
    "click",
    () => {

      const modalId =
        trigger.dataset.modal;


      const modal =
        document.getElementById(
          modalId
        );


      openModal(modal);

    }
  );

});


modalCloseControls.forEach(control => {

  control.addEventListener(
    "click",
    () => {

      const modal =
        control.closest(
          ".modal"
        );


      closeModal(modal);

    }
  );

});


document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }


    modals.forEach(modal => {

      if (
        modal.classList.contains(
          "open"
        )
      ) {

        closeModal(modal);

      }

    });

  }
);



/* =========================================
   COPY EMAIL BUTTON
========================================= */

const copyEmailButton =
  document.getElementById(
    "copyEmail"
  );


const copyFeedback =
  document.getElementById(
    "copyFeedback"
  );


const emailAddress =
  "okelloandanje@gmail.com";


if (copyEmailButton) {

  copyEmailButton.addEventListener(
    "click",
    async () => {

      try {

        await navigator.clipboard.writeText(
          emailAddress
        );


        if (copyFeedback) {

          copyFeedback.textContent =
            "Email copied to clipboard.";

        }

      } catch (error) {

        if (copyFeedback) {

          copyFeedback.textContent =
            emailAddress;

        }

      }


      setTimeout(() => {

        if (copyFeedback) {

          copyFeedback.textContent = "";

        }

      }, 2600);

    }
  );

}



/* =========================================
   SUBTLE 3D CARD EFFECT
========================================= */

const tiltCards =
  document.querySelectorAll(
    ".tilt-card"
  );


tiltCards.forEach(card => {

  card.addEventListener(
    "mousemove",
    event => {

      /*
       Do not apply this effect
       on touchscreen devices.
      */

      if (
        window.matchMedia(
          "(pointer: coarse)"
        ).matches
      ) {

        return;

      }


      const rect =
        card.getBoundingClientRect();


      const x =
        event.clientX - rect.left;


      const y =
        event.clientY - rect.top;


      const rotateX =
        (
          (y / rect.height) - 0.5
        ) * -5;


      const rotateY =
        (
          (x / rect.width) - 0.5
        ) * 5;


      card.style.transform =

        `perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-3px)`;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform = "";

    }
  );

});



/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
  document.getElementById(
    "currentYear"
  );


if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}
