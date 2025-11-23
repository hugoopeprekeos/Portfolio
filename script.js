const nav = document.querySelector(".nav");
const links = document.querySelectorAll("nav a");
const indicator = document.querySelector(".nav-indicator");

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
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      moveIndicator(link);
    });
  });

  links[0].classList.add("active");
  moveIndicator(links[0]);

  window.addEventListener("resize", updateIndicator);
  document.fonts.ready.then(updateIndicator);
}

let lastScrollY = 0;

window.addEventListener("scroll", () => {
  const currentY = window.scrollY;
  const wasScrolled = nav.classList.contains("scrolled");
  const isScrolled = currentY > 80;

  if (isScrolled) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  if (wasScrolled !== isScrolled) {
    if (typeof updateIndicator === "function") updateIndicator();
    setTimeout(() => {
      if (typeof updateIndicator === "function") updateIndicator();
    }, 450);
  }

  lastScrollY = currentY;
});
