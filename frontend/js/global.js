function initHeader() {
  const navWrapper = document.querySelector(".nav-wrapper");
  const links = document.querySelectorAll("nav a");
  const indicator = document.querySelector(".nav-indicator");
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  if (links.length && indicator) {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop() || "index.html";

    links.forEach((link) => {
      const linkHref = link.getAttribute("href");
      if (
        linkHref === pageName ||
        (pageName === "index.html" && linkHref === "index.html") ||
        (pageName === "" && linkHref === "index.html")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    const moveIndicator = (link) => {
      const linkRect = link.getBoundingClientRect();
      const navRect = link.parentNode.getBoundingClientRect();

      indicator.style.left = `${linkRect.left - navRect.left}px`;
      indicator.style.width = `${linkRect.width}px`;
      indicator.style.height = `${linkRect.height}px`;
      indicator.style.opacity = "1";
    };

    window.moveNavIndicator = moveIndicator;

    const updateIndicator = () => {
      const activeLink = document.querySelector("nav a.active");
      if (activeLink) moveIndicator(activeLink);
    };

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }
        }
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        moveIndicator(link);
      });
    });

    const initialActive = document.querySelector("nav a.active");
    if (initialActive) {
      setTimeout(() => moveIndicator(initialActive), 50);
      document.fonts.ready.then(() => moveIndicator(initialActive));
    } else {
      indicator.style.opacity = "0";
    }

    window.addEventListener("resize", updateIndicator);
  }

  let lastScrollY = 0;

  window.addEventListener("scroll", () => {
    if (!navWrapper) return;

    const currentY = window.scrollY;
    const wasScrolled = navWrapper.classList.contains("scrolled");
    const isScrolled = currentY > 50;

    if (isScrolled) navWrapper.classList.add("scrolled");
    else navWrapper.classList.remove("scrolled");

    if (wasScrolled !== isScrolled) {
      setTimeout(() => {
        const activeLink = document.querySelector("nav a.active");
        if (activeLink && indicator) {
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
    if (sunIcon) sunIcon.style.display = "none";
    if (moonIcon) moonIcon.style.display = "block";
    localStorage.setItem("theme", "dark");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    if (sunIcon) sunIcon.style.display = "block";
    if (moonIcon) moonIcon.style.display = "none";
    localStorage.setItem("theme", "light");
  };

  if (document.body.classList.contains("dark-mode")) {
    if (sunIcon) sunIcon.style.display = "none";
    if (moonIcon) moonIcon.style.display = "block";
  } else {
    if (sunIcon) sunIcon.style.display = "block";
    if (moonIcon) moonIcon.style.display = "none";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (document.body.classList.contains("dark-mode")) disableDarkMode();
      else enableDarkMode();
    });
  }

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.body.style.setProperty("--mouse-x", `${x}px`);
    document.body.style.setProperty("--mouse-y", `${y}px`);
  });
  initStars();
}

function initStars() {
  const starCount = 200;
  const body = document.body;

  const existingStars = document.querySelectorAll(".star");
  existingStars.forEach((star) => star.remove());

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 2.5 + 1;
    const opacity = Math.random() * 0.5 + 0.5;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;

    star.style.left = `${x}vw`;
    star.style.top = `${y}vh`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.setProperty("--star-opacity", opacity);
    star.style.setProperty("--star-duration", `${duration}s`);
    star.style.animationDelay = `${delay}s`;

    body.appendChild(star);
  }
}

function initFooter() {
  console.log(document.getElementsByTagName("a"));
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}
