const chips = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".gallery-card");

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
