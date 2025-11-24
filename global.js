const navWrapper = document.querySelector(".nav-wrapper");
const links = document.querySelectorAll("nav a");
const indicator = document.querySelector(".nav-indicator");
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.querySelector(".sun-icon");
const moonIcon = document.querySelector(".moon-icon");

if (links.length && indicator) {
  const moveIndicator = (link) => {
    const linkRect = link.getBoundingClientRect();
    const navRect = link.parentNode.getBoundingClientRect();

    indicator.style.left = `${linkRect.left - navRect.left}px`;
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.height = `${linkRect.height}px`;
  };

  const updateIndicator = () => {
    const activeLink = document.querySelector("nav a.active") || links[0];
    moveIndicator(activeLink);
  };

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.getAttribute("href").startsWith("#")) {
        e.preventDefault();
      }
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      moveIndicator(link);
    });
  });

  const initialActive = document.querySelector("nav a.active") || links[0];
  if (!initialActive.classList.contains("active")) {
    initialActive.classList.add("active");
  }

  document.fonts.ready.then(() => {
    moveIndicator(initialActive);
  });
  document.fonts.ready.then(() => {
    moveIndicator(initialActive);
  });

  window.addEventListener("resize", updateIndicator);
}

let lastScrollY = 0;

window.addEventListener("scroll", () => {
  const currentY = window.scrollY;
  const wasScrolled = navWrapper.classList.contains("scrolled");
  const isScrolled = currentY > 50;

  if (isScrolled) {
    navWrapper.classList.add("scrolled");
  } else {
    navWrapper.classList.remove("scrolled");
  }

  if (wasScrolled !== isScrolled) {
    setTimeout(() => {
      const activeLink = document.querySelector("nav a.active");
      if (activeLink && typeof moveIndicator !== "undefined") {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = activeLink.parentNode.getBoundingClientRect();
        indicator.style.left = `${linkRect.left - navRect.left}px`;
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.height = `${linkRect.height}px`;
      }
    }, 100);
  }

  lastScrollY = currentY;
});

const enableDarkMode = () => {
  document.body.classList.add("dark-mode");
  sunIcon.style.display = "none";
  moonIcon.style.display = "block";
  localStorage.setItem("theme", "dark");
};

const disableDarkMode = () => {
  document.body.classList.remove("dark-mode");
  sunIcon.style.display = "block";
  moonIcon.style.display = "none";
  localStorage.setItem("theme", "light");
};

if (document.body.classList.contains("dark-mode")) {
  sunIcon.style.display = "none";
  moonIcon.style.display = "block";
} else {
  sunIcon.style.display = "block";
  moonIcon.style.display = "none";
}

themeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});
