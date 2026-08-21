const root = document.documentElement;
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const themeToggles = document.querySelectorAll(".theme-toggle");
const siteHeader = document.querySelector(".site-header, .mobile-bar");

const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
const savedTheme = localStorage.getItem("theme") || preferredTheme;
root.setAttribute("data-theme", savedTheme);

const onScroll = () => {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 8);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const setTheme = (nextTheme) => {
  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
};

themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    setTheme(nextTheme);
  });
});

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const activePage = document.body.dataset.page;

if (activePage) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.navLink === activePage);
  });
} else if (sections.length) {
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
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}
