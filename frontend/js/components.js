async function loadComponent(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (!container) throw new Error();

  const response = await fetch(filePath);
  if (!response.ok) throw new Error();

  container.innerHTML = await response.text();
}

(async function () {
  await Promise.all([
    loadComponent("site-header", "components/header.html"),
    loadComponent("site-footer", "components/footer.html"),
    loadComponent("chat-container", "components/chat.html"),
  ]);

  if (typeof window.initHeader === "function") {
    window.initHeader();
  }

  if (typeof window.initFooter === "function") {
    window.initFooter();
  }

  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });
})();
