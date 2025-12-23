(function () {
  function addMessage(messagesEl, text, type = "ai") {
    const div = document.createElement("div");
    div.className = type === "user" ? "msg-user" : "msg-ai";
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function startChat() {
    const messagesEl = document.getElementById("widgetMessages");
    const buttonsEl = document.getElementById("widgetButtons");
    if (!messagesEl || !buttonsEl) return;

    messagesEl.innerHTML = "";
    buttonsEl.innerHTML = "";

    const start = window.CHAT_DATA?.start;
    if (!start) return;

    start.messages.forEach((msg) => addMessage(messagesEl, msg, "ai"));

    start.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "chat-btn";
      btn.textContent = opt.label;

      btn.addEventListener("click", () => {
        buttonsEl.innerHTML = "";
        addMessage(messagesEl, opt.label, "user");

        if (Array.isArray(opt.answer)) {
          opt.answer.forEach((msg) => addMessage(messagesEl, msg, "ai"));
        } else {
          addMessage(messagesEl, opt.answer, "ai");
        }
      });

      buttonsEl.appendChild(btn);
    });
  }

  document.addEventListener("click", (e) => {
    const chatWidget = document.getElementById("chat-widget");
    if (!chatWidget) return;

    if (e.target.closest("#headerChatToggle")) {
      e.preventDefault();
      chatWidget.classList.add("open");
      startChat();
    }

    if (e.target.closest("#chatClose")) {
      chatWidget.classList.remove("open");
    }
  });
})();
