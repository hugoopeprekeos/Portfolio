function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
}

const routes = {
  "/": "pages/work.html",
  "/about": "pages/about.html",
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const page = path.split("/").pop();

  let route = routes[path] || routes["/" + page] || routes["/"];

  if (path.endsWith("/") && !page) {
    route = routes["/"];
  }

  try {
    const response = await fetch(route);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    document.getElementById("content").innerHTML = html;
    updateActiveLink(path);
  } catch (error) {
    console.error("Error loading page:", error);
  }
};

const updateActiveLink = (path) => {
  const links = document.querySelectorAll("nav a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (path.endsWith(href) || (path === "/" && href === "/")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  if (typeof window.moveNavIndicator === "function") {
    const activeLink = document.querySelector("nav a.active");
    if (activeLink) {
      window.moveNavIndicator(activeLink);
    }
  }
};

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href) return;

  if (href.startsWith("/") && !href.startsWith("//")) {
    e.preventDefault();
    window.history.pushState({}, "", href);
    handleLocation();
  }
});

window.onpopstate = handleLocation;

handleLocation();
