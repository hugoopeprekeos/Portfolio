function initScrollSpy() {
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    const navLi = document.querySelectorAll("nav a");
    if (navLi.length === 0) return;

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLi.forEach((li) => {
      li.classList.remove("active");
      if (li.getAttribute("href") === "#" + current) {
        li.classList.add("active");
        if (typeof moveNavIndicator === "function") moveNavIndicator(li);
      }
    });
  });
}
initScrollSpy();
