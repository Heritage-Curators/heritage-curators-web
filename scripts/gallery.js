const chips = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".gallery-card");

if (chips.length && cards.length) {
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      chips.forEach((item) => item.classList.remove("is-active"));
      chip.classList.add("is-active");

      cards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });
}

if (cards.length) {
  const focusObserver = new IntersectionObserver((entries) => {
    const visibleCards = entries
      .filter((entry) => entry.isIntersecting)
      .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

    if (!visibleCards.length) {
      return;
    }

    cards.forEach((card) => card.classList.remove("is-current"));
    visibleCards[0].target.classList.add("is-current");
  }, {
    threshold: [0.35, 0.55, 0.75],
    rootMargin: "-12% 0px -12% 0px"
  });

  cards.forEach((card) => focusObserver.observe(card));
}

document.querySelectorAll(".analysis-panel").forEach((panel) => {
  const tabs = panel.querySelectorAll(".analysis-tab");
  const blocks = panel.querySelectorAll(".analysis-panel__block");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tabTarget;

      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      blocks.forEach((block) => {
        const isActive = block.id === targetId;
        block.classList.toggle("is-active", isActive);
        block.hidden = !isActive;
      });
    });
  });
});

const artworkTriggers = document.querySelectorAll("[data-artwork-trigger]");
const lightbox = document.querySelector("[data-artwork-lightbox]");

if (artworkTriggers.length && lightbox) {
  const lightboxImage = lightbox.querySelector(".artwork-lightbox__image");
  const lightboxTitle = lightbox.querySelector("#artwork-lightbox-title");
  const lightboxDescription = lightbox.querySelector(".artwork-lightbox__description");
  const lightboxCloseControls = lightbox.querySelectorAll("[data-artwork-close]");
  const lightboxCloseButton = lightbox.querySelector(".artwork-lightbox__close");
  let lastTrigger = null;

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxTitle.textContent = "";
    lightboxDescription.textContent = "";

    if (lastTrigger) {
      lastTrigger.focus();
    }
  };

  const openLightbox = (trigger) => {
    const image = trigger.querySelector("img");

    if (!image) {
      return;
    }

    lastTrigger = trigger;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = trigger.dataset.artworkTitle || image.alt;
    lightboxDescription.textContent = image.alt;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightboxCloseButton.focus();
  };

  artworkTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(trigger);
    });
  });

  lightboxCloseControls.forEach((control) => {
    control.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
}
