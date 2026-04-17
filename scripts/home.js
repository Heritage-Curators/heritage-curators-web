const carousel = document.querySelector("[data-carousel]");
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
const slides = document.querySelectorAll("[data-slide]");
const dots = document.querySelectorAll("[data-carousel-dot]");

if (carousel && prevButton && nextButton) {
  const getScrollAmount = () => {
    const card = carousel.querySelector(".carousel-card");
    if (!card) return 320;

    const styles = window.getComputedStyle(carousel);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    return card.getBoundingClientRect().width + gap;
  };

  prevButton.addEventListener("click", () => {
    carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });
}

if (carousel && slides.length && dots.length) {
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.carouselDot);
      const slide = slides[index];
      if (!slide) return;

      slide.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
  });

  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const index = Array.from(slides).indexOf(entry.target);
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === index);
      });
    });
  }, {
    root: carousel,
    threshold: 0.65,
  });

  slides.forEach((slide) => dotObserver.observe(slide));
}
