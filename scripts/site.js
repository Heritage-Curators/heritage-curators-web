const body = document.body;
const page = body.dataset.page;
const nav = document.getElementById("site-nav");
const toggle = document.querySelector(".nav-toggle");

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === page) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      body.classList.remove("menu-open");
    });
  });
}

const reveals = document.querySelectorAll("[data-reveal]");

if (reveals.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  reveals.forEach((item) => revealObserver.observe(item));
}

const backToTopButton = document.querySelector("[data-back-to-top]");

if (backToTopButton) {
  const toggleBackToTop = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const isNearBottom = scrollPosition >= pageHeight - 220;

    backToTopButton.classList.toggle("is-visible", isNearBottom);
  };

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  window.addEventListener("resize", toggleBackToTop);
  toggleBackToTop();
}
