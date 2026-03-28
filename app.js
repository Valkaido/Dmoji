// Modifie ce tableau pour ajouter ou retirer des tutoriels.
const INTEGRATIONS = [
  {
    type: "video",
    title: "Commande /emotes",
    description: "Cette video explique le fonctionnement de la commande /emotes sans parametres.",
    src: "./videos/emotes.mp4",
    url: "./videos/emotes.mp4"
  },
  {
    type: "video",
    title: "/emotes <nom> <taille> <texte>",
    description: "Cette video explique le fonctionnement de la commande /emotes avec parametres.",
    src: "./videos/emotes_parameters.mp4",
    url: "./videos/emotes_parameters.mp4"
  },
  {
    type: "link",
    title: "Documentation complementaire",
    description: "Ajoute ici un lien vers ton reglement, ton wiki serveur, une FAQ ou une page de support.",
    url: "https://discord.com/developers/docs/intro"
  }
];

function buildVideoPlayer(src, title) {
  const video = document.createElement("video");
  const source = document.createElement("source");

  video.controls = true;
  video.preload = "metadata";
  video.playsInline = true;
  video.title = title;

  source.src = src;
  source.type = "video/mp4";

  video.appendChild(source);
  return video;
}

function buildMediaPlaceholder(label) {
  const container = document.createElement("div");
  container.className = "tutorial-media-placeholder";
  container.textContent = label;
  return container;
}

function renderIntegrations() {
  const host = document.getElementById("integration-list");
  const template = document.getElementById("integration-card-template");

  if (!host || !template) {
    return;
  }

  host.innerHTML = "";

  if (INTEGRATIONS.length === 0) {
    host.appendChild(buildMediaPlaceholder("Aucune ressource configuree pour le moment."));
    return;
  }

  INTEGRATIONS.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    const media = fragment.querySelector(".tutorial-media");
    const title = fragment.querySelector("h3");
    const description = fragment.querySelector("p");
    const link = fragment.querySelector(".integration-link");

    title.textContent = item.title;
    description.textContent = item.description;

    if (item.url) {
      link.href = item.url;
    } else {
      link.hidden = true;
    }

    if (item.type === "video" && item.src) {
      media.appendChild(buildVideoPlayer(item.src, item.title));
    } else if (item.type === "link") {
      media.appendChild(buildMediaPlaceholder("Ressource externe"));
    } else {
      media.appendChild(buildMediaPlaceholder("Ajoute un media ou un lien"));
    }

    host.appendChild(fragment);
  });
}

async function copyText(value, button) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    const previousLabel = button.textContent;
    button.textContent = "Copie";
    button.classList.add("is-copied");

    window.setTimeout(() => {
      button.textContent = previousLabel;
      button.classList.remove("is-copied");
    }, 1400);
  } catch (error) {
    console.error("Impossible de copier le texte.", error);
  }
}

function bindCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
      copyText(button.getAttribute("data-copy"), button);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderIntegrations();
  bindCopyButtons();
});
