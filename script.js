/* =========================================
   JAMES ANDANJE PORTFOLIO
   Interactive JavaScript
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
  document.getElementById("menuToggle");

const navLinks =
  document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

  menuToggle.classList.toggle("active");

  navLinks.classList.toggle("open");

  document.body.classList.toggle("menu-open");


  const expanded =
    menuToggle.getAttribute("aria-expanded")
    === "true";

  menuToggle.setAttribute(
    "aria-expanded",
    !expanded
  );

});


document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      menuToggle.classList.remove("active");

      navLinks.classList.remove("open");

      document.body.classList.remove("menu-open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });



/* =========================================
   ROTATING HERO TEXT
========================================= */

const rotatingText =
  document.getElementById("rotatingText");


const rotatingWords = [
  "Research",
  "Organization",
  "Communication",
  "Business Support",
  "Digital Workflows"
];


let wordIndex = 0;


function rotateWord() {

  rotatingText.style.opacity = "0";

  rotatingText.style.transform =
    "translateY(6px)";


  setTimeout(() => {

    wordIndex =
      (wordIndex + 1)
      % rotatingWords.length;


    rotatingText.textContent =
      rotatingWords[wordIndex];


    rotatingText.style.opacity = "1";

    rotatingText.style.transform =
      "translateY(0)";

  }, 250);

}


rotatingText.style.transition =
  "opacity 0.25s ease, transform 0.25s ease";


setInterval(
  rotateWord,
  2600
);



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
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
   ACTIVE NAVIGATION SECTION
========================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const navItems =
  document.querySelectorAll(".nav-link");


function updateActiveNavigation() {

  let currentSection = "";


  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 160;


    if (
      window.scrollY >= sectionTop
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });


  navItems.forEach(link => {

    link.classList.remove("active");


    if (
      link.getAttribute("href")
      === `#${currentSection}`
    ) {

      link.classList.add("active");

    }

  });

}


window.addEventListener(
  "scroll",
  updateActiveNavigation
);



/* =========================================
   PROJECT FILTER
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

        btn.classList.remove("active");

      });


      button.classList.add("active");


      const filter =
        button.dataset.filter;


      projectCards.forEach(card => {

        const category =
          card.dataset.category;


        if (
          filter === "all"
          || category === filter
        ) {

          card.classList.remove(
            "hidden"
          );

        } else {

          card.classList.add(
            "hidden"
          );

        }

      });

    }
  );

});



/* =========================================
   ANIMATED COUNTERS
========================================= */

const counters =
  document.querySelectorAll(".counter");


const counterObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }


        const counter =
          entry.target;


        const target =
          Number(
            counter.dataset.target
          );


        const suffix =
          counter.dataset.suffix || "";


        let current = 0;


        const duration = 1400;

        const increment =
          target / (duration / 20);


        const timer =
          setInterval(() => {

            current += increment;


            if (current >= target) {

              counter.textContent =
                target + suffix;

              clearInterval(timer);

            } else {

              counter.textContent =
                Math.floor(current)
                + suffix;

            }

          }, 20);


        counterObserver.unobserve(
          counter
        );

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
   BACK TO TOP
========================================= */

const backToTop =
  document.getElementById(
    "backToTop"
  );


window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 650) {

      backToTop.classList.add(
        "visible"
      );

    } else {

      backToTop.classList.remove(
        "visible"
      );

    }

  }
);


backToTop.addEventListener(
  "click",
  () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }
);



/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById(
  "currentYear"
).textContent =
  new Date().getFullYear();
