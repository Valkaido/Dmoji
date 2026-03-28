// Modifie ce tableau pour ajouter ou retirer des tutoriels.
const INTEGRATIONS = [
  {
    id: "tutorial-emotes",
    type: "video",
    title: "Commande /emotes",
    description: "Cette video explique le fonctionnement de la commande /emotes sans parametres.",
    src: "./videos/emotes.mp4",
    url: "./videos/emotes.mp4"
  },
  {
    id: "tutorial-emotes-parameters",
    type: "video",
    title: "/emotes <nom> <taille> <texte>",
    description: "Cette video explique le fonctionnement de la commande /emotes avec parametres.",
    src: "./videos/emotes_parameters.mp4",
    url: "./videos/emotes_parameters.mp4"
  },
  {
    id: "tutorial-info",
    type: "video",
    title: "/info <message_id>",
    description: "Cette video explique le fonctionnement de la commande /info.",
    src: "./videos/info.mp4",
    url: "./videos/info.mp4"
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
    const article = fragment.querySelector(".tutorial-item");
    const media = fragment.querySelector(".tutorial-media");
    const title = fragment.querySelector("h3");
    const description = fragment.querySelector("p");
    const link = fragment.querySelector(".integration-link");

    if (item.id) {
      article.id = item.id;
    }

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

document.addEventListener("DOMContentLoaded", () => {
  renderIntegrations();
});
