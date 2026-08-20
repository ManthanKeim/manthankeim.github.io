const navLinks = document.querySelectorAll("[data-nav-link]");
const sections = document.querySelectorAll(".content section[id], main.layout section[id]");
const activePage = document.body.dataset.page;

if (activePage) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.navLink === activePage);
  });
} else if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const href = link.getAttribute("href") || "";
          const hash = href.includes("#") ? `#${href.split("#")[1]}` : href;
          link.classList.toggle("active", hash === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

const motionOk = window.matchMedia("(prefers-reduced-motion: reduce)").matches === false;

if (motionOk) {
  window.addEventListener("mousemove", (event) => {
    document.body.style.setProperty("--mx", `${event.clientX}px`);
    document.body.style.setProperty("--my", `${event.clientY}px`);
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
