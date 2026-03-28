// Ajoute, supprime ou modifie les blocs ci-dessous pour gérer tes vidéos et liens.
const integrations = [
  {
    type: "youtube",
    title: "Commande /emotes",
    description:
      "Cette video explique le fonctionnement de la commande /emotes sans parametres.",
    videoId: "dHz2eRYCTs4",
    url: "https://www.youtube.com/watch?v=dHz2eRYCTs4"
  },
  {
    type: "youtube",
    title: "Autre tuto",
    description:
      "Ajoute ici un deuxieme tuto YouTube quand tu auras l'autre video.",
    videoId: "dQw4w9WgXcQ",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    type: "link",
    title: "Documentation complémentaire",
    description:
      "Ajoute ici un lien vers ton règlement, ton wiki serveur, une FAQ ou une page de support.",
    url: "https://discord.com/developers/docs/intro"
  }
];

function buildYouTubeEmbed(videoId, title) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.title = title;
  iframe.loading = "lazy";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;
  return iframe;
}

function buildPlaceholder(label) {
  const container = document.createElement("div");
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

  if (integrations.length === 0) {
    host.appendChild(buildPlaceholder("Aucune intégration configurée pour le moment."));
    return;
  }

  integrations.forEach((item) => {
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

    if (item.type === "youtube" && item.videoId) {
      media.appendChild(buildYouTubeEmbed(item.videoId, item.title));
    } else {
      media.appendChild(buildPlaceholder("Ajoute un média ou un lien"));
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
    button.textContent = "Copié";
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
