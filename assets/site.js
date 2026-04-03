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

const heroEmoteCode = document.querySelector(".hero-emote-code");
const heroEmoteImage = document.querySelector(".hero-emote-image");

if (heroEmoteCode && heroEmoteImage) {
  const emotes = [
    { code: "/ICANT", src: "assets/ICANT-2x.webp" },
    { code: "/Aware", src: "assets/Aware-2x.webp" },
    { code: "/GIGACHAD", src: "assets/GIGACHAD-2x.webp" },
    { code: "/NOWAYING", src: "assets/NOWAYING-2x.webp" },
  ];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    heroEmoteCode.textContent = emotes[0].code;
    heroEmoteImage.src = emotes[0].src;
  } else {
    const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

    const typeCode = async (value) => {
      heroEmoteCode.textContent = "";

      for (const character of value) {
        heroEmoteCode.textContent += character;
        await wait(125);
      }
    };

    const runHeroSequence = async () => {
      let index = 0;

      while (true) {
        const emote = emotes[index];

        heroEmoteCode.classList.remove("is-fading");
        heroEmoteImage.classList.remove("is-visible");
        heroEmoteImage.src = emote.src;

        await typeCode(emote.code);
        await wait(1300);

        heroEmoteCode.classList.add("is-fading");
        await wait(320);

        heroEmoteImage.classList.add("is-visible");
        await wait(1650);

        heroEmoteImage.classList.remove("is-visible");
        await wait(320);

        index = (index + 1) % emotes.length;
      }
    };

    runHeroSequence();
  }
}
