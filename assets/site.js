document.querySelectorAll(".header-menu").forEach((menu) => {
  const button = menu.querySelector(".header-menu-toggle");
  const nav = menu.querySelector(".header-nav");

  if (!button || !nav) {
    return;
  }

  const setOpen = (open) => {
    menu.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
  };

  button.addEventListener("click", () => {
    setOpen(!menu.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setOpen(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  const mediaQuery = window.matchMedia("(min-width: 768px)");
  const syncLayout = () => {
    if (mediaQuery.matches) {
      setOpen(false);
    }
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", syncLayout);
  } else {
    mediaQuery.addListener(syncLayout);
  }
});
